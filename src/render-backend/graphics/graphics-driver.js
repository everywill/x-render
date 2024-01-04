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
    TransitionShaderResources(pipelineState, shaderResourceBinding) {
        this.device_context.TransitionShaderResources(pipelineState, shaderResourceBinding);
    }
    SetStencilRef(stencilRef) {
        this.device_context.SetStencilRef(stencilRef);
    }
    SetBlendFactors(blendFactors) {
        this.device_context.SetBlendFactors(blendFactors);
    }
    SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags) {
        this.device_context.SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags);
    }
    SetIndexBuffer(indexBuffer, byteOffset) {
        this.device_context.SetIndexBuffer(indexBuffer, byteOffset);
    }
    SetViewports(numViewports, viewports, RTWidth, RTHeight) {
        this.device_context.SetViewports(numViewports, viewports, RTWidth, RTHeight);
    }
    SetScissorRects(numRect, rects) {
        this.device_context.SetScissorRects(numRect, rects);
    }
    InvalidateState() {
        this.device_context.InvalidateState();
    }
    BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs) {
        this.device_context.BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs);
    }
    EndRenderPass() {
        this.device_context.EndRenderPass();
    }
    Draw(drawAttribs) {
        this.device_context.Draw(drawAttribs);
    }
    FinishCommandList(commandList) {
        this.device_context.FinishCommandList(commandList);
    }
    ExecuteCommandList(commandList) {
        this.device_context.ExecuteCommandList(commandList);
    }
    Flush() {
        this.device_context.Flush();
    }
    SetSwapChain(swapchain) {
        this.device_context.SetSwapChain(swapchain);
    }

    // buffer method
    GetDesc(buffer) {
        return buffer.GetDesc();
    }
    UpdateData(buffer, offset, size, data) {
        return buffer.UpdateData(this.device_context, offset, size, data);
    }
    CopyData(dstBuffer, srcBuffer, srcOffset, dstOffset, size) {
        dstBuffer.CopyData(this.device_context, srcBuffer, srcOffset, dstOffset, size);
    }
    Map(buffer, mapType, mapFlags, mappedData) {
        buffer.Map(this.device_context, mapType, mapFlags, mappedData);
    }
    Unmap(buffer, mapType, mapFlags) {
        buffer.Unmap(this.device_context, mapType, mapFlags);
    }
    GetDefaultView(buffer, view_type) {
        return buffer.GetDefaultView(view_type);
    }

    // bufferview method
    GetDesc(bufferView) {
        return bufferView.GetDesc();
    }
    GetBuffer(bufferView) {
        return bufferView.GetBuffer();
    }
}

export {
    GraphicsDriver,
}