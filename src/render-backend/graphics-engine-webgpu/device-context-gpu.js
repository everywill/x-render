import { DeviceContext } from "../graphics-engine/device-context";
import { CommandEncoder } from "./gpu-command-encoder";

class DeviceContextGPU extends DeviceContext {
    constructor(renderDevice, isDeferred) {
        super(renderDevice, isDeferred);

        this.gpu_command_encoder = new CommandEncoder(this.render_device);
    }

    BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs) {
        if(super.BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs)) {
            this.gpu_command_encoder.BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs);
        }
    }

    SetPipelineState(pipelineState) {
        super.SetPipelineState(pipelineState);
        this.gpu_command_encoder.SetPipelineState(pipelineState);
    }

    TransitionShaderResources(pipelineState, shaderResourceBinding) { }

    CommitShaderResources(shaderResourceBinding, flags) {
        super.CommitShaderResources(shaderResourceBinding, flags);
        this.BindProgramResources(shaderResourceBinding);
    }

    BindProgramResources(shaderResourceBinding) {
        const program = this.pipelinestate.GetProgram();
        this.gpu_command_encoder.SetBindGroups(program.GetBindGroups()); 
    }

    SetStencilRef(stencilRef) {
        if(super.SetStencilRef(stencilRef)) {
            this.gpu_command_encoder.SetStencilRef(stencilRef);
        }
    }

    SetBlendFactors(factors) {
        if(super.SetBlendFactors(factors)) {
            this.gpu_command_encoder.SetBlendFactors(factors);
        }
    }

    SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags) {
        super.SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags);
        this.gpu_command_encoder.SetVertexBuffers(this.vertex_streams);
    }

    SetIndexBuffer(indexBuffer, byteOffset) {
        super.SetIndexBuffer(indexBuffer, byteOffset);
    }

    SetViewports(numViewports, viewports, RTWidth, RTHeight) {
        super.SetViewports(numViewports, viewports, RTWidth, RTHeight);
        if(numViewports != this.num_viewports) {
            console.warn('unexpected num of viewports');
        }

        if(numViewports == 1) {
            const vp = viewports[0];
            this.gpu_command_encoder.SetViewport(vp.top_left_x, vp.top_left_y, vp.width, vp.height, vp.min_depth, vp.max_depth);
        } else {
            throw 'not supported multiple viewports';
        }
    }

    SetScissorRects(numRect, rects, RTWidth, RTHeight) {
        super.SetScissorRects(numRect, rects, RTWidth, RTHeight);
    }

    ResolveResourceTo(msaaTexture, resolvedTexture) { }

    ResolveResource(msaaTexture) { }

    FinishCommandList(commandList) { }

    ExecuteCommandList(commandList) { }

    Flush() { }

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
                        dstTexture, dstMipLevel, dstSlice, dstX, dstY, dstZ) 
    {
        const source = {
            aspect: 'all',
            mipLevel: srcMipLevel,
            origin: [srcBox.min_x, srcBox.min_y, srcBox.min_z],
            texture: srcTexture.GetNativeHandle(),
        };

        const dest = {
            aspect: 'all',
            mipLevel: dstMipLevel,
            origin: [dstX, dstY, dstZ],
            texture: dstTexture.GetNativeHandle(),
        };

        const copySize = {
            width: srcBox.max_x - srcBox.min_x,
            height: srcBox.max_y - srcBox.min_y,
            depthOrArrayLayers: srcBox.max_z - srcBox.min_z,
        };

        this.gpu_command_encoder.copyTextureToTexture(source, dest, copySize);
    }

    UpdateTextureRegion(texture, mipLevel, slice, dstBox, subResData) {
        if(subResData.data) {
            // provided by CPU memory
            const destination = {
                aspect: 'all',
                mipLevel,
                origin: {
                    x: dstBox.min_x,
                    y: dstBox.min_y,
                    z: dstBox.min_z,
                },
                texture: texture.GetNativeHandle(),
            };
            const data = subResData.data;
            const dataLayout = {
                bytesPerRow: subResData.stride,
                rowsPerImage: subResData.depth_stride / subResData.stride,
            };
            const size = {
                width: dstBox.max_x - dstBox.min_x,
                height: dstBox.max_y - dstBox.min_y,
                depthOrArrayLayers: dstBox.max_z - dstBox.min_x,
            }

            const gpuDevice = this.render_device.GetWebGPUDevice();
            gpuDevice.queue.writeTexture(destination, data, dataLayout, size);
        } else {
            // provided by GPU memory
            const source = {
                buffer: subResData.src_buffer.GetNativeHandle(),
                bytesPerRow: subResData.stride,
                rowsPerImage: subResData.depth_stride / subResData.stride,
            };

            const destination = {
                aspect: 'all',
                mipLevel,
                origin: {
                    x: dstBox.min_x,
                    y: dstBox.min_y,
                    z: dstBox.min_z,
                },
                texture: texture.GetNativeHandle(),
            };

            const copySize = {
                width: dstBox.max_x - dstBox.min_x,
                height: dstBox.max_y - dstBox.min_y,
                depthOrArrayLayers: dstBox.max_z - dstBox.min_x,
            };
            this.gpu_command_encoder.copyBufferToTexture(source, destination, copySize);
        }
    }
}

export {
    DeviceContextGPU,
}
