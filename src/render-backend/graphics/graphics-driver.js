import { SwapChain } from "../graphics-engine/swapchain";
import { DEVICE_TYPE } from "./device-caps";

class GraphicsDriver {
    constructor() {
        this.render_device = null;
        this.device_context = null;
    }
    Create() {}

    // Create Graphics Object
    CreateBuffer(bufferDesc, bufferData) {
        return this.render_device.CreateBuffer(bufferDesc, bufferData)
    }
    CreateBufferView(buffer, viewDesc) {
        return buffer.CreateView(viewDesc);
    }
    CreatePipelineState(pipelineStateDesc) {
        return this.render_device.CreatePipelineState(pipelineStateDesc);
    }
    CreateShaderResourceBinding(pipelineState) {
        return pipelineState.CreateShaderResourceBinding();
    }
    CreateProgram(programDesc) {
        return this.render_device.CreateProgram(programDesc);
    }
    CreateSampler(samplerDesc) {
        return this.render_device.CreateSampler(samplerDesc);
    }
    CreateShader(creationAttribs) {
        return this.render_device.CreateShader(creationAttribs)
    }
    CreateTexture(textureDesc, textureData) {
        return this.render_device.CreateTexture(textureDesc, textureData);
    }
    CreateTextureView(texture, viewDesc) {
        return texture.CreateView(viewDesc);
    }
    ResolvedMSAATexture(msaaTexture, resolvedTexture) {
        if(msaaTexture && resolvedTexture) {
            const desc = msaaTexture.GetDesc();
            const outDesc = resolvedTexture.GetDesc();
            if(desc.sample_count>1 && desc.width==outDesc.width && desc.height==outDesc.height && desc.format==outDesc.format) {
                this.render_device.GetImmediateContext().ResolveResource(msaaTexture, resolvedTexture);
            }
        }
    }
    CreateSwapChain(swapchainDesc) {
        switch(this.render_device.GetDeviceCaps().dev_type) {
            case DEVICE_TYPE.DEVICE_TYPE_OPENGLES:
                return new SwapChain();
            case DEVICE_TYPE.DEVICE_TYPE_WEBGPU:
                // const engineFactory = GetEngineFactoryWebGPU(); 
                // return engineFactory.CreateSwapChainWebGPU(this.render_device, this.device_context, swapchainDesc);
            default:
                return new SwapChain();
        }
    }
    DestroyBuffer(buffer) {}
    DestroyPipelineState(pipelineState) {}
    DestroyShaderResourceBinding(shaderResourceBinding) {}
    DestroyProgram(program) {}
    DestroySampler(sampler) {}
    DestroyShader(shader) {}
    DestroyTexture(texture) {}
    DestroySwapChain(swapchain) {}

    GetDeviceCaps() {
        return this.render_device.GetDeviceCaps();
    }
    GetTextureFormatInfo(textureFormat) {
        return this.render_device.GetTextureFormatInfo(textureFormat);
    }

    // device context method
    SetPipelineState(pipelineState) {
        this.device_context.SetPipelineState(pipelineState);
    }
}

export {
    GraphicsDriver,
}