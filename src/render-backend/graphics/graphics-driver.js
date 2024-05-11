import { SwapChain } from "../graphics-engine/swapchain";
import { DEVICE_TYPE } from "./device-caps";
import { 
    CreateDefaultVertexBuffer, CreateStaticVertexBuffer, CreateDynamicVertexBuffer,
    CreateDefaultIndexBuffer, CreateStaticIndexBuffer, CreateDynamicIndexBuffer,
    CreateUniformBuffer,
} from "./buffer-helper";
import { EngineGLAttribs, RenderDeviceGL } from "../graphics-engine-webgl/render-device-gl";
import { BIND_FLAGS, CPU_ACCESS_FLAGS, SwapChainDesc, TEXTURE_FORMAT, USAGE } from "./graphics-types";
import { DeviceContextGL } from "../graphics-engine-webgl/device-context-gl";
import { SwapchainGL } from "../graphics-engine-webgl/swapchain-gl";
import { RenderPassAttribs } from "./device-context-desc";

class GraphicsDriver {
    constructor() {
        this.render_device = null;
        this.device_context = null;
        this.enterSave = false;
    }

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
                return new SwapchainGL(this.render_device, this.device_context, swapchainDesc);
            case DEVICE_TYPE.DEVICE_TYPE_WEBGPU:
                // const engineFactory = GetEngineFactoryWebGPU(); 
                // return engineFactory.CreateSwapChainWebGPU(this.render_device, this.device_context, swapchainDesc);
            default:
                return new SwapChain(this.render_device, this.device_context, swapchainDesc);
        }
    }
    DestroyBuffer(buffer) {
       buffer.Release();
    }
    DestroyPipelineState(pipelineState) {
        pipelineState.Release();
    }
    DestroyShaderResourceBinding(shaderResourceBinding) {
        shaderResourceBinding.Release();
    }
    DestroyProgram(program) {
        program.Release();
    }
    DestroySampler(sampler) {
        sampler.Release();
    }
    DestroyShader(shader) {
        shader.Release();
    }
    DestroyTexture(texture) {
        texture.Release();
    }
    DestroySwapChain(swapchain) {
        swapchain.Release();
    }

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
    CommitShaderResources(shaderResourceBinding, flags) {
        this.device_context.CommitShaderResources(shaderResourceBinding, flags);
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

    BeginRenderPass(renderTargets, depthStencil, renderPassAttribs) {
        const numRenderTargets = renderPassAttribs.num_render_targets;
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
    GetSwapChain() { return this.device_context.GetSwapChain(); }

    // buffer method
    GetBufferDesc(buffer) {
        return buffer.GetDesc();
    }
    UpdateBufferData(buffer, offset, size, data) {
        return buffer.UpdateData(this.device_context, offset, size, data);
    }
    CopyBufferData(dstBuffer, srcBuffer, srcOffset, dstOffset, size) {
        dstBuffer.CopyData(this.device_context, srcBuffer, srcOffset, dstOffset, size);
    }
    Map(buffer, mapType, mapFlags, mappedData) {
        buffer.Map(this.device_context, mapType, mapFlags, mappedData);
    }
    Unmap(buffer, mapType, mapFlags) {
        buffer.Unmap(this.device_context, mapType, mapFlags);
    }
    GetDefaultBufferView(buffer, view_type) {
        return buffer.GetDefaultView(view_type);
    }

    // bufferview method
    GetBufferViewDesc(bufferView) {
        return bufferView.GetDesc();
    }
    GetBuffer(bufferView) {
        return bufferView.GetBuffer();
    }

    // texture method
    GetTextureDesc(texture) {
        return texture.GetDesc();
    }
    GetDefaultTextureView(texture, viewType) {
        return texture.GetDefaultView(viewType);
    }
    UpdateTextureData(texture, mipLevel, slice, dstBox, subResData) {
        return texture.UpdateData(this.device_context, mipLevel, slice, dstBox, subResData);
    }
    CopyTextureData(dstTexture, srcTexture, srcMipLevel, srcSlice, srcBox, dstMipLevel, dstSlice, dstX, dstY, dstZ) {
        return dstTexture.CopyData(this.device_context, srcTexture, srcMipLevel, srcSlice, srcBox, dstMipLevel, dstSlice, dstX, dstY, dstZ);
    }
    ReadPixels(texture) {
        return texture.ReadPixels(this.device_context);
    }

    // textureview method
    GetTextureViewDesc(textureView) {
        return textureView.GetDesc();
    }
    GetSampler(textureView) {
        return textureView.GetSampler();
    }
    SetSampler(textureView, sampler) {
        textureView.SetSampler(sampler);
    }
    GetTexture(textureView) {
        return textureView.GetTexture();
    }
    GenerateMips(textureView) {
        return textureView.GenerateMips(this.device_context);
    }

    // pipelinestate method
    GetPipelineStateDesc(pipelineState) {
        return pipelineState.GetDesc();
    }

    // program method
    GetProgramDesc(program) {
        return program.GetDesc();
    }
    GetVSShaderReflection(program) {
        return program.GetVSShaderReflection();
    }
    GetPSShaderReflection(program) {
        return program.GetPSShaderReflection();
    }
    GetGSShaderReflection(program) {
        return program.GetGSShaderReflection();
    }
    GetHSShaderReflection(program) {
        return program.GetHSShaderReflection();
    }
    GetDSShaderReflection(program) {
        return program.GetDSShaderReflection();
    }
    GetCSShaderReflection(program) {
        return program.GetCSShaderReflection();
    }

    // sampler method
    GetSamplerDesc(sampler) {
        return sampler.GetDesc();
    }

    // shader method
    GetShaderDesc(shader) {
        return shader.GetDesc();
    }

    // shader resource binding method
    GetPipielineState(shaderResourceBinding) {
        return shaderResourceBinding.GetPipielineState();
    }
    SetShaderVariableWithBuffer(shaderResourceBinding, shaderType, name, buffer) {
        shaderResourceBinding.GetVariable(shaderType, name).Set(buffer);
    }
    SetShaderVariableWithBufferView(shaderResourceBinding, shaderType, name, bufferView) {
        shaderResourceBinding.GetVariable(shaderType, name).Set(bufferView);
    }
    SetShaderVariableWithTextureView(shaderResourceBinding, shaderType, name, textureView) {
        shaderResourceBinding.GetVariable(shaderType, name).Set(textureView);
    }
    SetShaderVariableWithBufferArray(shaderResourceBinding, shaderType, name, buffers, firstElement, numElements) {
        shaderResourceBinding.GetVariable(shaderType, name).SetArray(buffers, firstElement, numElements);
    }
    SetShaderVariableWithBufferViewArray(shaderResourceBinding, shaderType, name, bufferviews, firstElement, numElements) {
        shaderResourceBinding.GetVariable(shaderType, name).SetArray(bufferviews, firstElement, numElements);
    }
    SetShaderVariableWithTextureViewArray(shaderResourceBinding, shaderType, name, textureviews, firstElement, numElements) {
        shaderResourceBinding.GetVariable(shaderType, name).SetArray(textureviews, firstElement, numElements);
    }
    SetShaderVariableFloatArray(shaderResourceBinding, shaderType, name, floatArray, count) {
        shaderResourceBinding.GetVariable(shaderType, name).SetFloatArray(floatArray, count);
    }
    SetShaderVariableIntArray(shaderResourceBinding, shaderType, name, intArray, count) {
        shaderResourceBinding.GetVariable(shaderType, name).SetIntArray(intArray, count);
    }
    SetShaderVariableUintArray(shaderResourceBinding, shaderType, name, uintArray, count) {
        shaderResourceBinding.GetVariable(shaderType, name).SetUintArray(uintArray, count);
    }

    // swapchain method
    GetSwapchainDesc(swapchain) {
        return swapchain.GetDesc();
    }
    Present(swapchain, syncInterval) {
        swapchain.Present(syncInterval);
    }
    Resize(swapchain, newWidth, newHeight) {
        swapchain.Resize(newWidth, newHeight);
    }
    GetCurrentBackBufferRTV(swapchain) {
        return swapchain.GetCurrentBackBufferRTV();
    }
    GetCurrentBackBufferDSV(swapchain) {
        return swapchain.GetCurrentBackBufferDSV();
    }
    ReadPixels(swapchain) {
        return swapchain.ReadPixels();
    }

    // graphics state
    GraphicStateSave() {
        if(this.enterSave) {
            return false;
        }
        this.enterSave = true;
        this.device_context.GraphicStateSave();
        return true;
    }
    GraphicStateRestore() {
        if(!this.enterSave) {
            return false;
        }
        this.enterSave = false;
        this.device_context.GraphicStateRestore();
        return true;
    }
    CreateDefaultVertexBuffer(byteSize, data, gpuWriteable = false) {
       return CreateDefaultVertexBuffer(this.render_device, byteSize, data, gpuWriteable);
    }
    CreateStaticVertexBuffer(byteSize, data) {
        return CreateStaticVertexBuffer(this.render_device, byteSize, data);
    }
    CreateDynamicVertexBuffer(byteSize, data, gpuWriteable = false) {
        return CreateDynamicVertexBuffer(this.render_device, byteSize, data, gpuWriteable);
    }
    CreateDefaultIndexBuffer(byteSize, data, gpuWriteable = false) {
        return CreateDefaultIndexBuffer(this.render_device, byteSize, data, gpuWriteable);
    }
    CreateStaticIndexBuffer(byteSize, data) {
        return CreateStaticIndexBuffer(this.render_device, byteSize, data);
    }
    CreateDynamicIndexBuffer(byteSize, data) {
        return CreateDynamicIndexBuffer(this.render_device, byteSize, data);
    }
    CreateUniformBuffer(byteSize, usage = USAGE.USAGE_DEFAULT, bindFlag = BIND_FLAGS.BIND_UNIFORM_BUFFER, cpuAccessFlas = CPU_ACCESS_FLAGS.CPU_ACCESS_NONE) {
        return CreateUniformBuffer(this.render_device, byteSize, usage, bindFlag, cpuAccessFlas);
    }
}

GraphicsDriver.InitAttribs = function(deviceCaps, engineCreationAttribs) {
    engineCreationAttribs.custom_device_caps = deviceCaps;
    switch(deviceCaps.dev_type) {
        case DEVICE_TYPE.DEVICE_TYPE_OPENGLES:
            engineCreationAttribs.custom_device_caps.major_version = 3;
            engineCreationAttribs.custom_device_caps.minor_version = 0;
            break;
        case DEVICE_TYPE.DEVICE_TYPE_WEBGPU:
            break;
        default:
            throw 'unknown device type';
    }

    // deferred context number
    return 0;
}

GraphicsDriver.Create = function(deviceCaps, contextCreationType) {
    const driver = new GraphicsDriver();

    let numDeferredContexts = 0;
    let device = null;
    let deviceContext = null;
    let swapchainDesc = new SwapChainDesc();
    swapchainDesc.color_buffer_format = TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM;

    switch(deviceCaps.dev_type) {
        case DEVICE_TYPE.DEVICE_TYPE_OPENGLES:
        {
            const creationAttribs = new EngineGLAttribs();
            creationAttribs.device_type = deviceCaps.dev_type;
            creationAttribs.context_creation_type = contextCreationType;

            numDeferredContexts = GraphicsDriver.InitAttribs(deviceCaps, creationAttribs);
            if(numDeferredContexts != 0) {
                console.warn('deferred contexts are not supported in OpenGL mode');
                numDeferredContexts = 0;
            }

            // if(contextCreationType == CONTEXT_CREATION_TYPE.ATTACH) {
            //     device = new RenderDeviceGL(creationAttribs);
            //     deviceContext = new DeviceContextGL(device, false);
            //     device.SetImmediateContext(deviceContext);

            //     const swapchain = new SwapchainGL(device, deviceContext, swapchainDesc);

            //     deviceContext.SetSwapChain(swapchain);
            //     const renderPassAttribs = new RenderPassAttribs();
            //     deviceContext.BeginRenderPass(0, null, null, renderPassAttribs);
            //     deviceContext.EndRenderPass();
            // } else {
                device = new RenderDeviceGL(creationAttribs);
                deviceContext = new DeviceContextGL(device, false);
                device.SetImmediateContext(deviceContext);

                swapchainDesc.default_depth_value = device.GetDeviceCaps().reversedz_perspective ? 0 : 1;

                const swapchain = new SwapchainGL(device, deviceContext, swapchainDesc); 

                deviceContext.SetSwapChain(swapchain);
                const renderPassAttribs = new RenderPassAttribs();
                deviceContext.BeginRenderPass(0, null, null, renderPassAttribs);
                deviceContext.EndRenderPass();
            // }
        }
        break;
        case DEVICE_TYPE.DEVICE_TYPE_WEBGPU:
            break;
        default:
            throw 'unknown device type';
    }
    driver.render_device = device;
    driver.device_context = deviceContext;

    return driver;
}

export {
    GraphicsDriver,
}
