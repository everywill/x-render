import { SHADER_RESOURCE_VARIABLE_TYPE } from "../graphics/shader-desc";
import { GetAllowedTypeBits } from "./shader-resources-gpu";

class ShaderResourceLayoutGPU {
    constructor() {
        this.resources = null;  // ShaderResourcesGPU
        this.num_resources = new Map();
        this.num_resources.set(SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_STATIC, 0);
        this.num_resources.set(SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_MUTABLE, 0);
        this.num_resources.set(SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_DYNAMIC, 0);
    }

    Initialize(srcShaderResources, allowedVarTypes, numAllowedTypes) {
        this.resources = srcShaderResources;

        this.resources.ProcessResources(allowedVarTypes, numAllowedTypes, (resAttribs, index) => {
            this.num_resources.set(resAttribs.resource_type, this.num_resources.get(resAttribs.resource_type) + 1);
        });
    }
}

ShaderResourceLayoutGPU.Initialize = function(numShaders, layouts, shaderResources, pipelineLayout) {
    const allowedVarTypes = null;
    const numAllowedTypes = 0;
    const allowedTypeBits = GetAllowedTypeBits(allowedVarTypes, numAllowedTypes);

    for(let i=0; i<numShaders; i++) {
        layouts[i].Initialize(shaderResources[i], allowedTypeBits, numAllowedTypes);
    }

    const AddResource = (shaderIndex, resourceLayout, shaderResources, shaderResourceAttrib) => {

    };

    // first process uniform buffers for all shader stages to make sure all UBs go first in every descriptor set
    for(let i=0; i<numShaders; i++) {
        const layout = layouts[i];
        const resources = layout.resources;
        for(let j=0; j<resources.GetNumUniformBuffer(); j++) {
            const uniformBuffer = resources.GetUniformBuffer(j);
            if(IsAllowedType(uniformBuffer.var_type, allowedTypeBits)) {
                AddResource(i, layout, resources, uniformBuffer);
            }
        }
    }

    // second, process all storage buffers
    for(let i=0; i<numShaders; i++) {
        const layout = layouts[i];
        const resources = layout.resources;
        for(let j=0; j<resources.GetNumStorageBuffer(); j++) {
            const storageBuffer = resources.GetStorageBuffer(j);
            if(IsAllowedType(storageBuffer.var_type, allowedTypeBits)) {
                AddResource(i, layout, resources, storageBuffer);
            }
        }
    }

    // finally, process all other resource types
}

export {
    ShaderResourceLayoutGPU,
}
