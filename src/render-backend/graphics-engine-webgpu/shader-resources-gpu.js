import { GetShaderVariableTypeByName } from "../graphics-engine/shader";
import { GPUShaderReflect } from "../graphics-shader/shader-utils";

class ShaderResourceAttrib {
    constructor(info, varType, resourceType) {
        this.name = info.name;
        this.access = info.access;
        this.binding = info.binding;
        this.group = info.group;
        // this.binding = binding;
        this.var_type = varType;
        this.resource_type = resourceType;
        // this.resource = null;
    }
}

const RESOURCE_TYPE = {
    RESOURCE_TYPE_UNIFORM_BUFFER: 0,
    RESOURCE_TYPE_STORAGE_BUFFER: 1,
    RESOURCE_TYPE_SAMPLED_IMAGE: 2,
    RESOURCE_TYPE_SAMPLER: 3,
    RESOURCE_TYPE_STORAGE_IMAGE: 4,
    NUM_RESOURCE_TYPE: 5,
};

class BufferInfo extends GPUResource {
    constructor(name, info, varType) {
        super(name, info, varType);
        // this.type = type; 'read-only-storage' / 'storage' / default: 'uniform'
    }
}

class SamplerInfo extends GPUResource {
    constructor(name, info, varType, type) {
        super(name, info, varType);
        // this.type = type; 'comparison' / default: 'filtering' / 'non-filtering'
    }
}

class StorageTextureInfo extends GPUResource {
    constructor(name, info, varType, access, format, viewDimension) {
        super(name, info, varType);
        // this.access = access;  'write-only' / undefinded (with the intention to add more mode)
        // this.format = format;
        // this.view_dimension = viewDimension;
    }
}

class TextureInfo extends GPUResource {
    constructor(name, info, varType, multisampled, sampleType) {
        super(name, info, varType);
        // this.multisampled = multisampled;
        // this.sample_type = sampleType; 'depth' / default: 'float' / 'sint' / 'uint' / 'unfilterable-float'
    }
}

function IsAllowedType(varType, allowedTypeBits) {
    return ((1 << varType) & allowedTypeBits) != 0;
}

function GetAllowedTypeBits(allowedVarTypes, numAllowedTypes) {
    if (!allowedVarTypes) {
        return 0xFFFFFFFF;
    }
    let allowedTypeBits = 0;
    for (let i = 0; i < numAllowedTypes; ++i) {
        allowedTypeBits |= 1 << allowedVarTypes[i];
    }
        
    return allowedTypeBits;
}

class ShaderResourcesGPU {
    constructor(shaderSource, shaderDesc) {
        this.attribs = [];
        this.num_uniform_buffer = 0;
        this.num_storage_buffer = 0;
        this.num_storage_image = 0;
        this.num_sampled_image = 0;
        this.num_sampler = 0;

        this.shader_type = shaderDesc.shader_type;
        const resources = GPUShaderReflect(shaderSource);

        const { uniforms, samplers, storage, textures } = resources;

        // const mergedStaticSamplersArray = [];
        // const defaultVarType = shaderDesc.default_variable_type;

        // if(defaultVarType != shaderDesc.default_variable_type) {
        //     console.error('inconsistent default variable types for shaders in one program');
        // }
        
        // for(let s=0; s<shaderDesc.static_sampler_desc.length; s++) {
        //     mergedStaticSamplersArray.push(shaderDesc.static_sampler_desc[s]);
        // }

        const uniform_buffers = [];
        const storage_buffers = [];
        const storage_images = [];
        const sampled_images = [];
        const image_samplers = [];

        const ProcessResource = (info, varType) => {
            switch(info.resourceType) {
                case RESOURCE_TYPE.RESOURCE_TYPE_UNIFORM_BUFFER:
                    uniform_buffers.push(new ShaderResourceAttrib(info, varType, RESOURCE_TYPE.RESOURCE_TYPE_UNIFORM_BUFFER));
                    this.num_uniform_buffer++;
                    break;
                case RESOURCE_TYPE.RESOURCE_TYPE_STORAGE_BUFFER:
                    storage_buffers.push(new ShaderResourceAttrib(info, varType, RESOURCE_TYPE.RESOURCE_TYPE_STORAGE_BUFFER));
                    this.num_storage_buffer++;
                    break;
                case RESOURCE_TYPE.RESOURCE_TYPE_SAMPLED_IMAGE:
                    sampled_images.push(new ShaderResourceAttrib(info, varType, RESOURCE_TYPE.RESOURCE_TYPE_SAMPLED_IMAGE));
                    this.num_sampled_image++;
                    break;
                case RESOURCE_TYPE.RESOURCE_TYPE_SAMPLER:
                    image_samplers.push(new ShaderResourceAttrib(info, varType, RESOURCE_TYPE.RESOURCE_TYPE_SAMPLER));
                    this.num_sampler++;
                    break;
                case RESOURCE_TYPE.RESOURCE_TYPE_STORAGE_IMAGE:
                    storage_images.push(new ShaderResourceAttrib(info, varType, RESOURCE_TYPE.RESOURCE_TYPE_STORAGE_IMAGE));
                    this.num_storage_image++;
                    break;
                default:
                    throw 'resource type not supported';
            }
        };

        for(let i=0; i<uniforms.length; i++) {
            const info = uniforms[i];
            const varType = GetShaderVariableTypeByName(info.name, defaultVarType, shaderDesc.variable_desc, shaderDesc.variable_desc.length);
            // todo: retrive type info from BufferDesc
            ProcessResource(info, varType);
        }

        for(let i=0; i<storage.length; i++) {
            const info = storage[i];
            const varType = GetShaderVariableTypeByName(info.name, defaultVarType, shaderDesc.variable_desc, shaderDesc.variable_desc.length);

            ProcessResource(info, varType);
        }

        for(let i=0; i<textures.length; i++) {
            const info = textures[i];
            const varType = GetShaderVariableTypeByName(info.name, defaultVarType, shaderDesc.variable_desc, shaderDesc.variable_desc.length);

            ProcessResource(info, varType);
        }

        for(let i=0; i<samplers.length; i++) {
            const info = samplers[i];
            const varType = GetShaderVariableTypeByName(info.name, defaultVarType, shaderDesc.variable_desc, shaderDesc.variable_desc.length);
            // todo: retrive type info from SamplerDesc
            ProcessResource(info, varType);
        }

        this.attribs = [...uniform_buffers, ...storage_buffers, ...storage_images, ...sampled_images, ...image_samplers];

        this.storage_buffer_offset = this.GetNumUniformBuffer();
        this.storage_image_offset = this.storage_buffer_offset + this.GetNumStorageBuffer();
        this.sampled_image_offset = this.storage_image_offset + this.GetNumStorageImage();
        this.sampler_offset = this.sampled_image_offset + this.GetNumSampledImage();
    }

    GetShaderType() { return this.shader_type; }

    GetNumUniformBuffer() { return this.num_uniform_buffer; }
    GetNumStorageBuffer() { return this.num_storage_buffer; }
    GetNumStorageImage() { return this.num_storage_image; }
    GetNumSampledImage() { return this.num_sampled_image; }
    GetNumSampler() { return this.num_sampler; }
    GetNumTotalRes() { return this.sampler_offset + this.GetNumSampler(); }

    GetResAttrib(n, numResources, offset) {
        if(n>=numResources || offset + n >= this.attribs.length) {
            throw `resource index ${n} is out of range, resouce array size: ${numResources}`;
        }
        return this.attribs[offset + n];
    }

    GetUniformBuffer(n) { return this.GetResAttrib(n, this.GetNumUniformBuffer(), 0); }
    GetStorageBuffer(n) { return this.GetResAttrib(n, this.GetNumStorageBuffer(), this.storage_buffer_offset); }
    GetStorageImage(n) { return this.GetResAttrib(n, this.GetNumStorageImage(), this.storage_image_offset); }
    GetSampledImage(n) { return this.GetResAttrib(n, this.GetNumSampledImage(), this.sampled_image_offset); }
    GetSampler(n) { return this.GetResAttrib(n, this.GetNumSampler(), this.sampler_offset); }
    GetResource(n) { return this.GetResAttrib(n, this.GetNumTotalRes(), 0); }

    ProcessResources(allowedVarTypes, numAllowedTypes, handler) {
        const allowedTypeBits = GetAllowedTypeBits(allowedVarTypes, numAllowedTypes);

        for(let i=0; i<this.GetNumTotalRes(); i++) {
            const res = this.GetResource(i);
            if(IsAllowedType(res.var_type, allowedTypeBits)) {
                handler(res, i);
            }
        }
    }

    // Load(reflection, defaultVariableType, variableDescs, staticSamplers) {
    //     let result = new ShaderReflection();
    //     const { uniforms, samplers, storage, textures } = reflection;

    //     return result;
    // }

    // Clone(srcResources, varTypes) {
    //     for(let info of srcResources.buffer_blocks) {
    //         if(varTypes.indexOf(info.var_type) != -1) {
    //             this.buffer_blocks.push(new BufferInfo(info.name, info.group, info.binding, info.var_type));
    //         }
    //     }

    //     for(let info of srcResources.samplers) {
    //         if(varTypes.indexOf(info.var_type) != -1) {
    //             this.samplers.push(new SamplerInfo(info.name, info.group, info.binding, info.var_type));
    //         }
    //     }

    //     for(let info of srcResources.storage_textures) {
    //         if(varTypes.indexOf(info.var_type) != -1) {
    //             this.storage_textures.push(new StorageTextureInfo(info.name, info.group, info.binding, info.var_type));
    //         }
    //     }

    //     for(let info of srcResources.textures) {
    //         if(varTypes.indexOf(info.var_type) != -1) {
    //             this.textures.push(new TextureInfo(info.name, info.group, info.binding, info.var_type));
    //         }
    //     }
    // }

    // InitVariables() {
    //     // after all resources are loaded, we can populate shader variable map
    //     for(let info of this.buffer_blocks) {
    //         this.variable_map.set(info.name, new GPUShaderVariable(info));
    //     }

    //     for(let info of this.samplers) {
    //         this.variable_map.set(info.name, new GPUShaderVariable(info));
    //     }

    //     for(let info of this.storage_textures) {
    //         this.variable_map.set(info.name, new GPUShaderVariable(info));
    //     }

    //     for(let info of this.textures) {
    //         this.variable_map.set(info.name, new GPUShaderVariable(info));
    //     }
    // }
}

// class GPUShaderVariable extends ShaderVariable {
//     constructor(resourceInfo) {
//         super();
//         this.resource_info = resourceInfo;
//     }

//     Set(object) {
//         this.resource_info.resource = object;
//     }
// }

export {
    ShaderResourcesGPU,
    GetAllowedTypeBits,
}
