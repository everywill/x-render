import { DeviceContext } from "../graphics-engine/device-context";
import { VALUE_TYPE, TARGET_BUFFER_FLAGS } from "../graphics/graphics-types";
import { RenderPassDescriptorCache } from "./renderpass-descriptor-cache";

function TypeToGPUType(valueType) {
    let gpuType;
    switch(valueType) {
        case VALUE_TYPE.VT_UINT16:
            gpuType = 'uint16';
            break;
        case VALUE_TYPE.VT_UINT32:
            gpuType = 'uint32';
            break;
        case VALUE_TYPE.VT_UNDEFINED:
        case VALUE_TYPE.VT_INT8:
        case VALUE_TYPE.VT_UINT8:
        case VALUE_TYPE.VT_INT16:
        case VALUE_TYPE.VT_INT32:
        case VALUE_TYPE.VT_FLOAT16:
        case VALUE_TYPE.VT_FLOAT32:
        default:
            throw 'unexpected value type';
    }
    return gpuType;
}

class DeviceContextGPU extends DeviceContext {
    constructor(renderDevice, isDeferred) {
        super(renderDevice, isDeferred);
        this.renderpass_descriptor_cache = new RenderPassDescriptorCache();
        this.command_encoder = renderDevice.GetWebGPUDevice().createCommandEncoder();
        this.pass_encoder = null;
    }

    EnsureRenderpassEncoder() {
        if(!this.pass_encoder) {
            throw 'commit viewport must be called inside render pass';
        }
    }

    BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs) {
        if(super.BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs)) {
            const { flags, clear_color, depth_value, stencil_value } = renderPassAttribs;

            const descriptor = this.renderpass_descriptor_cache.GetDescriptor(numRenderTargets, renderTargets, depthStencil);

            const colorAttachments = descriptor.colorAttachments;
            for(let i=0; i<numRenderTargets; i++) {
                const attachment = colorAttachments[i];
                attachment.view = renderTargets[i].GetNativeHandle();
                if((1<<i) & (flags.clear | flags.discard_start)) {
                    attachment.clearValue = clear_color[i];
                    attachment.loadOp = "clear";
                } else {
                    attachment.loadOp = "load";
                }
                if((1<<i) & flags.discard_end) {
                    attachment.storeOp = "discard";
                } else {
                    attachment.storeOp = "store";
                }
            }

            const depthStencilAttachment = descriptor.depthStencilAttachment;
            if(depthStencilAttachment) {
                attachment = depthStencilAttachment;
                attachment.view = depthStencil.GetNativeHandle();
                if(TARGET_BUFFER_FLAGS.DEPTH & (flags.clear | flags.discard_start)) {
                    attachment.depthClearValue = depth_value;
                    attachment.depthLoadOp = 'clear';
                } else {
                    attachment.depthLoadOp = 'load';
                }
                if(TARGET_BUFFER_FLAGS.DEPTH & flags.discard_end) {
                    attachment.depthStoreOp = "discard";
                } else {
                    attachment.depthStoreOp = "store";
                }

                if(TARGET_BUFFER_FLAGS.STENCIL & (flags.clear | flags.discard_start)) {
                    attachment.stencilClearValue  = stencil_value;
                    attachment.stencilLoadOp = 'clear';
                } else {
                    attachment.stencilLoadOp = 'load';
                }
                if(TARGET_BUFFER_FLAGS.STENCIL & flags.discard_end) {
                    attachment.stencilStoreOp  = "discard";
                } else {
                    attachment.stencilStoreOp  = "store";
                }
            }

            this.pass_encoder = this.command_encoder.beginRenderPass(descriptor);

            // Set the viewport to match the render target size
            this.SetViewports(1, null, 0, 0);
        }
    }

    SetPipelineState(pipelineState) {
        if(pipelineState == this.pipelinestate) {
            return;
        }

        const PSODesc = pipelineState.GetDesc();
        let commitStates = false;
        let commitScissor = false;

        if(!this.pipelinestate) {
            // If no pipeline state is bound, we are working with the fresh command
            // list. We have to commit the states set in the context that are not
            // committed by the draw command (render targets, viewports, scissor rects, etc.)
            commitStates = true;
        } else {
            const oldPSODesc = this.pipelinestate.GetDesc();
            commitStates = oldPSODesc.is_compute_pipeline;
            commitScissor = !oldPSODesc.rasterizer_state_desc.scissor_enable;
        }

        this.EnsureRenderpassEncoder();

        super.SetPipelineState(pipelineState);
        this.pass_encoder.setPipeline(pipelineState.GetNativeHandle());

        if(!PSODesc.is_compute_pipeline) {
            if(commitStates) {
                this.pass_encoder.setStencilReference(this.stencil_ref);
                this.pass_encoder.setBlendConstant(this.blend_factors);
                this.CommitViewports();
            }
            if(PSODesc.graphics_pipeline_desc.scissor_enable && (commitStates || commitScissor)) {
                this.CommitScissorRects();
            }
        }
    }

    // resources transition not supported in WebGPU 
    TransitionShaderResources(pipelineState, shaderResourceBinding) { }

    CommitShaderResources(shaderResourceBinding, flags) {
        super.CommitShaderResources(shaderResourceBinding, flags);
        // this.BindProgramResources(shaderResourceBinding);
    }

    BindProgramResources(shaderResourceBinding) {
        const program = this.pipelinestate.GetProgram();

        const bindGroups = program.GetBindGroups();

        for(let i=0; i<bindGroups.length; i++) {
            if(bindGroups[i]) {
                this.pass_encoder.setBindGroup(i, bindGroups[i]);
            }
        }
    }

    SetStencilRef(stencilRef) {
        if(super.SetStencilRef(stencilRef)) {
            this.EnsureRenderpassEncoder();
            this.pass_encoder.setStencilReference(stencilRef);
        }
    }

    SetBlendFactors(factors) {
        if(super.SetBlendFactors(factors)) {
            this.EnsureRenderpassEncoder();
            this.pass_encoder.setBlendConstant(factors);
        }
    }

    SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags) {
        super.SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags);
        
        for(let i=0; i<this.vertex_streams.length; i++) {
            const currentStream = this.vertex_streams[i];
            if(currentStream) {
                this.pass_encoder.setVertexBuffer(i, currentStream.buffer, currentStream.offset);
            }
        }
    }

    SetIndexBuffer(indexBuffer, byteOffset) {
        super.SetIndexBuffer(indexBuffer, byteOffset);
    }

    SetViewports(numViewports, viewports, RTWidth, RTHeight) {
        super.SetViewports(numViewports, viewports, RTWidth, RTHeight);
        if(numViewports != this.num_viewports) {
            console.warn('unexpected num of viewports');
        }

        this.CommitViewports();
    }

    CommitViewports() {
        if(numViewports == 1) {
            this.EnsureRenderpassEncoder();
            const vp = viewports[0];
            this.pass_encoder.setViewport(vp.top_left_x, vp.top_left_y, vp.width, vp.height, vp.min_depth, vp.max_depth);
        } else {
            throw 'not supported multiple viewports';
        }
    }

    SetScissorRects(numRect, rects, RTWidth, RTHeight) {
        super.SetScissorRects(numRect, rects, RTWidth, RTHeight);
        if(this.pipelinestate) {
            const PSODesc = this.pipelinestate.GetDesc();
            if(!PSODesc.is_compute_pipeline && PSODesc.graphics_pipeline_desc.rasterizer_state_desc.scissor_enable) {
                this.CommitScissorRects();
            }
        }
    }

    CommitScissorRects() {
        if(this.num_scissor_rects == 1) {
            this.EnsureRenderpassEncoder();

            const rect = this.scissor_rects[0];
            const width = rect.right - rect.left;
            const height = rect.top - rect.bottom;

            this.pass_encoder.setScissorRect(rect.left, rect.bottom, width, height);
        } else {
            console.error('not support multiple scissors');
        }
    }

    ResolveResourceTo(msaaTexture, resolvedTexture) { }

    ResolveResource(msaaTexture) { }

    FinishCommandList(commandList) { }

    ExecuteCommandList(commandList) { }

    Flush() { }

    EndRenderPass() {
        super.EndRenderPass();
        this.pass_encoder.end();
    }

    Draw(drawAttribs) {
        super.Draw(drawAttribs);

        let indexFormat; 
        const indexBuffer = drawAttribs.is_indexed ? this.index_buffer : null;
        
        if(drawAttribs.is_indexed) {
            indexFormat = TypeToGPUType(drawAttribs.index_type);
            if(!indexBuffer) {
                throw 'index buffer is not bound to the pipeline';
            }
            this.pass_encoder.setIndexBuffer(indexBuffer.GetNativeHandle(), indexFormat, this.index_data_start_offset);
        }

        if(drawAttribs.is_indirect) {
            if(drawAttribs.is_indexed) {
                this.pass_encoder.drawIndexedIndirect(drawAttribs.indirect_draw_attribs, drawAttribs.indirect_drawargs_offset);
            } else {
                this.pass_encoder.drawIndirect(drawAttribs.indirect_draw_attribs, drawAttribs.indirect_drawargs_offset);
            }
        } else {
            if(drawAttribs.is_indexed) {
                this.pass_encoder.drawIndexed(drawAttribs.num_vertices_or_indices, 
                                            drawAttribs.num_instances, 
                                            drawAttribs.start_vertex_or_index_location,
                                            drawAttribs.base_vertex,
                                            drawAttribs.start_instance_location);
            } else {
                this.pass_encoder.draw(drawAttribs.num_vertices_or_indices,
                                    drawAttribs.num_instances, 
                                    drawAttribs.start_vertex_or_index_location,
                                    drawAttribs.start_instance_location);
            }
        }
    }

    UpdateBufferRegion(buffer, offset, size, data) {
        const gpuDevice = this.render_device.GetWebGPUDevice();
        const gpuBuffer = buffer.GetNativeHandle();
        // a safe fallback. generally a fairly efficient path, and in some cases the most efficient path
        gpuDevice.queue.writeBuffer(gpuBuffer, offset, data, 0, size);
        // or use a staging buffer ring
    }

    CopyBufferRegion(srcBuffer, srcOffset, dstBuffer, dstOffset, size) {
        this.command_encoder.copyBufferToBuffer(
            srcBuffer.GetNativeHandle(), srcOffset,
            dstBuffer.GetNativeHandle(), dstOffset,
            size,
        );
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

        this.command_encoder.copyTextureToTexture(source, dest, copySize);
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
            this.command_encoder.copyBufferToTexture(source, destination, copySize);
        }
    }
}

export {
    DeviceContextGPU,
}
