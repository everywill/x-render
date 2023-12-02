import { MAX_RENDER_TARGETS } from './constant';
import { COMPARISON_FUNCTION } from './graphics-types'

const FILL_MODE = {
    FILL_MODE_UNDEFINED: 0,
    FILL_MODE_WIREFRAME: 1,  // OpenGL counterpart: GL_LINE; but glPolygonMode not supported on WebGL
    FILL_MODE_SOLID: 2,      // OpenGL counterpart: GL_FILL
    FILL_MODE_NUM_MODES: 3 
}

const CULL_MODE = {
    CULL_MODE_UNDEFINED: 0,
    CULL_MODE_NONE: 1,  // OpenGL counterpart: glDisable(GL_CULL_FACE)
    CULL_MODE_FRONT: 2, // OpenGL counterpart: GL_FRONT
    CULL_MODE_BACK: 3,  // OpenGL counterpart: GL_BACK
    CULL_MODE_NUM_MODES: 4
}

class RasterizerStateDesc {
    constructor() {
        // default
        this.fill_mode = FILL_MODE.FILL_MODE_SOLID;
        this.cull_mode = CULL_MODE.CULL_MODE_BACK;   
        this.front_counter_clock_wise = false; // OpenGL: glFrontFace GL_CW or GL_CCW
        // near and far plane clipping
        this.depth_clip_enable = true; // OpenGL: GL_DEPTH_CLAMP
        // cull outside scissor rectangle
        this.scissor_enable = false;  
        // against z-fight
        this.depth_bias = 0;   // OpenGL counterpart: glPolygonOffset
        this.slope_scaled_depth_bias = 0;
        this.depth_bias_clamp = 0; // not supported by OpenGL
    }
}

const BLEND_FACTOR = {  // glBlendFunc
    BLEND_FACTOR_UNDEFINED: 0,
    BLEND_FACTOR_ZERO: 1,  // OpenGL: GL_ZERO
    BLEND_FACTOR_ONE: 2,   // OpenGL: GL_ONE
    BLEND_FACTOR_SRC_COLOR: 3, // OpenGL: GL_SRC_COLOR
    BLEND_FACTOR_INV_SRC_COLOR: 4, // OpenGL: GL_ONE_MINUS_SRC_COLOR
    BLEND_FACTOR_SRC_ALPHA: 5, // OpenGL: GL_SRC_ALPHA
    BLEND_FACTOR_INV_SRC_ALPHA: 6, // OpenGL: GL_ONE_MINUS_SRC_ALPHA
    BLEND_FACTOR_DEST_ALPHA: 7,  // OpenGL: GL_DST_ALPHA
    BLEND_FACTOR_INV_DEST_ALPHA: 8, // OpenGL: GL_ONE_MINUS_DST_ALPHA
    BLEND_FACTOR_DEST_COLOR: 9,  // OpenGL: GL_DST_COLOR
    BLEND_FACTOR_INV_DEST_COLOR: 10,  // OpenGL: GL_ONE_MINUS_DST_COLOR
    // (f,f,f,1) where f = min(As, 1-Ad)
    BLEND_FACTOR_SRC_ALPHA_SAT: 11,  // OpenGL: GL_SRC_ALPHA_SATURATE
    BLEND_FACTOR_BLEND_FACTOR: 12,   // OpenGL: GL_CONSTANT_COLOR
    BLEND_FACTOR_INV_BLEND_FACTOR: 13,  // OpenGL: GL_ONE_MINUS_CONSTANT_COLOR
    BLEND_FACTOR_SRC1_COLOR: 14,    // OpenGL: GL_SRC1_COLOR
    BLEND_FACTOR_INV_SRC1_COLOR: 15,    // OpenGL: GL_ONE_MINUS_SRC1_COLOR
    BLEND_FACTOR_SRC1_ALPHA: 16,   // OpenGL: GL_SRC1_ALPHA
    BLEND_FACTOR_INV_SRC1_ALPHA: 17,    // OpenGL: GL_ONE_MINUS_SRC1_ALPHA
    BLEND_FACTOR_NUM_FACTORS: 18
};

const BLEND_OPERATION = {   // glBlendEquation
    BLEND_OPERATION_UNDEFINED: 0, 
    BLEND_OPERATION_ADD: 1,  // OpenGL: GL_FUNC_ADD
    // src - dest
    BLEND_OPERATION_SUBTRACT: 2,  // OpenGL: GL_FUNC_SUBTRACT
    BLEND_OPERATION_REV_SUBTRACT: 3, // OpenGL: GL_FUNC_REVERSE_SUBTRACT
    // min(src, dest)
    BLEND_OPERATION_MIN: 4,  // OpenGL: GL_MIN
    BLEND_OPERATION_MAX: 5,  // OpenGL: GL_MAX
    BLEND_OPERATION_NUM_OPERATIONS: 6,
};

const COLOR_MASK = {  // glColorMask
    COLOR_MASK_NONE: 0,
    COLOR_MASK_RED: 0x1,
    COLOR_MASK_GREEN: 0x2,
    COLOR_MASK_BLUE: 0x4,
    COLOR_MASK_ALPHA: 0x8,
    COLOR_MASK_RGB: 0x7,
    COLOR_MASK_ALL: 0xf,
};

// alternative to blend operation, limited to uint
// const LOGIC_OPERATION = {}

class RenderTargetBlendDesc {
    constructor() {
        this.blend_enable = false;
        // this.logic_operation_enable = false;
        this.scr_blend = BLEND_FACTOR.BLEND_FACTOR_ONE;
        this.dest_blend = BLEND_FACTOR.BLEND_FACTOR_ZERO;
        this.blend_op = BLEND_OPERATION.BLEND_OPERATION_ADD;
        this.src_blend_alpha = BLEND_FACTOR.BLEND_FACTOR_ONE;
        this.dest_blend_alpha = BLEND_FACTOR.BLEND_FACTOR_ZERO;
        this.blend_op_alpha = BLEND_OPERATION.BLEND_OPERATION_ADD;
        this.color_mask = COLOR_MASK.COLOR_MASK_ALL;
    }
}

class BlendStateDesc {
    constructor() {
        this.alpha_to_coverage_enable = false;
        // if set to false, only RenderTargets[0] will be used
        this.independent_blend_enable = false;
        this.RenderTargets = [];
        for(let i=0; i<MAX_RENDER_TARGETS; i++) {
            this.RenderTargets.push(new RenderTargetBlendDesc());
        }
    }
}

const STENCIL_OP = {
    STENCIL_OP_UNDEFINED: 0,
    // keep the existing stencil data
    STENCIL_OP_KEEP: 1,  // OpenGL: GL_KEEP
    // set the stencil data to 0
    STENCIL_OP_ZERO: 2,  // OpenGL: GL_ZERO
    // set to reference value
    STENCIL_OP_REPLACE: 3,  // OpenGL: GL_REPLACE
    // increment and clamp to maximum
    STENCIL_OP_INCR_SAT: 4,  // OpenGL: GL_INCR
    // decrement and clamp to 0
    STENCIL_OP_DECR_SAT: 5,  // OpenGL: GL_DECR
    // bitwise invert current stencil buffer
    STENCIL_OP_INVERT : 6,  // OpenGL: GL_INVERT
    // increment and wrap to 0
    STENCIL_OP_INCR_WRAP: 7,  // OpenGL: GL_INCR_WRAP
    // decrement and wrap to maximum
    STENCIL_OP_DECR_WRAP: 8,  // OpenGL: GL_DECR_WRAP
    STENCIL_OP_NUM_OPS: 9
};

class StencilOpDesc {
    constructor() {
        this.stencil_fail_op = STENCIL_OP.STENCIL_OP_KEEP;
        this.stencil_depth_fail_op = STENCIL_OP.STENCIL_OP_KEEP;
        this.stencil_pass_op = STENCIL_OP.STENCIL_OP_KEEP;
        this.stencil_func = COMPARISON_FUNCTION.COMPARISON_FUNC_ALWAYS;
    }
    
}

class DepthStencilStateDesc {
    constructor() {
        this.depth_enable = true;
        this.depth_write_enable = true;  // hint: depth' mask
        this.depth_func = COMPARISON_FUNCTION.COMPARISON_FUNC_LESS;
        this.stencil_enable = false;
        this.stencil_read_mask = 0xff;
        this.stencil_write_mask = 0xff;
        this.front_face = new StencilOpDesc();
        this.back_face = new StencilOpDesc();
    }
}

// not supported in OpenGL
// class SampleDesc {
//     constructor() {
//         this.count = 1;
//         this.quality = 0;
//     }
// } 

export {
    FILL_MODE, CULL_MODE, 
    RasterizerStateDesc,
    BLEND_FACTOR, BLEND_OPERATION, COLOR_MASK,
    // RenderTargetBlendDesc, 
    BlendStateDesc,
    DepthStencilStateDesc,
}