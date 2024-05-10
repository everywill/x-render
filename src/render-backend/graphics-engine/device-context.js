import { MAX_BUFFER_SLOTS, MAX_VIEWPORTS } from "../graphics/device-caps";
import { Rect, SET_VERTEX_BUFFERS_FLAGS, Viewport } from "../graphics/device-context-desc";
import { BIND_FLAGS, MISC_TEXTURE_FLAGS, TEXTURE_VIEW_TYPE, VALUE_TYPE } from "../graphics/graphics-types";

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
        this.pipelinestate = null;  // need clear
        this.stencil_ref = 0;
        this.blend_factors = [-1, -1, -1, -1];
        this.vertex_streams = [];  // need clear
        for(let i=0; i<MAX_BUFFER_SLOTS; i++) {
            this.vertex_streams[i] = new VertexStreamInfo();
        }
        this.num_vertex_streams = 0;
        this.index_buffer = null;  // need clear
        // offset from the beginning of the index buffer to the start of data in bytes
        this.index_data_start_offset = 0;
        this.framebuffer_width = 0;
        this.framebuffer_height = 0;
        // number of array slices in the currently bound framebuffer
        this.framebuffer_slices = 0;
        this.is_default_framebuffer_bound = false;
        this.swapchain = null;
        // targets need to be resolved next
        this.num_targets_to_resolve = 0;
        // array of render targets' texture to resolve
        this.pre_render_targets_to_resolve = [];
        // previous number of render targets bound
        this.num_bind_render_targets = 0;
        // array of render targets bound;
        this.bound_render_targets = [];
        this.bound_depth_stencil = null;
        // this.bound_RT_textures = [];
        this.num_viewports = 0;
        this.viewports = [];  // need clear
        for(let i=0; i<MAX_VIEWPORTS; i++) {
            this.viewports[i] = new Viewport();
        }
        this.num_scissor_rects = 0;
        this.scissor_rects = [];  // need clear
        for(let i=0; i<MAX_VIEWPORTS; i++) {
            this.scissor_rects[i] = new Rect();
        }
        this.render_pass_attribs = null;
        this.active_render_pass = false;
    }

    ResolveResource(msaaTexture, resolvedTexture) { throw 'implementation needed'; }

    SetSwapChain(swapchain) { this.swapchain = swapchain; }
    GetSwapChain() { return this.swapchain; }

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
                this.vertex_streams[i] = new VertexStreamInfo();
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

        // remove null buffers from the end of the array
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
        }
        this.num_viewports = Math.min(MAX_VIEWPORTS, numViewports);

        const defaultVP = new Viewport();
        defaultVP.width = RTWidth;
        defaultVP.height = RTHeight;
        // if no viewports provided, use default viewport
        if(this.num_viewports == 1 && !viewports.length) {
            viewports.push(defaultVP);
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

    // explicitly transition all resources to the correct state
    TransitionShaderResources(pipelineState, shaderResourceBinding) { throw 'implementation needed'; }

    // pipelinestate object that was used to create the shader resource binding must be bound
    // if no pipeline state object is bound or the pipeline state object does not match shader resource binding, the method will fail
    CommitShaderResources(shaderResourceBinding, flags) { 
        if(!this.pipelinestate) {
            throw 'no pipeline state is bound to the context';
        }
        // todo: check whether shaderResourceBinding is compatible with pipeline state
        return true; 
    }

    FinishCommandList(commandList) { throw 'implementation needed'; }

    ExecuteCommandList(commandList) { throw 'implementation needed'; }

    Flush() { throw 'implementation needed'; }

    BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs) {
        if(this.active_render_pass) {
            throw 'already in render pass'
        }
        this.active_render_pass = true;
        // if render target bind operation actually done
        let bindRenderTargets = false;
        // texture view for default render target
        let defaultRTV = null;
        const isDefaultFramebuffer = (numRenderTargets==0 || !renderTargets || 
                                    (numRenderTargets==1 && !renderTargets[0])) && !depthStencil;
        bindRenderTargets = (this.is_default_framebuffer_bound != isDefaultFramebuffer);
        this.is_default_framebuffer_bound = isDefaultFramebuffer;
        if(this.is_default_framebuffer_bound) {
            if(!this.swapchain) {
                throw 'swapchain is not initialized in this device context';
            }
            numRenderTargets = 1;
            defaultRTV = this.swapchain.GetCurrentBackBufferRTV();
            renderTargets = [defaultRTV];
            depthStencil = this.swapchain.GetCurrentBackBufferDSV();

            const swapchainDesc = this.swapchain.GetDesc();
            this.framebuffer_width = swapchainDesc.width;
            this.framebuffer_height = swapchainDesc.height;
            this.framebuffer_slices = 1;
        }
        this.num_targets_to_resolve = 0;
        // multisample texture will implicitly resolve
        if(!this.render_device.GetDeviceCaps().multisample_rendertexture_supported) {
            for(let i=0; i<this.num_bind_render_targets; i++) {
                // const texture = this.bound_RT_textures[i];
                const RTView = this.bound_render_targets[i];
                let texture;
                if(RTView) {
                    texture = RTView.GetTexture();
                }
                if(texture && texture.GetDesc().misc_flag & MISC_TEXTURE_FLAGS.MISC_TEXTURE_FLAG_RESOLVE && !texture.GetResolveFlag()) {
                    this.pre_render_targets_to_resolve[this.num_targets_to_resolve++] = texture.GetDefaultView(TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET);
                }
            }
        }

        if(numRenderTargets != this.num_bind_render_targets) {
            bindRenderTargets = true;
            for(let i=numRenderTargets; i<this.numRenderTargets; i++) {
                this.bound_render_targets[i] = null;
            }
            this.num_bind_render_targets = numRenderTargets;
        }
        
        for(let i=0; i<numRenderTargets; i++) {
            const RTView = renderTargets[i];
            if(RTView) {
                const RTViewDesc = RTView.GetDesc();
                if(RTViewDesc.view_type != TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET) {
                    throw 'incorrect view type, TEXTURE_VIEW_RENDER_TARGET is required';
                }
                const texture = RTView.GetTexture();
                if(texture && texture.GetDesc().misc_flag & MISC_TEXTURE_FLAGS.MISC_TEXTURE_FLAG_RESOLVE) {
                    texture.SetResolveFlag(false);
                }

                // use RTV's size to set render target size
                if(this.framebuffer_width==0) {
                    let desc;
                    if(!texture) {
                        desc = this.swapchain.GetDesc();
                        
                    } else {
                        desc = texture.GetDesc();
                    }
                    this.framebuffer_width = Math.max(desc.width >> desc.most_detailed_mip, 1);
                    this.framebuffer_height = Math.max(desc.height >> desc.most_detailed_mip, 1);
                    this.framebuffer_slices = RTViewDesc.num_array_or_depth_slice;
                }
            }

            if(this.bound_render_targets[i] != RTView) {
                this.bound_render_targets[i] = RTView;
                bindRenderTargets = true;
            }
        }

        if(depthStencil) {
            const DSViewDesc = depthStencil.GetDesc();
            if(DSViewDesc.view_type != TEXTURE_VIEW_TYPE.TEXTURE_VIEW_DEPTH_STENCIL) {
                throw 'incorrect view type, TEXTURE_VIEW_DEPTH_STENCIL is required';
            }
            const texture = depthStencil.GetTexture();
            if(texture) {
                if(numRenderTargets==0 && texture.sample_count>1) {
                    console.error('depth only render target with msaa may be invalid on some andorid platform')
                }
            }

            if(this.framebuffer_width == 0) {
                const desc = texture.GetDesc();
                this.framebuffer_width = Math.max(desc.width >> desc.most_detailed_mip, 1);
                this.framebuffer_height = Math.max(desc.height >> desc.most_detailed_mip, 1);
                this.framebuffer_slices = DSViewDesc.num_array_or_depth_slice;
            }
        }

        if(this.bound_depth_stencil != depthStencil) {
            this.bound_depth_stencil = depthStencil;
            bindRenderTargets = true;
        }

        this.render_pass_attribs = renderPassAttribs;

        if(this.framebuffer_width<=0 || this.framebuffer_height<=0 || this.framebuffer_slices<=0) {
            throw 'framebuffer width/height/slices not valid';
        }

        return bindRenderTargets;
    }

    EndRenderPass() {
        if(!this.active_render_pass) {
            throw 'not in a render pass';
        }
        this.active_render_pass = false;
    }

    Draw(drawAttribs) {
        if(drawAttribs.is_indexed) {
            switch(drawAttribs.index_type) {
                case VALUE_TYPE.VT_UINT8:
                case VALUE_TYPE.VT_UINT16:
                case VALUE_TYPE.VT_UINT32:
                    break;
                default:
                    throw 'draw index buffer type must be UNSIGN INT 8/16/32';
            }
        }
        if(!this.pipelinestate) {
            throw 'no pipelinestate is bound';
        }
        if(this.pipelinestate.GetDesc().is_compute_pipeline) {
            throw 'no graphics pipelinestate is bound';
        }
    }

    InvalidateState() {
        this.ClearStateCache();
        this.is_default_framebuffer_bound = false;
    }

    ClearStateCache() {
        for(let i=0; i<this.num_vertex_streams; i++) {
            this.vertex_streams[i] = new VertexStreamInfo();
        }
        this.num_vertex_streams = 0;
        
        this.pipelinestate = null;

        this.index_buffer = null;
        this.index_data_start_offset = 0;

        this.stencil_ref = 0;

        this.blend_factors = [-1, -1, -1, -1];

        for(let i=0; i<this.num_viewports; i++) {
            this.viewports[i] = new Viewport();
        }
        this.num_viewports = 0;

        for(let i=0; i<this.num_scissor_rects; i++) {
            this.scissor_rects = new Rect();
        }
        this.num_scissor_rects = 0;

        this.ResetRenderTargets();
    }

    ResetRenderTargets() {
        for(let i=0; i<this.num_bind_render_targets; i++) {
            this.bound_render_targets = null;
        }
        this.num_bind_render_targets = 0;
        this.framebuffer_width = 0;
        this.framebuffer_height = 0;
        this.framebuffer_slices = 0;

        this.is_default_framebuffer_bound = false;
        this.bound_depth_stencil = null;
    }

    GraphicStateSave() { throw 'implementation needed'; }
    GraphicStateRestore() { throw 'implementation needed'; }
}
 
export {
    DeviceContext,
}
