import { RenderDevice } from "../graphics-engine/render-device";
import { BufferGPU } from "./buffer-gpu";
import { PipelineStateGPU } from "./pipeline-state-gpu";
import { ProgramGPU } from "./program-gpu";
import { SamplerGPU } from "./sampler-gpu";
import { ShaderGPU } from "./shader-gpu";
import { TextureGPU } from "./texture-gpu";

class RenderDeviceGPU extends RenderDevice {
    constructor(engineAttribs) {
        super(engineAttribs.custom_device_caps, 0);
    }

    CheckProgramBinarySupported() {
        this.device_caps.shader_binary_supported = false;
    }

    FlagSupportedTexFormats() {
        const deviceCaps = this.device_caps;
    }

    QueryDeviceCaps() {
        this.device_caps.compute_shader_supported = true;
        this.device_caps.geometry_shader_supported = false;
        this.device_caps.tessellation_supported = false; 

        this.device_caps.texture_caps.texture2D_copy_supported = true;
        this.device_caps.texture_caps.texture2D_load_store_supported = true;
        this.device_caps.texture_caps.textureview_supported = true;
        this.device_caps.independent_blend_supported = true;
    }

    InitDeviceLimits() {
        // only support 1 and 4
        this.device_caps.limit_caps.max_msaa_sample_count = 4;

        // this.device_caps.limit_caps.max_texture_size_1D
    }

    CreateBuffer(bufferDesc, bufferData) {
        const buffer = new BufferGPU(this, bufferDesc, bufferData);
        buffer.CreateDefaultViews();
        return buffer;
    }

    CreateShader(shaderCreationAttribs) {
        return new ShaderGPU(this, shaderCreationAttribs);
    }

    CreateProgram(programDesc) {
        return new ProgramGPU(this, programDesc);
    }

    GetTextureFormatInfo(textureFormat) { }

    CreateTexture(textureDesc, textureData) {
        this.GetTextureFormatInfo(textureDesc.format);

        const texture = new TextureGPU(this, textureDesc, textureData);
        texture.CreateDefaultViews();
        return texture;
    }

    CreateSampler(samplerDesc) {
        return new SamplerGPU(this, samplerDesc);
    }

    CreatePipelineState(pipelineStateDesc) {
        return new PipelineStateGPU(this, pipelineStateDesc);
    }
}

export {
    RenderDeviceGPU,
}