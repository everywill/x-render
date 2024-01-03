import { BIND_FLAGS, BUFFER_VIEW_TYPE, CPU_ACCESS_FLAGS, MAP_FLAGS, MAP_TYPE, USAGE } from "../graphics/graphics-types";
import { BufferViewDesc } from '../graphics/bufferview-desc';
import { BUFFER_MODE } from "../graphics/buffer-desc";

class Buffer {
    constructor(renderDevice, bufferDesc) {
        const allowedBindFlags = BIND_FLAGS.BIND_VERTEX_BUFFER | BIND_FLAGS.BIND_UNIFORM_BUFFER | BIND_FLAGS.BIND_INDEX_BUFFER
                                | BIND_FLAGS.BIND_SHADER_RESOURCE | BIND_FLAGS.BIND_UNORDERED_ACCESS
                                | BIND_FLAGS.BIND_INDIRECT_DRAW_ARGS | BIND_FLAGS.BIND_STREAM_OUTPUT;
        if(bufferDesc.bind_flags & ~allowedBindFlags) {
            throw 'Incorrect bind flags specified';
        }

        if(bufferDesc.bind_flags & BIND_FLAGS.BIND_UNORDERED_ACCESS 
            || bufferDesc.bind_flags & BIND_FLAGS.BIND_SHADER_RESOURCE)
        {
            if(bufferDesc.mode <= BUFFER_MODE.BUFFER_MODE_UNDEFINED 
                || bufferDesc.mode >= BUFFER_MODE.BUFFER_MODE_NUM_MODES) 
            {
                throw 'Buffer mode is incorrect';
            }
            if(bufferDesc.mode == BUFFER_MODE.BUFFER_MODE_STRUCTURED 
                || bufferDesc.mode == BUFFER_MODE.BUFFER_MODE_FORMATTED) 
            {
                if(bufferDesc.element_stride != 0) {
                    throw 'Element stride cannot be zero for structured buffer';
                }
            }
        }

        if((bufferDesc.bind_flags & BIND_FLAGS.BIND_UNIFORM_BUFFER) && bufferDesc.size % (4 * 4)) {
            const align_size = 4 * 4;
            const new_size = Math.floor((bufferDesc.size + align_size - 1) / align_size) * align_size;
            console.warn('align uniform buffer to float4');
            bufferDesc.size = new_size;
        }

        if((bufferDesc.bind_flags & BIND_FLAGS.BIND_UNIFORM_BUFFER) && bufferDesc.size > 6400) {
            console.warn('uniform buffer size is greater than 6400, will be error on ios safari');
        }

        this.desc = bufferDesc;
        this.default_SRV = null;
        this.default_UAV = null;
        this.created_buffer_views = new Map();
    }

    GetDesc() { return this.desc; }

    UpdateData(deviceContext, offset, size, data) {
        if(this.desc.usage != USAGE.USAGE_DEFAULT) {
            throw 'only default usage buffers can be updated with UpdateBuffer';
        }
        if(offset >= this.desc.size) {
            throw 'offset exceeds the buffer size';
        }
        if(offset+size > this.desc.size) {
            throw 'update range is not valid';
        }
    }

    CopyData(deviceContext, srcBuffer, srcOffset, dstOffset, size) {
        if(dstOffset+size > this.desc.size) {
            throw 'destination range is not valid';
        }
        if(srcOffset+size > srcBuffer.GetDesc().size) {
            throw 'source range is nnont valid';
        }
    }

    Map(deviceContext, mapType, mapFlags) {
        switch(mapType) {
            case MAP_TYPE.MAP_READ:
                if(this.desc.cpu_access_flags != CPU_ACCESS_FLAGS.CPU_ACCESS_READ) {
                    throw "buffer being mapped for reading not created with CPU_ACCESS_READ flag";
                }
                if(mapFlags & MAP_FLAGS.MAP_FLAG_DISCARD) {
                    console.warn('MAP_FLAG_DISCARD is not valid when mapping buffer for reading')
                }
                break;
            case MAP_TYPE.MAP_WRITE:
                if(this.desc.usage != USAGE.USAGE_DYNAMIC) {
                    throw "only buffer with usage USAGE_DYNAMIC can be mapped for writing";
                }
                if(this.desc.cpu_access_flags != CPU_ACCESS_FLAGS.CPU_ACCESS_WRITE) {
                    throw 'buffer being mapped for writing was not created with CPU_ACCESS_WRITE flag'
                }
                break;
            case MAP_TYPE.MAP_READ_WRITE:
                if(this.desc.cpu_access_flags != CPU_ACCESS_FLAGS.CPU_ACCESS_READ) {
                    throw "buffer being mapped for reading not created with CPU_ACCESS_READ flag";
                }
                if(this.desc.cpu_access_flags != CPU_ACCESS_FLAGS.CPU_ACCESS_WRITE) {
                    throw 'buffer being mapped for writing was not created with CPU_ACCESS_WRITE flag'
                }
                break;
            default:
                throw "unknown map type";
        }

        if(this.desc.usage == USAGE.USAGE_DYNAMIC) {
            if(!(mapFlags & MAP_FLAGS.MAP_FLAG_DISCARD) || mapType != MAP_TYPE.MAP_WRITE) {
                throw "dynamic buffers can only be mapped for writing with discard flag";
            }
        }

        if ((mapFlags & MAP_FLAGS.MAP_FLAG_DISCARD) != 0)
        {
            if(this.desc.usage != USAGE.USAGE_DYNAMIC) {
                console.warn('only dynamic and staging buffers can be mapped with discard flag');
            }
            if(mapType != MAP_TYPE.MAP_WRITE) {
                console.warn('MAP_FLAG_DISCARD is only valid when mapping buffer for writing');
            }
        }
    }

    Unmap(deviceContext, mapType, mapFlags) { throw 'implementation needed'; }

    CreateViewInternal() { throw 'implementation needed'; }

    CreateView(viewDesc) {
        let view = this.created_buffer_views.get(viewDesc)
        if(!view) {
            view = this.CreateViewInternal(viewDesc);
            this.created_buffer_views.set(viewDesc, view);
        }
        return view;
    }

    CreateDefaultViews() {
        if(this.desc.bind_flags & BIND_FLAGS.BIND_SHADER_RESOURCE) {
            const viewDesc = new BufferViewDesc();
            viewDesc.view_type = BUFFER_VIEW_TYPE.BUFFER_VIEW_SHADER_RESOURCE;
            this.default_SRV = this.CreateViewInternal(viewDesc);
            this.created_buffer_views.set(viewDesc, this.default_SRV);
        }
        if(this.desc.bind_flags & BIND_FLAGS.BIND_UNORDERED_ACCESS) {
            const viewDesc = new BufferViewDesc();
            viewDesc.view_type = BUFFER_VIEW_TYPE.BUFFER_VIEW_UNORDERED_ACCESS;
            this.default_UAV = this.CreateViewInternal(viewDesc);
            this.created_buffer_views.set(viewDesc, this.default_UAV);
        }
    }

    GetDefaultView(view_type) {
        switch(view_type) {
            case BUFFER_VIEW_TYPE.BUFFER_VIEW_SHADER_RESOURCE:
                return this.default_SRV;
            case BUFFER_VIEW_TYPE.BUFFER_VIEW_SHADER_RESOURCE:
                return this.default_UAV;
            default:
                throw "Unknown view type";
        }
    }
}

export {
    Buffer,
}