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

    EndRenderPass() {
        super.EndRenderPass();
        this.gpu_command_encoder.EndRenderPass();
    }

    Draw(drawAttribs) {
        super.Draw(drawAttribs);
    }
}

export {
    DeviceContextGPU,
}
