import { DeviceContext } from "../graphics-engine/device-context";
import { MISC_TEXTURE_FLAGS, PRIMITIVE_TOPOLOGY, TARGET_BUFFER_FLAGS, TEXTURE_VIEW_TYPE, UNIFORM_TYPE, VALUE_TYPE } from "../graphics/graphics-types";
import { AppGLState } from "./app-gl-state";
import { GLContextState } from "./gl-context-state";
import { DEVICE_TYPE, MAX_RENDER_TARGETS } from "../graphics/device-caps";
import { COLOR_MASK } from "../graphics/pipelinestate-desc";
import { GetValueSize } from "../graphics-accessories/graphics-accessories";
import { GetCurrentContext } from "./gl-context";

function PrimitiveTopologyToGLTopology(primitiveTopology) {
    let glTopology;
    const gl = GetCurrentContext();
    switch(primitiveTopology) {
        case PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_UNDEFINED:
            glTopology = undefined;
            break;
        case PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_TRIANGLE_LIST:
            glTopology = gl.TRIANGLES;
            break;
        case PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP:
            glTopology = gl.TRIANGLE_STRIP;
            break;
        case PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_POINT_LIST:
            glTopology = gl.POINTS;
            break;
        case PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_LINE_LIST:
            glTopology = gl.LINES;
            break;
        case PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_LINE_STRIP:
            glTopology = gl.LINE_STRIP;
            break;
        default:
            throw 'unexpected primitive topology';
    }
    return glTopology;
}

function TypeToGLType(valueType) {
    let glType;
    const gl = GetCurrentContext();
    switch(valueType) {
        case VALUE_TYPE.VT_UNDEFINED:
            glType = undefined;
            break;
        case VALUE_TYPE.VT_INT8:
            glType = gl.BYTE;
            break;
        case VALUE_TYPE.VT_UINT8:
            glType = gl.UNSIGNED_BYTE;
            break;
        case VALUE_TYPE.VT_INT16:
            glType = gl.SHORT;
            break;
        case VALUE_TYPE.VT_UINT16:
            glType = gl.UNSIGNED_SHORT;
            break;
        case VALUE_TYPE.VT_INT32:
            glType = gl.INT;
            break;
        case VALUE_TYPE.VT_UINT32:
            glType = gl.UNSIGNED_INT;
            break;
        case VALUE_TYPE.VT_FLOAT16:
            glType = undefined;
            break;
        case VALUE_TYPE.VT_FLOAT32:
            glType = gl.FLOAT;
            break;
        default:
            throw 'unexpected value type';
    }
    return glType;
}

class DeviceContextGL extends DeviceContext {
    constructor(renderDevice, isDeferred) {
        super(renderDevice, isDeferred);
        this.context_state = new GLContextState(renderDevice);
        this.default_fbo = null;
        this.app_gl_state = new AppGLState(renderDevice);

        // storage block
        // this.bound_writable_textures = [];
        // image load/store
        // this.bound_writable_buffers = [];
    }

    GetContextState() { return this.context_state; }

    SetPipelineState(pipelineState) {
        super.SetPipelineState(pipelineState);

        const desc = this.pipelinestate.GetDesc();

        if(desc.is_compute_pipeline) {

        } else {
            this.context_state.SetDepthStencilState(this.pipelinestate.GetDepthStencilState(),  this.stencil_ref);
            this.context_state.SetRasterizerState(this.pipelinestate.GetRasterizerState());

            const blendStateDesc = desc.graphics_pipeline_desc.blend_state_desc;
            this.context_state.SetBlendState(blendStateDesc, desc.graphics_pipeline_desc.sample_mask);

            this.context_state.SetPrimitiveRestart(desc.graphics_pipeline_desc.enable_primitive_restart);
        }
    }

    TransitionShaderResources(pipelineState, shaderResourceBinding) { }

    CommitShaderResources(shaderResourceBinding, flags) {
        super.CommitShaderResources(shaderResourceBinding, flags);
        this.BindProgramResources(shaderResourceBinding);
    }

    BindProgramResources(shaderResourceBinding) {
        const gl = GetCurrentContext();
        const program = this.pipelinestate.GetProgram();
        let glProgram = program.GetGLProgram();

        if(!glProgram) {
            throw 'no program/program pipeline is set for the draw call';
        }

        this.context_state.SetProgram(glProgram);

        const deviceCaps = this.render_device.GetDeviceCaps();
        const programPipelineSupported = deviceCaps.separable_program_supported;
        const numPrograms = programPipelineSupported ? program.GetNumShaders() : 1;

        let textureIndex = 0;
        let uniformBuffBindPoint = 0;
        // this.bound_writable_buffers = [];
        // this.bound_writable_textures = [];

        for(let i=0; i<numPrograms; i++) {
            const shader = program.GetShader(i);
            glProgram = programPipelineSupported ? shader.gl_program : glProgram;
            const dynamicResources = shaderResourceBinding ? shaderResourceBinding.GetProgramResources(shader.GetDesc().shader_type, this.pipelinestate) : null;

            for(let j=0; j<(dynamicResources ? 2 : 1); j++) {
                const progResources = j ? dynamicResources : glProgram.GetConstantResources();

                const programHandle = glProgram.native_handle;

                const uniformBlocks = progResources.GetUniformBlocks();
                for(let index=0; index<uniformBlocks.length; index++) {
                    const block = uniformBlocks[index];
                    for(let arrayIndex=0; arrayIndex<block.array_size; arrayIndex++) {
                        const buffer = block.resources[arrayIndex];
                        if(buffer) {
                            gl.bindBufferBase(gl.UNIFORM_BUFFER, uniformBuffBindPoint, buffer.GetGLBuffer());
                            gl.uniformBlockBinding(programHandle, block.index+arrayIndex, uniformBuffBindPoint);

                            uniformBuffBindPoint++;
                        } else {
                            throw `no uniform buffer is bound to ${block.name} variable in the shader`;
                        }
                    }
                }

                const samplers = progResources.GetSamplers();
                for(let index=0; index<samplers.length; index++) {
                    const sampler = samplers[index];
                    for(let arrayIndex=0; arrayIndex<sampler.array_size; arrayIndex++) {
                        const texView = sampler.resources[arrayIndex];
                        if(texView) {
                            this.context_state.BindTexture(textureIndex, texView.GetBindTarget(), texView.GetTexture());
                        } else {
                            throw `no texture sampler is bound to ${sampler.name} variable in the shader`;
                        }

                        let samplerToUse;
                        if(sampler.static_sampler) {
                            samplerToUse = sampler.static_sampler;
                        } else {
                            samplerToUse = texView.GetSampler();
                        }

                        if(samplerToUse) {
                            this.context_state.BindSampler(textureIndex, samplerToUse.GetGLSampler());
                        }

                        gl.uniform1i(sampler.location, textureIndex);

                        textureIndex++;
                    }
                }

                const scaleUniforms = progResources.GetScaleUniforms();
                for(let uniform of scaleUniforms) {
                    switch(uniform.data_type) {
                        case UNIFORM_TYPE.FLOAT:
                            gl.uniform1fv(uniform.uniform_location, new Float32Array(uniform.scale_uniform));
                            break;
                        case UNIFORM_TYPE.FLOAT2:
                            gl.uniform2fv(uniform.uniform_location, new Float32Array(uniform.scale_uniform));
                            break;
                        case UNIFORM_TYPE.FLOAT3:
                            gl.uniform3fv(uniform.uniform_location, new Float32Array(uniform.scale_uniform));
                            break;

                        case UNIFORM_TYPE.FLOAT4:
                            gl.uniform4fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                            break;
                        case UNIFORM_TYPE.MAT2X2:
                            gl.uniformMatrix2fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform))
                            break;
                        case UNIFORM_TYPE.MAT3X3:
                            gl.uniformMatrix3fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                            break;
                        case UNIFORM_TYPE.MAT4X4:
                            gl.uniformMatrix4fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                            break;
                        case UNIFORM_TYPE.MAT2X3:
                            gl.uniformMatrix2x3fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                            break;
                        case UNIFORM_TYPE.MAT2X4:
                            gl.uniformMatrix2x4fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                            break;
                        case UNIFORM_TYPE.MAT3X2:
                            gl.uniformMatrix3x2fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                            break;
                        case UNIFORM_TYPE.MAT3X4:
                            gl.uniformMatrix3x4fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                            break;
                        case UNIFORM_TYPE.MAT4X2:
                            gl.uniformMatrix4x2fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                            break;
                        case UNIFORM_TYPE.MAT4X3:
                            gl.uniformMatrix4x3fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                            break;

                        case UNIFORM_TYPE.INT:
                            gl.uniform1iv(uniform.uniform_location, new Int32Array(uniform.scale_uniform));
                            break;
                        case UNIFORM_TYPE.INT2:
                            gl.uniform2iv(uniform.uniform_location, new Int32Array(uniform.scale_uniform));
                            break;
                        case UNIFORM_TYPE.INT3:
                            gl.uniform3iv(uniform.uniform_location, new Int32Array(uniform.scale_uniform));
                            break;
                        case UNIFORM_TYPE.INT4:
                            gl.uniform4iv(uniform.uniform_location, new Int32Array(uniform.scale_uniform));
                            break;
                    }
                }
            }
        }
    }

    SetStencilRef(stencilRef) {
        if(super.SetStencilRef(stencilRef)) {
            const gl = GetCurrentContext();
            this.context_state.SetStencilRef(gl.FRONT, stencilRef);
            this.context_state.SetStencilRef(gl.BACK, stencilRef);
        }
    }

    SetBlendFactors(factors) {
        if(super.SetBlendFactors(factors)) {
            this.context_state.SetBlendFactors(factors);
        }
    }

    SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags) {
        super.SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags);
    }

    SetIndexBuffer(indexBuffer, byteOffset) {
        super.SetIndexBuffer(indexBuffer, byteOffset);
    }

    ResolveResourceTo(msaaTexture, resolvedTexture) {
        if(msaaTexture && resolvedTexture) {
            const gl = GetCurrentContext();
            const desc = msaaTexture.GetDesc();
            msaaTexture.SetResolveFlag(true);
            const renderDevice = this.render_device;
            const currentNativeGLContext = this.render_device.gl_context.GetCurrentNativeGLContext();
            const fboCache = renderDevice.GetFBOCache(currentNativeGLContext);

            const srcTexView = msaaTexture.GetDefaultView(TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET);
            const srcFBO = fboCache.GetFBO(1, [srcTexView], null, this.context_state);

            const dstTexView = resolvedTexture.GetDefaultView(TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET);
            const dstFBO = fboCache.GetFBO(1, [dstTexView], null, this.context_state);

            if(srcFBO && dstFBO) {
                gl.bindFramebuffer(gl.READ_FRAMEBUFFER, srcFBO);
                gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, dstFBO);

                gl.disable(gl.SCISSOR_TEST);
                gl.blitFramebuffer(0, 0, desc.width, desc.height, 0, 0, desc.width, desc.height, gl.COLOR_BUFFER_BIT, gl.NEAREST);
            }
        }
    }

    ResolveResource(msaaTexture) {
        const desc = msaaTexture.GetDesc();
        if(msaaTexture && desc.misc_flag & MISC_TEXTURE_FLAGS.MISC_TEXTURE_FLAG_RESOLVE) {
            const gl = GetCurrentContext();
            const currentNativeGLContext = this.render_device.gl_context.GetCurrentNativeGLContext();
            const fboCache = this.render_device.GetFBOCache(currentNativeGLContext);

            const srcTexView = msaaTexture.GetDefaultView(TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET);
            const srcFBO = fboCache.GetFBO(1, [srcTexView], null, this.context_state);

            const dstTexView = msaaTexture.GetDefaultView(TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE);
            const dstFBO = fboCache.GetFBO(1, [dstTexView], null, this.context_state);

            gl.bindFramebuffer(gl.READ_FRAMEBUFFER, srcFBO);
            gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, dstFBO);

            gl.disable(gl.SCISSOR_TEST);
            gl.blitFramebuffer(0, 0, desc.width, desc.height, 0, 0, desc.width, desc.height, gl.COLOR_BUFFER_BIT, gl.NEAREST);
        }
    }

    FinishCommandList(commandList) {
        throw 'deferred context is not supported in WebGL';
    }

    ExecuteCommandList(commandList) { 
        throw 'deferred context is not supported in WebGL';
    }

    Flush() {
        const gl = GetCurrentContext();
        gl.flush();
    }

    InvalidateState() {
        super.InvalidateState();
        this.context_state.Invalidate();
    }

    GraphicStateSave() {
        this.app_gl_state.Save();
        this.InvalidateState();
    }

    GraphicStateRestore() {
        this.app_gl_state.Restore();
        this.context_state.gl_prog = null;
        this.context_state.vao = null;
        this.context_state.fbo = null;
        this.context_state.render_buffer = null;
        
        // risk: ddelete resources safely
        this.context_state.bound_samplers = [];
        this.context_state.bound_textures = [];
    }

    BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs) {
        if(super.BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs)) {
            for(let i=0; i<this.num_targets_to_resolve; i++) {
                this.ResolveResource(this.pre_render_targets_to_resolve[i].GetTexture());
                this.pre_render_targets_to_resolve[i] = null;
            }
            this.num_targets_to_resolve = 0;
            this.CommitRenderTargets();
            const caps = this.render_device.GetDeviceCaps();
            const clearFlag = this.render_pass_attribs.flags.clear;
            const discardStartFlag = this.render_pass_attribs.flags.discard_start;
            if(caps.dev_type==DEVICE_TYPE.DEVICE_TYPE_OPENGLES && caps.major_version>=3) {
                const attachmentArray = [];
                // this.GetAttachments(attachmentArray, discardStartFlag);
                // if(attachmentArray.length) {
                //     const gl = GetCurrentContext();
                //     gl.invalidateFramebuffer(gl.FRAMEBUFFER, attachmentArray);
                // }
            } else {
                this.ClearWithRasterPipe(discardStartFlag & ~clearFlag);
            }
            if(clearFlag) {
                this.ClearWithRasterPipe(clearFlag);
            }
        }
    }

    CommitRenderTargets() {
        if(this.is_default_framebuffer_bound) {
            const swapchain = this.swapchain;
            const defaultFBO = swapchain.GetDefaultFBO();
            if(this.default_fbo != defaultFBO) {
                this.default_fbo = defaultFBO;
            }
            this.context_state.BindFBO(this.default_fbo);
        } else {
            if(this.num_bind_render_targets==0 && !this.bound_depth_stencil) {
                throw 'at least one render target or a depth stencil is expected';
            }
            let numRenderTargets = this.num_bind_render_targets;
            if(numRenderTargets >= MAX_RENDER_TARGETS) {
                console.warn('too many render target are set');
                numRenderTargets = Math.min(numRenderTargets, MAX_RENDER_TARGETS);
            }

            const ctxCaps = this.context_state.GetContextCaps();
            if(numRenderTargets >= ctxCaps.max_draw_buffers) {
                console.warn(`this device only supports ${ctxCaps.max_draw_buffers} draw buffers`);
                numRenderTargets = Math.min(numRenderTargets, ctxCaps.max_draw_buffers);
            }

            const boundRTVs = [];
            for(let i=0; i<numRenderTargets; i++) {
                boundRTVs[i] = this.bound_render_targets[i];
            }

            const currentNativeGLContext = this.render_device.gl_context.GetCurrentNativeGLContext();
            const fboCache = this.render_device.GetFBOCache(currentNativeGLContext);
            const fbo = fboCache.GetFBO(numRenderTargets, boundRTVs, this.bound_depth_stencil, this.context_state);
            this.context_state.BindFBO(fbo);
        }
        this.SetViewports(1, [], 0, 0);
    }

    SetViewports(numViewports, viewports, RTWidth, RTHeight) {
        super.SetViewports(numViewports, viewports, RTWidth, RTHeight);
        if(numViewports != this.num_viewports) {
            console.warn('unexpected num of viewports');
        }

        if(numViewports == 1) {
            // OpenGL window coordinates start from left-bottom
            const vp = viewports[0];
            const bottomLeftX = vp.top_left_x;
            const bottomLeftY = RTHeight - (vp.top_left_y + vp.height);
            const width = vp.width;
            const height = vp.height;

            const gl = GetCurrentContext();
            gl.viewport(bottomLeftX, bottomLeftY, width, height);
            gl.depthRange(vp.min_depth, vp.max_depth);
        } else {
            throw 'not support multiple viewports';
        }
    }

    SetScissorRects(numRect, rects, RTWidth, RTHeight) {
        super.SetScissorRects(numRect, rects, RTWidth, RTHeight);
        if(this.num_scissor_rects == 1) {
            const gl = GetCurrentContext();
            const rect = this.scissor_rects[0];
            // Note that OpenGL and DirectX use different origin
            // of the viewport in window coordinates:
            //
            // DirectX (0,0)
            //     \ ____________
            //      |            |
            //      |            |
            //      |            |
            //      |            |
            //      |____________|
            //     /
            //  OpenGL (0,0)
            //
            const glBottom = RTHeight - rect.top;
            const width = rect.right - rect.left;
            const height = rect.top - rect.bottom;
            gl.scissor(rect.left, glBottom, width, height);
        } else {
            console.error('not support multiple scissors');
        }
    }

    GetAttachments(attachmentArray, targetBuffers) {
        const gl = GetCurrentContext();
        if(targetBuffers & TARGET_BUFFER_FLAGS.COLOR0) {
            attachmentArray.push(this.is_default_framebuffer_bound ? gl.COLOR : gl.COLOR_ATTACHMENT0);
        }
        if(targetBuffers & TARGET_BUFFER_FLAGS.COLOR1) {
            attachmentArray.push(gl.COLOR_ATTACHMENT1);
        }
        if(targetBuffers & TARGET_BUFFER_FLAGS.COLOR2) {
            attachmentArray.push(gl.COLOR_ATTACHMENT2);
        }
        if(targetBuffers & TARGET_BUFFER_FLAGS.COLOR3) {
            attachmentArray.push(gl.COLOR_ATTACHMENT3);
        }
        if(targetBuffers & TARGET_BUFFER_FLAGS.COLOR4) {
            attachmentArray.push(gl.COLOR_ATTACHMENT4);
        }
        if(targetBuffers & TARGET_BUFFER_FLAGS.COLOR5) {
            attachmentArray.push(gl.COLOR_ATTACHMENT5);
        }
        if(targetBuffers & TARGET_BUFFER_FLAGS.COLOR6) {
            attachmentArray.push(gl.COLOR_ATTACHMENT6);
        }
        if(targetBuffers & TARGET_BUFFER_FLAGS.COLOR7) {
            attachmentArray.push(gl.COLOR_ATTACHMENT7);
        }
        if(targetBuffers & TARGET_BUFFER_FLAGS.DEPTH) {
            attachmentArray.push(this.is_default_framebuffer_bound ? gl.DEPTH : gl.DEPTH_ATTACHMENT);
        }
        if(targetBuffers & TARGET_BUFFER_FLAGS.STENCIL) {
            attachmentArray.push(this.is_default_framebuffer_bound ? gl.STENCIL : gl.STENCIL_ATTACHMENT);
        }
    }

    ClearWithRasterPipe(clearFlags) {
        const gl = GetCurrentContext();
        const depthWriteEnabled = this.context_state.GetDepthWriteEnable();
        const scissorTestEnabled = this.context_state.GetScissorTestEnable();
        if(!depthWriteEnabled) {
            gl.depthMask(true);
        }
        if(scissorTestEnabled) {
            gl.disable(gl.SCISSOR_TEST);
        }

        for(let i=0; i<MAX_RENDER_TARGETS; i++) {
            const colorAttachment = TARGET_BUFFER_FLAGS.COLOR0 << i;
            if(clearFlags & colorAttachment) {
                const colorWriteMask = this.context_state.GetColorWriteMask(i);
                this.context_state.SetColorWriteMask(i, COLOR_MASK.COLOR_MASK_ALL, colorWriteMask.is_independent);
                gl.clearBufferfv(gl.COLOR, i, this.render_pass_attribs.clear_color[i]);
                this.context_state.SetColorWriteMask(i, colorWriteMask.write_mask, colorWriteMask.is_independent);
            }

            if((clearFlags & TARGET_BUFFER_FLAGS.DEPTH_AND_STENCIL) == TARGET_BUFFER_FLAGS.DEPTH_AND_STENCIL) {
                gl.clearBufferfi(gl.DEPTH_STENCIL, 0, this.render_pass_attribs.depth_value, this.render_pass_attribs.stencil_value);
            } else {
                if(clearFlags & TARGET_BUFFER_FLAGS.DEPTH) {
                    gl.clearBufferfv(gl.DEPTH, 0, [this.render_pass_attribs.depth_value]);
                }
                if(clearFlags & TARGET_BUFFER_FLAGS.STENCIL) {
                    gl.clearBufferiv(gl.STENCIL, 0, [this.render_pass_attribs.stencil_value]);
                }
            }
        }

        if(scissorTestEnabled) {
            gl.enable(gl.SCISSOR_TEST);
        }
        if(!depthWriteEnabled) {
            gl.depthMask(false);
        }
    }

    EndRenderPass() {
        super.EndRenderPass();
        const caps = this.render_device.GetDeviceCaps();
        const clearFlag = this.render_pass_attribs.flags.clear;
        const discardEndFlag = this.render_pass_attribs.flags.discard_end;
        if(caps.dev_type ==DEVICE_TYPE.DEVICE_TYPE_OPENGLES && caps.major_version>=3) {
            this.CommitRenderTargets();
            const attachmentArray = [];
            this.GetAttachments(attachmentArray, discardEndFlag);
            if(attachmentArray.length) {
                const gl = GetCurrentContext();
                gl.invalidateFramebuffer(gl.FRAMEBUFFER, attachmentArray);
            }
        }
    }

    Draw(drawAttribs) {
        super.Draw(drawAttribs);
        const gl = GetCurrentContext();
        const renderDevice = this.render_device;
        const currentNativeGLContext = renderDevice.gl_context.GetCurrentNativeGLContext();
        
        const pipelineDesc = this.pipelinestate.GetDesc().graphics_pipeline_desc;
        const VAOCache = this.render_device.GetVAOCache(currentNativeGLContext);
        const indexBuffer = drawAttribs.is_indexed ? this.index_buffer : null;

        let VAO;
        if(pipelineDesc.input_layout_desc.num_elements>0 || indexBuffer) {
            VAO = VAOCache.GetVAO(this.pipelinestate, indexBuffer, this.vertex_streams, this.num_vertex_streams, this.context_state);
        } else {
            VAO = VAOCache.GetEmptyVAO();
        }
        this.context_state.BindVAO(VAO);

        let glTopology;
        const topology = pipelineDesc.primitive_topology;

        if(topology >= PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_CONTROL_POINT_PATCHLIST) {
            throw 'tessellation is not supported';
        } else {
            glTopology = PrimitiveTopologyToGLTopology(topology);
        }

        let indexType;
        let firstIndexByteOffset;

        if(drawAttribs.is_indexed) {
            indexType = TypeToGLType(drawAttribs.index_type);
            if(indexType != gl.UNSIGNED_BYTE && indexType != gl.UNSIGNED_SHORT && indexType != gl.UNSIGNED_INT) {
                throw 'unsupported index type';
            }
            if(!indexBuffer) {
                throw 'index buffer is not bound to the pipeline';
            }
            firstIndexByteOffset = GetValueSize(drawAttribs.index_type) * drawAttribs.start_vertex_or_index_location + this.index_data_start_offset;
        }

        if(drawAttribs.is_indirect) {
            console.error('indirect rendering is not supported');
        } else {
            if(drawAttribs.num_instances > 1) {
                if(drawAttribs.is_indexed) {
                    if(drawAttribs.base_vertex) {
                        console.error('not support draw elements instanced base vertex');
                    } else {
                        if(drawAttribs.start_instance_location) {
                            console.error('not support draw elements instanced base instance');
                        } else {
                            gl.drawElementsInstanced(glTopology, drawAttribs.num_vertices_or_indices, indexType, firstIndexByteOffset, drawAttribs.num_instances);
                        }
                    }
                } else {
                    if(drawAttribs.start_instance_location) {
                        console.error('not support draw arrays instanced base instance');
                    } else {
                        gl.drawArraysInstanced(glTopology, drawAttribs.start_vertex_or_index_location, drawAttribs.num_vertices_or_indices, drawAttribs.num_instances);
                    }
                }
            } else {
                if(drawAttribs.is_indexed) {
                    if(drawAttribs.base_vertex) {
                        console.error('not supported')
                    } else {
                        gl.drawElements(glTopology, drawAttribs.num_vertices_or_indices, indexType, firstIndexByteOffset);
                    }
                } else {
                    gl.drawArrays(glTopology, drawAttribs.start_vertex_or_index_location, drawAttribs.num_vertices_or_indices);
                }
            }
        }

        this.context_state.UnbindVAO();
    }
}

export {
    DeviceContextGL,
}
