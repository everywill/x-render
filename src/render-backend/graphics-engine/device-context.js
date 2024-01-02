import { MAX_BUFFER_SLOTS, MAX_VIEWPORTS } from "../graphics/device-caps";
import { Rect, SET_VERTEX_BUFFERS_FLAGS, Viewport } from "../graphics/device-context-desc";
import { BIND_FLAGS } from "../graphics/graphics-types";

class VertexStreamInfo {
    constructor() {
        // buffer
        this.buffer = null;
        //  offset in bytes
        this.offset = 0;
    }
}

class DeviceContext {
    constructor(renderDevice, isDeferred) {
        this.render_device = renderDevice;
        this.is_deferred = isDeferred;
        this.pipelinestate = null;
        this.stencil_ref = 0;
        this.blend_factors = [-1, -1, -1, -1];
        this.vertex_streams = [];
        for(let i=0; i<MAX_BUFFER_SLOTS; i++) {
            this.vertex_streams[i] = new VertexStreamInfo();
        }
        this.num_vertex_streams = 0;
        this.index_buffer = null;
        // offset from the beginning of the index buffer to the start of data in bytes
        this.index_data_start_offset = 0;
        this.framebuffer_width = 0;
        this.framebuffer_height = 0;
        this.num_viewports = 0;
        this.viewports = [];
        for(let i=0; i<MAX_VIEWPORTS; i++) {
            this.viewports[i] = new Viewport();
        }
        this.num_scissor_rects = 0;
        this.scissor_rects = [];
        for(let i=0; i<MAX_VIEWPORTS; i++) {
            this.scissor_rects[i] = new Rect();
        }
        this.active_render_pass = false;
    }

    SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags) {
        if(startSlot >= MAX_BUFFER_SLOTS) {
            throw `start vertex buffer slot ${startSlot} is out of range [0, ${MAX_BUFFER_SLOTS-1}]`
        }
        if(startSlot+numBufferSet > MAX_BUFFER_SLOTS) {
            console.error(`vertex buffer slots [${startSlot}, ${startSlot+numBufferSet-1}] is out of range [0, ${MAX_BUFFER_SLOTS-1}]`);
            numBufferSet = MAX_BUFFER_SLOTS - startSlot;
        }
        if(flags & SET_VERTEX_BUFFERS_FLAGS.SET_VERTEX_BUFFERS_FLAG_RESET) {
            for(let i=0; i<this.num_vertex_streams; i++) {
                this.vertex_streams = new VertexStreamInfo();
            }
            this.num_vertex_streams = 0;
        }

        this.num_vertex_streams = Math.max(this.num_vertex_streams, startSlot+numBufferSet);

        for(let buff=0; buff<numBufferSet; buff++) {
            const currentStream = this.vertex_streams[startSlot+buff];
            currentStream.buffer = buffers[buff];
            currentStream.offset = offsets[buff];

            if(currentStream.buff) {
                const bufferDesc = currentStream.buff.GetDesc();
                if(!(bufferDesc.bind_flags & BIND_FLAGS.BIND_VERTEX_BUFFER)) {
                    throw 'buffer bound as vertex buffer was not created with BIND_VERTEX_BUFFER flag'
                }
            }
        }

        while(this.num_vertex_streams>0 && !this.vertex_streams[this.num_vertex_streams-1].buffer) {
            this.vertex_streams[this.num_vertex_streams--] = new VertexStreamInfo();
        }
    }

    SetIndexBuffer(indexBuffer, byteOffset) {
        this.index_buffer = indexBuffer;
        this.index_data_start_offset = byteOffset;
        const bufferDesc = this.index_buffer.GetDesc();
        if(!(bufferDesc.bind_flags & BIND_FLAGS.BIND_INDEX_BUFFER)) {
            throw 'buffer bound as index buffer was not created with BIND_INDEX_BUFFER flag'
        }
    }

    SetPipelineState(pipelineState) {
        this.pipelinestate = pipelineState;
    }

    SetStencilRef(stencilRef) {
        if(this.stencil_ref != stencilRef) {
            this.stencil_ref = stencilRef;
            return true;
        }
        return false;
    }

    SetBlendFactors(blendFactors) {
        let factorDiff = false;
        for(let i=0; i<4; i++) {
            if(blendFactors[i] != this.blend_factors[i]) {
                this.blend_factors[i] = blendFactors[i];
                factorDiff = true;
            }
        }
        return factorDiff;
    }

    SetViewports(numViewports, viewports, RTWidth, RTHeight) {
        if(RTHeight==0 || RTWidth==0) {
            RTWidth = this.framebuffer_width;
            RTHeight = this.framebuffer_height;
        }

        if(numViewports >= MAX_VIEWPORTS) {
            console.error('number of viewports exceed the limit');
            this.num_viewports = Math.min(MAX_BUFFER_SLOTS, numViewports);
        }

        const defaultVP = new Viewport();
        defaultVP.width = RTWidth;
        defaultVP.height = RTHeight;
        // if no viewports provided, use default viewport
        if(this.numViewports == 1 && !viewports) {
            viewports = [defaultVP];
        }

        for(let vp=0; vp<this.num_viewports; vp++) {
            this.viewports[vp] = viewports[vp];
            if(this.viewports[vp].width<0 || this.viewports[vp].height<0) {
                throw 'incorrect viewport width or height';
            }
            if(this.viewports[vp].min_depth>this.viewports[vp].max_depth) {
                throw 'incorrect viewport depth range';
            }
        }

        return { width: RTWidth, height: RTHeight };
    }

    SetScissorRects(numRect, rects) {
        if(numRect >= MAX_VIEWPORTS) {
            throw 'number of scissor rects excced the limit'
        }
        this.num_scissor_rects = Math.min(numRect, MAX_VIEWPORTS);

        for(let i=0; i<this.num_scissor_rects; i++) {
            this.scissor_rects[i] = rects[i];
            if(this.scissor_rects[i].left > this.scissor_rects[i].right) {
                throw 'incorrect horizontal bounds for a scissor rect';
            }
            if(this.scissor_rects[i].top > this.scissor_rects[i].bottom) {
                throw 'incorrect vertical bounds for a scissor rect';
            }
        }
    }

    BeginRenderPass() {
        if(this.active_render_pass) {
            throw 'already in render pass'
        }
        this.active_render_pass = true;
    }

    EndRenderPass() {
        if(!this.active_render_pass) {
            throw 'not in a render pass';
        }
        this.active_render_pass = false;
    }
}
 
export {
    DeviceContext,
}