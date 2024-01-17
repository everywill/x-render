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

class GLContextState {
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
}

export {
    GLContextState,
}