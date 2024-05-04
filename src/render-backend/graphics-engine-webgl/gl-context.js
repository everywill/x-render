import { CONTEXT_CREATION_TYPE } from "../graphics/graphics-types";

let CURRENT_CONTEXT = null;
function MakeContextCurrent(ctx) {
    CURRENT_CONTEXT = ctx;
}

function GetCurrentContext() {
    return CURRENT_CONTEXT;
}

let CANVAS = null;
function SetCanvas(canvas) {
    CANVAS = canvas;
}

function GetCanvas() {
    return CANVAS;
}

class GLContext {
    constructor(engineAttribs, deviceCaps) {
        this.context_creation_type = engineAttribs.context_creation_type;
        this.device_type = engineAttribs.device_type;

        this.InitContext(engineAttribs, deviceCaps);
        this.CheckFeatures(engineAttribs, deviceCaps);
    }

    GetCurrentNativeGLContext() {
        return GetCurrentContext();
    }

    InitContext(engineGLAttribs, deviceCaps) {
        if(engineGLAttribs.context_creation_type == CONTEXT_CREATION_TYPE.ATTACH) {
            
        } else if(engineGLAttribs.context_creation_type == CONTEXT_CREATION_TYPE.CREATE){
            this.CreateContext(engineGLAttribs, deviceCaps);
        }
    }

    CheckFeatures(engineGLAttribs, deviceCaps) {
        const version = this.context.getParameter(this.context.VERSION);
        const renderer = this.context.getParameter(this.context.RENDERER);

        const majorVersion = 3;
        const minorVersion = 0;

        console.info(`${engineGLAttribs.context_creation_type == CONTEXT_CREATION_TYPE.CREATE ? 'Initialize WebGL context' : 'Attach WebGL context'}, ${majorVersion}.${minorVersion}, ${version}, ${renderer}`);

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
        SetCanvas(canvas);
        this.context = canvas.getContext('webgl2', GLContextAttributes);
        MakeContextCurrent(this.context);
    }

    AttachContext(engineGLAttribs, deviceCaps) {
        this.context = GetCurrentContext();
    }

    SwapBuffers(syncInterval) { /* do nothing */ }
}

export {
    GLContext,
    GetCurrentContext,
    GetCanvas,
}
