import { GetShaderVariableTypeByName, ShaderVariable } from "../graphics-engine/shader";
import { CBufferReflection, ElementReflection, ShaderReflection } from "../graphics/program-desc";

class GPUResource {
    constructor(name, group, binding, varType) {
        this.name = name;
        this.group = group;
        this.binding = binding;
        this.var_type = varType;
        this.resource = null;
    }
}

class BufferInfo extends GPUResource {
    constructor(name, group, binding, varType) {
        super(name, group, binding, varType);
        // this.type = type; 'read-only-storage' / 'storage' / default: 'uniform'
    }
}

class SamplerInfo extends GPUResource {
    constructor(name, group, binding, varType, type) {
        super(name, group, binding, varType);
        // this.type = type; 'comparison' / default: 'filtering' / 'non-filtering'
    }
}

class StorageTextureInfo extends GPUResource {
    constructor(name, group, binding, varType, access, format, viewDimension) {
        super(name, group, binding, varType);
        // this.access = access;  'write-only' / undefinded (with the intention to add more mode)
        // this.format = format;
        // this.view_dimension = viewDimension;
    }
}

class TextureInfo extends GLProgramVariable {
    constructor(name, group, binding, varType, multisampled, sampleType) {
        super(name, group, binding, varType);
        // this.multisampled = multisampled;
        // this.sample_type = sampleType; 'depth' / default: 'float' / 'sint' / 'uint' / 'unfilterable-float'
    }
}

class ShaderResourcesGPU {
    constructor() {
        this.buffer_blocks = [];
        this.samplers = [];
        this.storage_textures = [];
        this.textures = [];
        this.variable_map = new Map();
    }

    Load(reflection, defaultVariableType, variableDescs, staticSamplers) {
        let result = new ShaderReflection();
        const { uniforms, samplers, storage, textures } = reflection;
        
        for(let i=0; i<uniforms.length; i++) {
            const info = uniforms[i];
            const varType = GetShaderVariableTypeByName(info.name, defaultVariableType, variableDescs, variableDesc.length);
            // todo: retrive type info from BufferDesc
            const bufferInfo = new BufferInfo(info.name, info.group, info.binding, varType);
            this.buffer_blocks.push(bufferInfo);

            const cbReflection = new CBufferReflection();
            result.CBuffer_ref.push(cbReflection);
            cbReflection.CBuffer_name = info.name;
            cbReflection.CBuffer_size = info.type.size;
            for(let member of info.type.members) {
                cbReflection.elements.push(new ElementReflection(member.name, member.offset));
            }
        }
        
        for(let i=0; i<samplers.length; i++) {
            const info = samplers[i];
            const varType = GetShaderVariableTypeByName(info.name, defaultVariableType, variableDescs, variableDesc.length);
            // todo: retrive type info from SamplerDesc
            const samplerInfo = new SamplerInfo(info.name, info.group, info.binding, varType);
            this.samplers.push(samplerInfo);

            result.texture2D_ref.push(info.name);
        }

        // storage txture(image)
        for(let i=0; i<storage.length; i++) {
            const info = storage[i];
            const varType = GetShaderVariableTypeByName(info.name, defaultVariableType, variableDescs, variableDesc.length);
            const storageTextureInfo = new StorageTextureInfo(info.name, info.group, info.binding, varType);
            this.storage_textures.push(storageTextureInfo);
        }

        for(let i=0; i<textures.length; i++) {
            const info = textures[i];
            const varType = GetShaderVariableTypeByName(info.name, defaultVariableType, variableDescs, variableDesc.length);
            const textureInfo = new TextureInfo(info.name, info.group, info.binding, varType);
            this.textures.push(textureInfo);
        }

        return result;
    }

    Clone(srcResources, varTypes) {
        for(let info of srcResources.buffer_blocks) {
            if(varTypes.indexOf(info.var_type) != -1) {
                this.buffer_blocks.push(new BufferInfo(info.name, info.group, info.binding, info.var_type));
            }
        }

        for(let info of srcResources.samplers) {
            if(varTypes.indexOf(info.var_type) != -1) {
                this.samplers.push(new SamplerInfo(info.name, info.group, info.binding, info.var_type));
            }
        }

        for(let info of srcResources.storage_textures) {
            if(varTypes.indexOf(info.var_type) != -1) {
                this.storage_textures.push(new StorageTextureInfo(info.name, info.group, info.binding, info.var_type));
            }
        }

        for(let info of srcResources.textures) {
            if(varTypes.indexOf(info.var_type) != -1) {
                this.textures.push(new TextureInfo(info.name, info.group, info.binding, info.var_type));
            }
        }
    }

    InitVariables() {
        // after all resources are loaded, we can populate shader variable map
        for(let info of this.buffer_blocks) {
            this.variable_map.set(info.name, new GPUShaderVariable(info));
        }

        for(let info of this.samplers) {
            this.variable_map.set(info.name, new GPUShaderVariable(info));
        }

        for(let info of this.storage_textures) {
            this.variable_map.set(info.name, new GPUShaderVariable(info));
        }

        for(let info of this.textures) {
            this.variable_map.set(info.name, new GPUShaderVariable(info));
        }
    }
}

class GPUShaderVariable extends ShaderVariable {
    constructor(resourceInfo) {
        super();
        this.resource_info = resourceInfo;
    }

    Set(object) {
        this.resource_info.resource = object;
    }
}

export {
    ShaderResourcesGPU,
}
