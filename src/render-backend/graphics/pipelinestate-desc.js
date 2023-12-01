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

export {
    FILL_MODE, CULL_MODE, 
    RasterizerStateDesc,
    BLEND_FACTOR, BLEND_OPERATION,
    COLOR_MASK,
}