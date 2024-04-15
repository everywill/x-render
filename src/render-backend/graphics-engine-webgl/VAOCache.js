import { MAX_BUFFER_SLOTS } from "../graphics/device-caps";
import { gl } from "./gl";

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
            if(!this.streams[i].equal(cacheKey.stream[i])) {
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

        const inputLayoutDesc = pipelineState.GetDesc().graphics_pipeline_desc.nput_layout_desc;
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
                vaoCacheKey.streams[i]
            }
        }

    }
}

export {
    VAOCache,
}
