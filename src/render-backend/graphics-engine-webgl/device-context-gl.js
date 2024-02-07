import { DeviceContext } from "../graphics-engine/device-context";
import { AppGLState } from "./app-gl-state";
import { GLContextState } from "./context-state-gl";

class DeviceContextGL extends DeviceContext {
    constructor(renderDevice, isDeferred) {
        super(renderDevice, isDeferred);
        this.context_state = new GLContextState(renderDevice);
        this.default_fbo = null;
        this.app_gl_state = new AppGLState(renderDevice);

        this.bound_writable_textures = [];
        this.bound_writable_buffers = [];
    }

    ResolveResource(msaaTexture, resolvedTexture) {
        
    }
}

export {
    DeviceContextGL,
}
