import { CONTEXT_CREATION_TYPE } from "../graphics/graphics-types";
import { gl } from "./gl";

let CURRENT_CONTEXT = null;
function makeContextCurrent(ctx) {
    CURRENT_CONTEXT = ctx;
}

function getCurrentContext() {
    return CURRENT_CONTEXT;
}

class GLContext {
    constructor(engineAttribs, deviceCaps) {
        this.context_creation_type = engineAttribs.context_creation_type;
        this.device_type = engineAttribs.device_type;

        this.InitContext(engineAttribs, deviceCaps);
    }

    GetCurrentNativeGLContext() {
        return getCurrentContext();
    }

    InitContext(engineGLAttribs, deviceCaps) {
        if(engineGLAttribs.context_creation_type == CONTEXT_CREATION_TYPE.ATTACH) {
            
        } else if(engineGLAttribs.context_creation_type == CONTEXT_CREATION_TYPE.CREATE){
            this.CreateContext(engineGLAttribs, deviceCaps);
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
        textureCaps.texture1D_supported = false;  // not supported in GLES 3.1
        textureCaps.texture1D_array_supported = false;  // not supported in GLES 3.1
        textureCaps.texture2D_multisample_suppored = isGLES310orAbove;
        textureCaps.texture2D_multisample_array_suppored = false;  // not supported in GLES 3.1
        textureCaps.textureview_supported = false;  // not supported in GLES 3.1
        textureCaps.texture_level_parameter_supported = isGLES310orAbove;
        textureCaps.cubemap_array_supporte = false;  // not supported in GLES 3.1

        deviceCaps.multithread_resource_creation_supported = false;
        deviceCaps.depth_clamp_supported = false;

        deviceCaps.shader_binary_supported = false;
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

        const canvas = document.getElementById('canvas');
        this.context = canvas.getContext('webgl2', GLContextAttributes);
        makeContextCurrent(this.context);
    }

    AttachContext(engineGLAttribs, deviceCaps) {
        this.context = getCurrentContext();
    }

    SwapBuffers(syncInterval) { /* do nothing */ }
}

export {
    GLContext,
}
