import { Shader } from "../graphics-engine/shader";
import { GPUShaderReflect } from "../graphics-shader/shader-utils";
import { SHADER_RESOURCE_VARIABLE_TYPE } from "../graphics/shader-desc";
import { ShaderResourcesGPU } from "./shader-resources-gpu";

class ShaderGPU extends Shader {
    constructor(renderDevice, shaderCreationAttribs) {
        super(renderDevice, shaderCreationAttribs.shader_desc);

        this.shader_resource = new ShaderResourcesGPU();
        this.const_resources = new ShaderResourcesGPU();

        const { source, entry } = shaderCreationAttribs;
        const gpuDevice = this.render_device.GetWebGPUDevice();
        this.gpu_shader_module = gpuDevice.createShaderModule({
            code: source,
            // different implementations may be handle this in different ways
            // providing hints does not guarantee improved shader compilation performance on all browsers/systems.
            compilationHints: [{
                entryPoint: entry,
                // layout: GPUPipelineLayout | 'auto'
            }],
        });

        this.InitResources(source);
    }

    GetNativeHandle() { return this.gpu_shader_module; }
    GetAllResources() { return this.shader_resource; }
    GetConstantResources() { return this.const_resources; }

    Release() {
        this.gpu_shader_module = null;
    }

    InitResources(shaderSource) {
        const info  = GPUShaderReflect(shaderSource);
        let defaultVarType = SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_STATIC;

        const shaderDesc = this.desc;
        const mergedVarTypesArray = [];
        const mergedStaticSamplersArray = [];
        defaultVarType = shaderDesc.default_variable_type;

        if(defaultVarType != shaderDesc.default_variable_type) {
            console.error('inconsistent default variable types for shaders in one program');
        }
        for(let v=0; v<shaderDesc.variable_desc.length; v++) {
            mergedVarTypesArray.push(shaderDesc.variable_desc[v]);
        }
        for(let s=0; s<shaderDesc.static_sampler_desc.length; s++) {
            mergedStaticSamplersArray.push(shaderDesc.static_sampler_desc[s]);
        }

        this.shader_reflection = this.shader_resource.Load(info, defaultVarType, mergedVarTypesArray, mergedStaticSamplersArray);

        const filterVarTypes = [SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_STATIC];
        this.const_resources.Clone(this.all_resources, filterVarTypes);
    }
}

export {
    ShaderGPU,
}
