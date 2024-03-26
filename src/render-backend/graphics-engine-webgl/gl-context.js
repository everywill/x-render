import { CONTEXT_CREATION_TYPE } from "../graphics/graphics-types";
import { gl } from "./gl";

class GLContext {
    constructor(engineAttribs, deviceCaps) {
        this.context_creation_type = engineAttribs.context_creation_type;
        this.device_type = engineAttribs.device_type;

        this.InitContext(engineAttribs, deviceCaps);
    }

    InitContext(engineGLAttribs, deviceCaps) {
        if(engineGLAttribs.context_creation_type == CONTEXT_CREATION_TYPE.ATTACH) {
            this.CreateContext(engineGLAttribs, deviceCaps);
        } else if(engineGLAttribs.context_creation_type == CONTEXT_CREATION_TYPE.CREATE){

        }
    }

    CheckFeatures(engineGLAttribs, deviceCaps) {
        const version = gl.getParameter(gl.VERSION);
        const renderer = gl.getParameter(gl.RENDERER);

        const majorVersion = 3;
        const minorVersion = 0;

        deviceCaps.device_type = engineGLAttribs.device_type;

        deviceCaps.major_version = majorVersion;
        deviceCaps.minor_version = minorVersion;
        const isGLES310orAbove = majorVersion >= 4 || (majorVersion==3 && minorVersion>=1);
        deviceCaps.separable_program_supported = isGLES310orAbove;
        deviceCaps.indirect_rendering_supported = isGLES310orAbove;

        const samplerCaps = deviceCaps.sampler_caps;
        // need extension
        samplerCaps.border_sampling_mode_supported = false;
        samplerCaps.anisotropic_filtering_supported = false;
        samplerCaps.lod_bias_supported = false;

        const textureCaps = deviceCaps.texture_caps;
    }

    CreateContext(engineGLAttribs, deviceCaps) {
        const GLContextAttributes = {
            alpha: true,
            antialias: false,
            depth: true,
            failIfMajorPerformanceCaveat: false,
            powerPreference: "default",
            premultipliedAlpha: true,
            preserveDrawingBuffer: false,
            stencil: false,
            desynchronized: false
        }
    }

    AttachContext(engineGLAttribs, deviceCaps) {
        // this.context = 
    }
}

export {
    GLContext,
}
