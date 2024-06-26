import { MAX_RENDER_TARGETS } from "../graphics/device-caps";
import { COLOR_MASK, CULL_MODE, RenderTargetBlendDesc } from "../graphics/pipelinestate-desc";
import { AppGLState } from "./app-gl-state";
import { BlendFactorToGLBlend, BlendOperation2GLBlendOp, CompareFuncToGLCompare, StencilOpToGLStencilOp } from "./gl";
import { GetCurrentContext } from "./gl-context";

class ContextCaps {
    constructor() {
        this.fill_mode_selection_supported = true;
        this.reservedz_perspertive = true;
        this.depth_clamp_supported = true;
        this.primitive_restart = true;
        this.max_combined_texture_units = 0;
        this.max_draw_buffers = 0;
    }
}

class StencilOpState {
    constructor() {
        const gl = GetCurrentContext();
        this.func = gl.ALWAYS;
        this.stencil_fail_op = gl.KEEP;
        this.stencil_depth_fail_op = gl.KEEP;
        this.stencil_pass_op = gl.KEEP;
    }
}

class DepthStencilGLState {
    constructor() {
        const gl = GetCurrentContext();
        this.depth_enable_state = true;
        this.depth_writes_enable_state = true;
        this.depth_cmp_func = gl.ALWAYS;
        this.stencil_test_enable_state = false;
        this.stencil_read_mask = 0xffff;
        this.stencil_write_mask = 0xffff;
        this.stencil_op_states = [];
        // front and back face
        for(let i=0; i<=1; i++) {
            this.stencil_op_states[i] = new StencilOpState();
        }
    }

    // Equal(other) {
    //     if(other.depth_enable_state != this.depth_enable_state) {
    //         return false;
    //     }
    //     if(other.depth_writes_enable_state != this.depth_writes_enable_state) {
    //         return false;
    //     }
    //     if(other.depth_cmp_func != this.depth_cmp_func) {
    //         return false;
    //     }
    // }
}

class RasterizerGLState {
    constructor() {
        // fillMode selection not supported in WebGL2
        // this.fill_mode = gl.FILL;
        this.cull_mode = CULL_MODE.CULL_MODE_BACK;
        this.front_counter_clock_wise = true;
        this.depth_bias = 0;
        this.slope_scaled_depth_bias = 0;
        this.depth_clamp_enable = true;
        this.scissor_test_enable = true;
    }
}

class GLContextState {
    gl_prog = null;
    // gl_pipeline = null;
    vao = null;
    fbo = null;
    render_buffer = null;
    DS_state = null;
    RS_state = null;
    color_write_mask = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff];
    independent_write_mask = false;
    active_texture = -1;
    num_patch_vertices = -1;
    primitive_restart = false;
    constructor(renderDevice) {
        const gl = GetCurrentContext();
        this.render_device = renderDevice;
        this.caps = new ContextCaps();
        const deviceCaps = this.render_device.GetDeviceCaps();
        this.caps.fill_mode_selection_supported = deviceCaps.wireframe_fill_supported;
        this.caps.reservedz_perspertive = deviceCaps.reversedz_perspective;
        this.caps.depth_clamp_supported = deviceCaps.depth_clamp_supported;

        // supported above 430
        this.caps.primitive_restart = false;

        this.caps.max_combined_texture_units = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
        if(this.caps.max_combined_texture_units<=0) {
            throw 'MAX_COMBINED_TEXTURE_IMAGE_UNITS is 0';
        }
        this.caps.max_draw_buffers = gl.getParameter(gl.MAX_DRAW_BUFFERS);
        if(this.caps.max_draw_buffers<=0) {
            throw 'MAX_DRAW_BUFFERS is 0';
        }

        this.bound_textures = [];
        this.bound_textures_capacity = this.caps.max_combined_texture_units;
        this.bound_samplers = [];
        this.bound_samplers_capacity = 32;
        this.bound_images = [];
        this.bound_images_capacity = 32;
    }

    GetContextCaps() { return this.caps; }

    SetCurrentGLState(renderDevice) {
        const gl = GetCurrentContext();
        const appGLState = new AppGLState(renderDevice);
        appGLState.Save();
        this.Invalidate();

        const depthStencil = new DepthStencilGLState();
        depthStencil.depth_enable_state = appGLState.depth_test;
        depthStencil.depth_writes_enable_state = appGLState.depth_mask;
        depthStencil.depth_cmp_func = appGLState.depth_func;
        depthStencil.stencil_test_enable_state = appGLState.stencil_test;
        depthStencil.stencil_read_mask = 0xffff;
        depthStencil.stencil_write_mask = 0xffff;
        this.SetDepthStencilState(depthStencil, 0);

        const rasterizerState = new RasterizerGLState();
        rasterizerState.cull_mode = appGLState.cull_face ? 
            (appGLState.cull_face_mode == gl.FRONT ? CULL_MODE.CULL_MODE_FRONT : CULL_MODE.CULL_MODE_BACK) : CULL_MODE.CULL_MODE_NONE;
        rasterizerState.front_counter_clock_wise = appGLState.front_face == gl.CCW ? true : false;
        rasterizerState.depth_bias = appGLState.polygon_offset_units;
        rasterizerState.slope_scaled_depth_bias = appGLState.polygon_offset_factor;
        rasterizerState.depth_clamp_enable = false;
        rasterizerState.scissor_test_enable = false;
        this.SetRasterizerState(rasterizerState);
    }

    Invalidate() {
        const gl = GetCurrentContext();
        // reset gl context state
        gl.useProgram(null);
        gl.bindVertexArray(null);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
        this.gl_prog = null;
        this.vao = null;
        this.fbo = null;
        this.bound_textures = [];
        this.bound_samplers = [];
        this.bound_images = [];

        this.SetDepthStencilState(new DepthStencilGLState(), 0);
        this.SetRasterizerState(new RasterizerGLState());

        for(let i=0; i<this.color_write_mask.length; i++) {
            this.color_write_mask[i] = 0xff;
        }
        this.independent_write_mask = false;
        this.active_texture = -1;
        this.num_patch_vertices = -1;
    }

    SetDepthStencilState(depthStencilState, stencilRef) {
        if(this.DS_state != depthStencilState) {
            const gl = GetCurrentContext();
            if(depthStencilState.depth_enable_state) {
                gl.enable(gl.DEPTH_TEST);
            } else {
                gl.disable(gl.DEPTH_TEST);
            }
            gl.depthMask(depthStencilState.depth_writes_enable_state);
            gl.depthFunc(depthStencilState.depth_cmp_func);
            if(depthStencilState.stencil_test_enable_state) {
                gl.enable(gl.STENCIL_TEST);
                gl.stencilMask(depthStencilState.stencil_write_mask);

                for(let i=0; i<2; i++) {
                    const face = i==0 ? gl.FRONT : gl.BACK;
                    const stencilState = depthStencilState.stencil_op_states[i];
                    gl.stencilFuncSeparate(face, stencilState.func, stencilRef, depthStencilState.stencil_read_mask);
                    gl.stencilOpSeparate(face, stencilState.stencil_fail_op, stencilState.stencil_depth_fail_op, stencilState.stencil_pass_op);
                }
            } else {
                gl.disable(gl.STENCIL_TEST);
            }  
            this.DS_state = depthStencilState;
        }
    }

    SetRasterizerState(rasterizerState) {
        if(this.RS_state != rasterizerState) {
            const gl = GetCurrentContext();
            if(rasterizerState.cull_mode == CULL_MODE.CULL_MODE_NONE) {
                gl.disable(gl.CULL_FACE);
            } else {
                gl.enable(gl.CULL_FACE);
                gl.cullFace(rasterizerState.cullFace == CULL_MODE.CULL_MODE_BACK ? gl.BACK : gl.FRONT);
            }
            const frontFace = rasterizerState.front_counter_clock_wise ? gl.CCW : gl.CW;
            gl.frontFace(frontFace);

            if(rasterizerState.depth_bias!=0 || rasterizerState.slope_scaled_depth_bias!=0) {
                gl.enable(gl.POLYGON_OFFSET_FILL);
            } else {
                gl.disable(gl.POLYGON_OFFSET_FILL);
            }
            gl.polygonOffset(rasterizerState.slope_scaled_depth_bias, rasterizerState.depth_bias);

            if(this.caps.depth_clamp_supported) {
                // not supported in WebGL
            }

            if(rasterizerState.scissor_test_enable) {
                gl.enable(gl.SCISSOR_TEST);
            } else {
                gl.disable(gl.SCISSOR_TEST);
            }

            this.RS_state = rasterizerState;
        }
    }

    SetProgram(glProgram) {
        if(this.gl_prog != glProgram) {
            const gl = GetCurrentContext();
            gl.useProgram(glProgram.native_handle);
            this.gl_prog = glProgram;
        }
    }

    BindVAO(vao) {
        if(this.vao != vao) {
            const gl = GetCurrentContext();
            gl.bindVertexArray(vao);
            this.vao = vao;
        }
    }

    UnbindVAO() {
        const gl = GetCurrentContext();
        gl.bindVertexArray(null);
        this.vao = null;
    }

    BindFBO(fbo) {
        if(this.fbo != fbo) {
            const gl = GetCurrentContext();
            gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, fbo);
            gl.bindFramebuffer(gl.READ_FRAMEBUFFER, fbo);
            this.fbo = fbo;
        }
    }

    SetActiveTexture(index) {
        if(index < 0) {
            index += this.caps.max_combined_texture_units;
        }
        if(index<0 || index>=this.caps.max_combined_texture_units) {
            throw 'Texture unit is out of range';
        }
        if(this.active_texture != index) {
            const gl = GetCurrentContext();
            gl.activeTexture(gl.TEXTURE0 + index);
            this.active_texture = index;
        }

        return index;
    }

    BindTexture(index, bindTarget, texture) {
        index = this.SetActiveTexture(index);

        if(this.bound_textures[index] != texture) {
            const gl = GetCurrentContext();
            gl.bindTexture(bindTarget, texture);
            this.bound_textures[index] = texture;
        }
    }

    BindRenderBuffer(renderBuffer) {
        if(this.render_buffer != renderBuffer) {
            const gl = GetCurrentContext();
            gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
            this.render_buffer = renderBuffer;
        }
    }

    GetRenderBuffer() {
        return this.render_buffer;
    }

    BindSampler(index, sampler) {
        if(this.bound_samplers[index] != sampler) {
            const gl = GetCurrentContext();
            gl.bindSampler(index, sampler);
            this.bound_samplers[index] = sampler;
        }
    }

    BindImage() {
        throw 'image texture is not supported';
    }

    EnsureMemoryBarrier() {
        throw 'image texture is not supported';
    }

    SetStencilRef(glFace, ref) {
        const gl = GetCurrentContext();
        const faceStencilOp = this.DS_state.stencil_op_states[glFace == gl.FRONT ? 0 : 1];
        gl.stencilFuncSeparate(glFace, faceStencilOp.func, ref, faceStencilOp.stencil_read_mask);
    }

    SetBlendFactors(blendFactors) {
        const gl = GetCurrentContext();
        gl.blendColor(blendFactors[0], blendFactors[1], blendFactors[2], blendFactors[3]);
    }

    GetDepthWriteEnable() { return this.DS_state.depth_writes_enable_state; }
    GetScissorTestEnable() { return this.RS_state.scissor_test_enable; }

    SetColorWriteMask(renderTargetIndex, writeMask, isIndependent) {
        // even though the write mask only applies to writes to a framebuffer, the mask state is NOT
        // Framebuffer state. So it is NOT part of a Framebuffer Object or the Default Framebuffer.
        // Binding a new framebuffer will NOT affect the mask.
        if(!isIndependent) {
            renderTargetIndex = 0;
        }

        if(this.color_write_mask[renderTargetIndex] != writeMask || this.independent_write_mask != isIndependent) {
            if(isIndependent) {
                if(this.render_device.GetDeviceCaps().independent_blend_supported) {
                    this.color_write_mask[renderTargetIndex] = writeMask;
                } else {
                    console.error('independent color mask not supported');
                }
            } else {
                const gl = GetCurrentContext();
                // gl.colorMask sets the mask for ALL draw buffers
                gl.colorMask(writeMask & COLOR_MASK.COLOR_MASK_RED ? true : false,
                            writeMask & COLOR_MASK.COLOR_MASK_GREEN ? true : false,
                            writeMask & COLOR_MASK.COLOR_MASK_BLUE ? true : false,
                            writeMask & COLOR_MASK.COLOR_MASK_ALPHA ? true : false);
                for(let i=0; i<this.color_write_mask.length; i++) {
                    this.color_write_mask[i] = writeMask;
                }
            }
            this.independent_write_mask = isIndependent;
        } 
    }

    GetColorWriteMask(renderTargetIndex) {
        if(!this.independent_write_mask) {
            renderTargetIndex = 0;
        }
        return {
            write_mask: this.color_write_mask[renderTargetIndex],
            is_independent: this.independent_write_mask,
        }
    }

    SetBlendState(blendStateDesc, sampleMask) {
        const gl = GetCurrentContext();
        if(sampleMask != 0xffffffff) {
            throw 'sample mask is not supported in WebGL';
        }
        let enableBlend = false;
        if(blendStateDesc.independent_blend_enable) {
            for(let i=0; i<MAX_RENDER_TARGETS; i++) {
                const renderTarget = blendStateDesc.render_targets[i];
                if(renderTarget.blend_enable) {
                    enableBlend = true;
                }
                if(i<this.caps.max_draw_buffers) {
                    this.SetColorWriteMask(i, renderTarget.color_mask, true);
                } else if(renderTarget.color_mask != (new RenderTargetBlendDesc()).color_mask){
                    throw `render target write mask is specified for buffer ${i}, but this device only support ${this.caps.max_draw_buffers} buffer`;
                }
            }
        } else {
            const renderTarget0 = blendStateDesc.render_targets[0];
            enableBlend = renderTarget0.blend_enable;
            this.SetColorWriteMask(0, renderTarget0.color_mask, false);
        }

        if(enableBlend) {
            gl.enable(gl.BLEND);
            if(blendStateDesc.alpha_to_coverage_enable) {
                gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
            } else {
                gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
            }
            if(blendStateDesc.independent_blend_enable) {
                if(this.render_device.GetDeviceCaps().independent_blend_supported) {
                    // not supported in WebGL
                } else {
                    console.error('not support indepedent blend')
                }
            } else {
                const renderTarget0 = blendStateDesc.render_targets[0];
                const srcFactorRGB = BlendFactorToGLBlend(renderTarget0.src_blend);
                const dstFactorRBG = BlendFactorToGLBlend(renderTarget0.dest_blend);
                const srcFactorAlpha = BlendFactorToGLBlend(renderTarget0.src_blend_alpha);
                const dstFactorAlpha = BlendFactorToGLBlend(renderTarget0.dest_blend_alpha);
                gl.blendFuncSeparate(srcFactorRGB, dstFactorRBG, srcFactorAlpha, dstFactorAlpha);

                const modeRGB = BlendOperation2GLBlendOp(renderTarget0.blend_op);
                const modeAlpha = BlendOperation2GLBlendOp(renderTarget0.blend_op_alpha);
                gl.blendEquationSeparate(modeRGB, modeAlpha);
            }
        } else {
            gl.disable(gl.BLEND);
        }
    }

    SetPrimitiveRestart(enablePrimitiveRestart) {
        if(this.caps.primitive_restart && this.primitive_restart != enablePrimitiveRestart) {
            this.primitive_restart = enablePrimitiveRestart;
            if(enablePrimitiveRestart) {
                // not supported in WebgGL
                // gl.enable
            } else {
                // not supported in WebgGL
                // gl.disable
            }
        }
    }

    SetNumPatchVertices(numVertices) {
        throw 'not supported';
    }
}

GLContextState.GetDepthStencilState = function(depthStencilStateDesc) {
    const gl_state = new DepthStencilGLState();
    gl_state.depth_enable_state = depthStencilStateDesc.depth_enable;
    gl_state.depth_writes_enable_state = depthStencilStateDesc.depth_write_enable;
    gl_state.depth_cmp_func = CompareFuncToGLCompare(depthStencilStateDesc.depth_func);

    gl_state.stencil_test_enable_state = depthStencilStateDesc.stencil_enable;
    gl_state.stencil_read_mask = depthStencilStateDesc.stencil_read_mask;
    gl_state.stencil_write_mask = depthStencilStateDesc.stencil_write_mask;
    
    const stencilConvert = (stencilOpDesc) => {
        const stencilOpState = new StencilOpState();
        stencilOpState.func = CompareFuncToGLCompare(stencilOpDesc.stencil_func);
        stencilOpState.stencil_fail_op = StencilOpToGLStencilOp(stencilOpDesc.stencil_fail_op);
        stencilOpState.stencil_depth_fail_op = StencilOpToGLStencilOp(stencilOpDesc.stencil_depth_fail_op);
        stencilOpState.stencil_pass_op = StencilOpToGLStencilOp(stencilOpDesc.stencil_pass_op);

        return stencilOpState;
    }

    gl_state.stencil_op_states[0] = stencilConvert(depthStencilStateDesc.front_face);
    gl_state.stencil_op_states[1] = stencilConvert(depthStencilStateDesc.back_face);

    return gl_state;
}

GLContextState.GetRasterizerState = function(rasterizerStateDesc) {
    const gl_state = new RasterizerGLState();
    // gl_state.fill_mode = rasterizerStateDesc.
    gl_state.cull_mode = rasterizerStateDesc.cull_mode;
    gl_state.depth_bias = rasterizerStateDesc.depth_bias;
    gl_state.slope_scaled_depth_bias = rasterizerStateDesc.slope_scaled_depth_bias;
    gl_state.depth_clamp_enable = rasterizerStateDesc.depth_clip_enable;
    gl_state.scissor_test_enable = rasterizerStateDesc.scissor_enable;

    return gl_state;
}

export {
    GLContextState,
}
