import { CULL_MODE } from "../graphics/pipelinestate-desc";
import { AppGLState } from "./app-gl-state";
import { gl } from "./gl";

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
        this.func = gl.ALWAYS;
        this.stencil_fail_op = gl.KEEP;
        this.stencil_depth_fail_op = gl.KEEP;
        this.stencil_pass_op = gl.KEEP;
    }
}

class DepthStencilGLState {
    constructor() {
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
        // this.fill_mode
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
    DS_state = null;
    RS_state = null;
    constructor(renderDevice) {
        this.render_device = renderDevice;
        this.caps = new ContextCaps();
        const deviceCaps = this.render_device.GetDeviceCaps();
        this.caps.fill_mode_selection_supported = deviceCaps.wireframe_fill_supported;
        this.caps.reservedz_perspertive = deviceCaps.eversedz_perspective;
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

    SetCurrentGLState(renderDevice) {
        const appGLState = new AppGLState(renderDevice);
    }

    Invalidate() {
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
    }

    SetDepthStencilState(depthStencilState, stencilRef) {
        if(this.DS_state != depthStencilState) {
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
            
            this.RS_state = rasterizerState;
        }
    }
}

export {
    GLContextState,
}