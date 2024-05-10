import { GetValueSize } from "../graphics-accessories/graphics-accessories";
import { MAX_BUFFER_SLOTS } from "../graphics/device-caps";
import { VALUE_TYPE } from "../graphics/graphics-types";
import { INPUT_ELEMENT_FREQUENCY } from "../graphics/input-layout";
import { gl } from "./gl";

// map input element value type to vao type
function GetVAOType(inputElementType) {
    let vao_type;
    switch(inputElementType) {
        case VALUE_TYPE.VT_INT8:
            vao_type = gl.BYTE;
            break;
        case VALUE_TYPE.VT_UINT8:
            vao_type = gl.UNSIGNED_BYTE;
            break;
        case VALUE_TYPE.VT_INT16:
            vao_type = gl.SHORT;
            break;
        case VALUE_TYPE.VT_UINT16:
            vao_type = gl.UNSIGNED_SHORT;
            break;
        case VALUE_TYPE.VT_INT32:
            vao_type = gl.INT;
            break;
        case VALUE_TYPE.VT_UINT32:
            vao_type = gl.UNSIGNED_INT;
            break;
        case VALUE_TYPE.VT_FLOAT32:
            vao_type = gl.FLOAT;
            break;
        case VALUE_TYPE.VT_FLOAT16:
            vao_type = gl.HALF_FLOAT;
            break;
        default:
            break;
    }
    return vao_type;
}


class StreamAttribs {
    constructor(buffer, stride, offset) {
        this.buffer = buffer;
        this.stride = stride;
        this.offset = offset;
    }
    equal(streamAttribs) {
        return this.index_buffer == streamAttribs.index_buffer
                && this.stride == streamAttribs.stride
                && this.offset == streamAttribs.offset;
    }
}

class VAOCacheKey {
    constructor(pipelineState, indexBuffer) {
        this.pso = pipelineState;
        this.index_buffer = indexBuffer;
        this.num_used_slots = 0;
        this.streams = [];
    }

    equal(cacheKey) {
        if(this.pso != cacheKey.pso) {
            return false;
        }
        if(this.index_buffer != cacheKey.index_buffer) {
            return false;
        }
        if(this.num_used_slots != this.num_used_slots) {
            return false;
        }
        for(let i=0; i<this.num_used_slots; i++) {
            if(!this.streams[i].equal(cacheKey.streams[i])) {
                return false;
            }
        }
        return true;
    }
}

class VAOCache {
    constructor() {
        this.empty_vao = gl.createVertexArray();
        // VAOCacheKey to VAO
        this.cache = new Map();
        // pipelineState to VAOCacheKey array
        this.pso_to_key = new Map();
        // buffer to VAOCacheKey array
        this.buffer_to_key = new Map();
        this.release_queue = [];
    }

    GetEmptyVAO() { return this.empty_vao; }

    FindKey(cacheKey) {
        for(let [key, value] of this.cache) {
            if(key.equal(cacheKey)) {
                return key;
            }
        }
    }

    OnDestroyBuffer(buffer) {
        const vaoCacheKeyArray = this.buffer_to_key.get(buffer) || [];
        for(let key of vaoCacheKeyArray) {
            if(this.cache.get(key)) {
                // schedule to release vao using this buffer
                this.release_queue.push(this.cache.get(key));
            }
            this.cache.delete(key);
        }
        this.buffer_to_key.set(buffer, []);

        for(let [pso, vaoCacheKeyArray] of this.pso_to_key) {
            for(let i = vaoCacheKeyArray.length-1; i>=0; i--) {
                if(vaoCacheKeyArray[i].index_buffer == buffer) {
                    vaoCacheKeyArray.splice(i, 1);
                }
            }
        }
    }

    OnDestroyPSO(pipelineState) {
        const vaoCacheKeyArray = this.pso_to_key.get(pipelineState) || [];
        for(let key of vaoCacheKeyArray) {
            if(this.cache.get(key)) {
                this.release_queue.push(this.cache.get(key));
            }
            this.cache.delete(key);
        }
        this.pso_to_key.set(pipelineState, []);

        for(let [buffer, vaoCacheKeyArray] of this.buffer_to_key) {
            for(let i = vaoCacheKeyArray.length-1; i>=0; i--) {
                if(vaoCacheKeyArray[i].pso == pipelineState) {
                    vaoCacheKeyArray.splice(i, 1);
                }
            }
        }
    }

    GetVAO(pipelineState, indexBuffer, vertexStreams, numVertexSteams, glContextState) {
        if(this.release_queue.length) {
            for(let i=0; i<this.release_queue.length; i++) {
                gl.deleteVertexArray(this.release_queue[i]);
            }
            this.release_queue.length = 0;
        }

        const vertexBuffers = [];
        for(let i=0; i<numVertexSteams; i++) {
            vertexBuffers[i] = null;
        }

        const inputLayoutDesc = pipelineState.GetDesc().graphics_pipeline_desc.input_layout_desc;
        const inputElements = inputLayoutDesc.layout_elements;
        const numElements = inputLayoutDesc.num_elements;

        const strides = pipelineState.GetBufferStrides();
        const vaoCacheKey = new VAOCacheKey(pipelineState, indexBuffer);

        for(let elem=0; elem<numElements; elem++) {
            const buffSlot = inputElements[elem].buffer_slot;
            if(buffSlot >= numVertexSteams) {
                throw 'input layout requires more buffers than bound to the pipeline';
            }
            if(buffSlot >= MAX_BUFFER_SLOTS) {
                throw 'Incorrect input slot';
            }

            const maxUsedSlot = Math.max(vaoCacheKey.num_used_slots, buffSlot+1);
            for(let i=vaoCacheKey.num_used_slots; i<maxUsedSlot; i++) {
                vaoCacheKey.streams[i] = new StreamAttribs();
            }
            vaoCacheKey.num_used_slots = maxUsedSlot;

            const currentStream = vertexStreams[buffSlot];
            const stride = strides[buffSlot];
            let currentBuffer = vertexBuffers[buffSlot];
            const currentSteamAttribInKey = vaoCacheKey.streams[buffSlot];
            if(!currentBuffer) {
                currentBuffer = currentStream.buffer;

                if(!currentBuffer) {
                    throw 'no buffer bound to slot';
                }

                vertexBuffers[buffSlot] = currentBuffer;
                
                currentSteamAttribInKey.buffer = currentBuffer;
                currentSteamAttribInKey.stride = stride;
                currentSteamAttribInKey.offset = currentStream.offset;
            } else {
                if(currentBuffer != currentStream.buffer) {
                    throw 'buffer no longer exists';
                }
                if(currentBuffer != currentSteamAttribInKey.buffer) {
                    throw 'unexpected buffer';
                }
                if(currentSteamAttribInKey.stride != stride) {
                    throw 'unexpected buffer stride';
                }
                if(currentSteamAttribInKey.offset != currentStream.offset) {
                    throw 'unexpected buffer offset';
                }
            }
        }

        const cacheKey = this.FindKey(vaoCacheKey);

        if(cacheKey) {
            return this.cache.get(cacheKey);
        } else {
            const newVAO = gl.createVertexArray();
            glContextState.BindVAO(newVAO);

            for(let index=0; index<numElements; index++) {
                const elem = inputElements[index];
                const buffSlot = elem.buffer_slot;
                
                const currentStream = vertexStreams[buffSlot];
                const stride = strides[buffSlot];
                const currentBuffer = vertexBuffers[buffSlot];

                if(!currentBuffer) {
                    throw 'vertex buffer is null';
                }

                gl.bindBuffer(gl.ARRAY_BUFFER, currentBuffer.gl_buffer);
                const dataStartOffset = currentStream.offset + elem.relative_offset;

                const isNormalized = elem.is_normalized;

                const vaoType = GetVAOType(elem.value_type);
                const vaoNumComponnet = elem.num_components;

                if(vaoType && vaoNumComponnet) {
                    if(!isNormalized && (
                        elem.value_type == VALUE_TYPE.VT_INT8 ||
                        elem.value_type == VALUE_TYPE.VT_UINT8 ||
                        elem.value_type == VALUE_TYPE.VT_INT16 ||
                        elem.value_type == VALUE_TYPE.VT_UINT16 ||
                        elem.value_type == VALUE_TYPE.VT_INT32 ||
                        elem.value_type == VALUE_TYPE.VT_UINT32
                    )) {
                        gl.vertexAttribIPointer(elem.semantic_index, vaoNumComponnet, vaoType, stride, dataStartOffset);
                    } else {
                        gl.vertexAttribPointer(elem.semantic_index, vaoNumComponnet, vaoType, isNormalized, stride, dataStartOffset);
                    }
                }

                if(elem.frequency == INPUT_ELEMENT_FREQUENCY.INPUT_ELEMENT_FREQUENCY_PER_INSTANCE) {
                    // if divisor is zero, then the attribute acts like normal, being indexed by the array or index buffer
                    // if divisor is non-zero, then the current instance is divided by the divisor
                    // and the result of that is used to access the atrribute array
                    gl.vertexAttribDivisor(elem.semantic_index, elem.instance_data_step_rate);
                }

                gl.enableVertexAttribArray(elem.semantic_index);
            }

            if(indexBuffer) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.gl_buffer);
            }

            this.cache.set(vaoCacheKey, newVAO);
            
            if(!this.pso_to_key.get(pipelineState)) {
                this.pso_to_key.set(pipelineState, []);
            }

            let val = this.pso_to_key.get(pipelineState);
            val.push(newVAO);

            if(!this.buffer_to_key.get(indexBuffer)) {
                this.buffer_to_key.set(indexBuffer, []);
            }

            val = this.buffer_to_key.get(indexBuffer);
            val.push(newVAO);

            for(let i=0; i<vaoCacheKey.num_used_slots; i++) {
                const buffer = vaoCacheKey.streams[i].buffer;
                if(buffer) {
                    if(!this.buffer_to_key.get(buffer)) {
                        this.buffer_to_key.set(buffer, []);
                    }
        
                    val = this.buffer_to_key.get(buffer);
                    val.push(newVAO);
                }
            }

            return newVAO;
        }
    }
}

export {
    VAOCache,
}
