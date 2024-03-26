import { EngineCreationAttribs, RenderDevice } from "../graphics-engine/render-device";
import { DEVICE_TYPE } from "../graphics/device-caps";
import { CONTEXT_CREATION_TYPE } from "../graphics/graphics-types";
import { BufferGL } from "./buffer-gl";
import { gl } from "./gl";
import { GLContext } from "./gl-context";
import { PipelineStateGL } from "./pipeline-state-gl";
import { ProgramGL } from "./program-gl";
import { SamplerGL } from "./sampler-gl";
import { ShaderGL } from "./shader-gl";

class EngineGLAttribs extends EngineCreationAttribs {
    constructor() {
        super();
        this.device_type = DEVICE_TYPE.DEVICE_TYPE_OPENGLES;
        this.context_creation_type = CONTEXT_CREATION_TYPE.ATTACH;
    }
}

class RenderDeviceGL extends RenderDevice {
    constructor(engineAttribs) {
        super(engineAttribs.custom_device_caps, 0);
        this.device_caps.separable_program_supported = false;
        this.gl_context = new GLContext(engineAttribs, this.device_caps);
    }

    InitDeviceLimits() {
        // msaa samples
        this.device_caps.limit_caps.max_msaa_sample_count = gl.getParameter(gl.MAX_SAMPLES);
        
        // width/height
        let size = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        this.device_caps.limit_caps.max_texture_size_1D = size;
        this.device_caps.limit_caps.max_texture_size_2D = size;

        this.device_caps.limit_caps.max_texture_size_3D = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);

        this.device_caps.limit_caps.max_texture_size_cube = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);

        // depth/slices
        this.device_caps.limit_caps.max_texture_array_layers = gl.getParameter(gl.MAX_ARRAY_TEXTURE_LAYERS);
    }

    CreateBuffer(bufferDesc, bufferData) {
        const buffer = new BufferGL(this, bufferDesc, bufferData);
        buffer.CreateDefaultViews();
        return buffer;
    }

    CreateShader(shaderCreationAttribs) {
        return new ShaderGL(this, shaderCreationAttribs);
    }

    CreateProgram(programDesc) {
        return new ProgramGL(this, programDesc);
    }

    CreateTexture(textureDesc, textureData) {
        // const formatInfo = 

    }

    CreateSampler(samplerDesc) {
        return new SamplerGL(this, samplerDesc);
    }

    CreatePipelineState(pipelineStateDesc) {
        return new PipelineStateGL(this, pipelineStateDesc);
    }

    TestTextureFormat(textureFormat) {
        
    }
}

export {
    EngineGLAttribs,
    EngineGLAttribs,
    RenderDeviceGL,
}