import { DeviceContext } from "../graphics-engine/device-context";
import { CommandEncoder } from "./gpu-command-encoder";

class DeviceContextGPU extends DeviceContext {
    constructor(renderDevice, isDeferred) {
        super(renderDevice, isDeferred);

        this.gpu_command_encoder = new CommandEncoder(this.render_device);
    }

    SetPipelineState(pipelineState) {
        super.SetPipelineState(pipelineState);
    }

    TransitionShaderResources(pipelineState, shaderResourceBinding) { }

    CommitShaderResources(shaderResourceBinding, flags) { }

    BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs) {
        if(super.BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs)) {
            this.gpu_command_encoder.BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs);
        }
    }

    SetStencilRef(stencilRef) {
        if(super.SetStencilRef(stencilRef)) {

        }
    }

    SetBlendFactors(factors) {
        if(super.SetBlendFactors(factors)) {
            
        }
    }

    SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags) {
        super.SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags);
    }

    SetIndexBuffer(indexBuffer, byteOffset) {
        super.SetIndexBuffer(indexBuffer, byteOffset);
    }

    ResolveResourceTo(msaaTexture, resolvedTexture) { }

    ResolveResource(msaaTexture) { }

    FinishCommandList(commandList) { }

    ExecuteCommandList(commandList) { }

    Flush() { }

    SetViewports(numViewports, viewports, RTWidth, RTHeight) { }

    SetScissorRects(numRect, rects) { }

    EndRenderPass() {
        super.EndRenderPass();
        this.gpu_command_encoder.EndRenderPass();
    }

    Draw(drawAttribs) {
        super.Draw(drawAttribs);
    }

    UpdateBufferRegion(buffer, offset, size, data) {
        const gpuDevice = this.render_device.GetWebGPUDevice();
        const gpuBuffer = buffer.GetNativeHandle();
        // a safe fallback. generally a fairly efficient path, and in some cases the most efficient path
        gpuDevice.queue.writeBuffer(gpuBuffer, offset, data, 0, size);
        // or use a staging buffer ring
    }

    CopyBufferRegion(srcBuffer, srcOffset, dstBuffer, dstOffset, size) {
        this.gpu_command_encoder.CopyBufferToBuffer(srcBuffer, srcOffset, dstBuffer, dstOffset, size);
    }

    CopyTextureRegion(srcTexture, srcMipLevel, srcSlice, srcBox, 
        dstMipLevel, dstSlice, dstX, dstY, dstZ) 
    {
        const source = {
            aspect: 'all',
            mipLevel: srcMipLevel,
        };

        const dest = {
            aspect: 'all',
            mipLevel: dstMipLevel,
        };

        const copySize = {

        };
    }
}

export {
    DeviceContextGPU,
}
