import { DeviceContext } from "../graphics-engine/device-context";
import { MISC_TEXTURE_FLAGS, TEXTURE_VIEW_TYPE, UNIFORM_TYPE } from "../graphics/graphics-types";
import { AppGLState } from "./app-gl-state";
import { GLContextState } from "./gl-context-state";
import { HEAPF32, gl } from "./gl";
import { MAX_RENDER_TARGETS } from "../graphics/device-caps";

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
        if(!this.pipelinestate) {
            throw 'no pipeline state is bound';
        }

        const program = this.pipelinestate.GetProgram();
        const nativeProg = program.GetGLProgram();

        if(!nativeProg) {
            throw 'no program/program pipeline is set for the draw call';
        }

        this.context_state.SetProgram(nativeProg);

        const deviceCaps = this.render_device.GetDeviceCaps();
        const programPipelineSupported = deviceCaps.separable_program_supported;
        const numPrograms = programPipelineSupported ? program.GetNumShaders() : 1;

        let textureIndex = 0;
        let uniformBuffBindPoint = 0;
        // this.bound_writable_buffers = [];
        // this.bound_writable_textures = [];

        for(let i=0; i<numPrograms; i++) {
            const shader = program.GetShader(i);
            const glProgram = programPipelineSupported ? shader.gl_program : nativeProg;
            const dynamicResources = shaderResourceBinding ? shaderResourceBinding.GetProgramResources(shader.GetDesc().shader_type, this.pipelinestate) : null;

            for(let j=0; j<dynamicResources ? 2 : 1; j++) {
                const progResources = j ? dynamicResources : glProgram.GetConstantResource;

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
                    for(let arrayIndex=0; arrayIndex<item.array_size; arrayIndex++) {
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
                            this.context_state.BindSampler(textureIndex, sampler.GetGLSampler());
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

    ResolveResource(msaaTexture, resolvedTexture) {
        if(msaaTexture && resolvedTexture) {
            const desc = msaaTexture.GetDesc();
            msaaTexture.SetResolveFlag(resolved);
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
        gl.flush();
    }

    GraphicStateSave() {
        this.app_gl_state.Save();
        this.InvalidateState();
    }

    GraphicStateRestore() {
        this.app_gl_state.Restore();
        // this.context_state.
    }

    BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs) {
        if(super.BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs)) {
            for(let i=0; i<this.num_targets_to_resolve; i++) {
                this.ResolveResource(this.pre_render_targets_to_resolve[i].GetTexture());
                this.pre_render_targets_to_resolve[i] = null;
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
        this.SetViewports(1, null, 0, 0);
    }

    SetViewports(numViewports, viewports, RTWidth, RTHeight) {
        
    }
}

export {
    DeviceContextGL,
}
