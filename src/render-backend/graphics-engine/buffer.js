import { BIND_FLAGS, BUFFER_VIEW_TYPE } from "../graphics/graphics-types";
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

    UpdateData(deviceContext, offset, size, data) {

    }

    CopyData(deviceContext, srcBuffer, srcOffset, dstOffset, size) {

    }

    Map() {}

    UnMap() {}

    CreateViewInternal() {
        throw 'implementation needed';
    }

    createView(viewDesc) {
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