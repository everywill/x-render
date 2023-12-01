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

export {
    FILL_MODE, CULL_MODE, 
    RasterizerStateDesc,
}