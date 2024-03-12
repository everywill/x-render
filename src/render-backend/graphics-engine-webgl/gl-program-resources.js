import { GetShaderVariableTypeByName, ShaderVariable } from "../graphics-engine/shader";
import { UNIFORM_TYPE } from "../graphics/graphics-types";
import { CBufferReflection, ElementReflection, ShaderReflection } from "../graphics/program-desc";
import { SHADER_RESOURCE_VARIABLE_TYPE } from "../graphics/shader-desc";
import { gl } from "./gl";

class GLProgramVariable {
    constructor(name, size, varType) {
        this.name = name;
        // array of device object
        this.resources = [];
        // scale_uniform store data in ArrayBuffer
        this.scale_uniform = null;
        this.array_size = size;
        this.var_type = varType;
    }
}

class UniformBufferInfo extends GLProgramVariable {
    constructor(name, size, varType, index) {
        super(name, size, varType);
        // block index
        this.index = index;
    }
}

// class StorageBlockInfo extends GLProgramVariable {
//     constructor(name, size, varType, binding) {
//         super(name, size, varType);
//         this.binding = binding;
//     }
// }

class SamplerInfo extends GLProgramVariable {
    constructor(name, size, varType, location, type, staticSampler) {
        super(name, size, varType);
        this.location = location;
        this.type = type;
        this.static_sampler = staticSampler;
    }
}

// class ImageInfo extends GLProgramVariable {
//     constructor(name, size, varType, binding, dataType) {
//         super(name, size, varType);
//         this.binding = binding;
//         this.type = dataType;
//     }
// }

class GlobalScaleUniform {
    constructor(location, size, dataType) {
        this.uniform_location = location;
        this.scale_size = size;
        this.data_type = dataType;
    }
}

function GetUniformType(glDataType) {
    switch(glDataType) {
        case gl.FLOAT:
            return UNIFORM_TYPE.FLOAT;
        case gl.FLOAT_VEC2:
            return UNIFORM_TYPE.FLOAT2;
        case gl.FLOAT_VEC3:
            return UNIFORM_TYPE.FLOAT3;
        case gl.FLOAT_VEC4:
            return UNIFORM_TYPE.FLOAT4;
        case gl.FLOAT_MAT2:
            return UNIFORM_TYPE.MAT2X2;
        case gl.FLOAT_MAT3:
            return UNIFORM_TYPE.MAT3X3;
        case gl.FLOAT_MAT4:
            return UNIFORM_TYPE.MAT4X4;
        case gl.FLOAT_MAT2x3:
            return UNIFORM_TYPE.MAT2X3;
        case gl.FLOAT_MAT2x4:
            return UNIFORM_TYPE.MAT2X3;
        case gl.FLOAT_MAT3x2:
            return UNIFORM_TYPE.MAT3X2;
        case gl.FLOAT_MAT3x4:
            return UNIFORM_TYPE.MAT3X4;
        case gl.FLOAT_MAT4x2:
            return UNIFORM_TYPE.MAT4X2;
        case gl.FLOAT_MAT4x3:
            return UNIFORM_TYPE.MAT4X3;
        case gl.INT:
            return UNIFORM_TYPE.INT;
        case gl.INT_VEC2:
            return UNIFORM_TYPE.INT2;
        case gl.INT_VEC3:
            return UNIFORM_TYPE.INT3;
        case gl.INT_VEC4:
            return UNIFORM_TYPE.INT4;
        case gl.UNSIGNED_INT:
            return UNIFORM_TYPE.UINT;
        case gl.UNSIGNED_INT_VEC2:
            return UNIFORM_TYPE.UINT2;
        case gl.UNSIGNED_INT_VEC3:
            return UNIFORM_TYPE.UINT3;
        case gl.UNSIGNED_INT_VEC4:
            return UNIFORM_TYPE.UINT4;
        default:
        {
            console.warn('cannot recognize scale uniform type, return float as defualt');
            return UNIFORM_TYPE.FLOAT;
        }
    }
}

class ScaleUniformInfo extends GLProgramVariable {
    constructor(name, size, varType, uniformLocation, scaleSize, dataType) {
        super(name, size, varType);
        this.uniform_location = uniformLocation;
        this.scale_size = scaleSize;
        this.data_type = dataType;

        let typeSize = 0;
        const bytesInFloat = 4;
        const bytesInInt32 = 4;
        switch(this.data_type) {
            case UNIFORM_TYPE.FLOAT:
                typeSize = bytesInFloat * 1;
                break;
            case UNIFORM_TYPE.FLOAT2:
                typeSize = bytesInFloat * 2;
                break;
            case UNIFORM_TYPE.FLOAT3:
                typeSize = bytesInFloat * 3;
                break;
            case UNIFORM_TYPE.FLOAT4:
                typeSize = bytesInFloat * 4;
                break;
            case UNIFORM_TYPE.MAT2X2:
                typeSize = bytesInFloat * 4;
                break;
            case UNIFORM_TYPE.MAT3X3:
                typeSize = bytesInFloat * 9;
                break;
            case UNIFORM_TYPE.MAT4X4:
                typeSize = bytesInFloat * 16;
                break;
            case UNIFORM_TYPE.MAT2X3:
            case UNIFORM_TYPE.MAT3X2:
                typeSize = bytesInFloat * 6;
                break;
            case UNIFORM_TYPE.MAT2X4:
            case UNIFORM_TYPE.MAT4X2:
                typeSize = bytesInFloat * 8;
                break;
            case UNIFORM_TYPE.MAT3X4:
            case UNIFORM_TYPE.MAT4X3:
                typeSize = bytesInFloat * 12;
                break;
            case UNIFORM_TYPE.INT:
                typeSize = bytesInInt32 * 1;
                break;
            case UNIFORM_TYPE.INT2:
                typeSize = bytesInInt32 * 2;
                break;
            case UNIFORM_TYPE.INT3:
                typeSize = bytesInInt32 * 3;
                break;
            case UNIFORM_TYPE.INT4:
                typeSize = bytesInInt32 * 4;
                break;
            case UNIFORM_TYPE.UINT:
                typeSize = bytesInInt32 * 1;
                break;
            case UNIFORM_TYPE.UINT2:
                typeSize = bytesInInt32 * 2;
                break;
            case UNIFORM_TYPE.UINT3:
                typeSize = bytesInInt32 * 3;
                break;
            case UNIFORM_TYPE.UINT4:
                typeSize = bytesInInt32 * 4;
                break;
            default:
                typeSize = 0;
                break;
        }
        this.scale_uniform = new ArrayBuffer(typeSize);
    }
}

class GLShaderVariable extends ShaderVariable {
    constructor(programVar) {
        super();
        this.program_var = programVar;
    }

    Set(object) {
        this.program_var.resources[0] = object;
    }

    SetArray(objectArray, firstElement, numElements) {
        for(let i=0; i<numElements; i++) {
            this.program_var[firstElement+i] = objectArray[i];
        }
    }

    SetFloatArray(floatArray/* Float32Array */, count) {
        this.program_var.scale_uniform = floatArray.buffer;
    }

    SetIntArray(intArray/* IntArray */, count) {
        this.program_var.scale_uniform = intArray.buffer;
    }

    SetUintArray(uintArray/* IntArray */, count) {
        this.program_var.scale_uniform = uintArray.buffer;
    }
}


class GLProgramResources {
    constructor() {
        // array of UniformBufferInfo
        this.uniform_blocks = [];
        // array of SamplerInfo
        this.samplers = [];
        // array of ScaleUniformInfo
        this.scale_uniform_info = [];

        this.variable_map = new Map();
    }

    GetUniformBlocks() { return this.uniform_blocks; }
    GetSamplers() { return this.samplers; }
    GetScaleUniforms() { return this.scale_uniform_info; }

    LoadUniforms(renderDevice, glProgram, defaultVariableType, variableDescs, staticSamplers) {
        let result = new ShaderReflection();
        if(glProgram = null) {
            throw 'GL program is null';
        }
        let numActiveUniforms = 0;
        numActiveUniforms = gl.getProgramParameter(glProgram, gl.ACTIVE_UNIFORMS);

        let numActiveUniformBlocks = 0;
        numActiveUniformBlocks = gl.getProgramParameter(glProgram, gl.ACTIVE_UNIFORM_BLOCKS);

        const globalScaleUniform = new Map();

        for(let i=0; i<numActiveUniforms; i++) {
            const info = gl.getActiveUniform(glProgram, i);
            const dataType = info.type;
            const size = info.size;
            const name = info.name;

            if(dataType == gl.SAMPLER_2D || dataType == gl.SAMPLER_CUBE) {
                result.texture2D_ref.push(name);
            }

            switch(dataType) {
                case gl.FLOAT:
                case gl.FLOAT_VEC2:
                case gl.FLOAT_VEC3:
                case gl.FLOAT_VEC4:
                case gl.FLOAT_MAT2:
                case gl.FLOAT_MAT3:
                case gl.FLOAT_MAT4:
                case gl.FLOAT_MAT2x3:
                case gl.FLOAT_MAT2x4:
                case gl.FLOAT_MAT3x2:
                case gl.FLOAT_MAT3x4:
                case gl.FLOAT_MAT4x2:
                case gl.FLOAT_MAT4x3:

                case gl.INT:
                case gl.INT_VEC2:
                case gl.INT_VEC3:
                case gl.INT_VEC4:
                case gl.UNSIGNED_INT:
                case gl.UNSIGNED_INT_VEC2:
                case gl.UNSIGNED_INT_VEC3:
                case gl.UNSIGNED_INT_VEC4:
                {
                    const uniformLocation = gl.getUniformLocation(glProgram, name);
                    globalScaleUniform.set(name, new GlobalScaleUniform(uniformLocation, size, GetUniformType(dataType)));
                    break;
                }
                case gl.BOOL:
                case gl.BOOL_VEC2:
                case gl.BOOL_VEC3:
                case gl.BOOL_VEC4:
                {
                    console.error('OpenGL shader cannot use bool uniform value, please use float instead');
                }
                case gl.SAMPLER_2D:
                case gl.SAMPLER_3D:
                case gl.SAMPLER_CUBE:
                case gl.SAMPLER_2D_SHADOW:
                
                case gl.SAMPLER_2D_ARRAY:
                case gl.SAMPLER_2D_ARRAY_SHADOW:
                case gl.SAMPLER_CUBE_SHADOW:
                
                case gl.INT_SAMPLER_2D:
                case gl.INT_SAMPLER_3D:
                case gl.INT_SAMPLER_CUBE:
                case gl.INT_SAMPLER_2D_ARRAY:
                case gl.UNSIGNED_INT_SAMPLER_2D:
                case gl.UNSIGNED_INT_SAMPLER_3D:
                case gl.UNSIGNED_INT_SAMPLER_CUBE:
                case gl.UNSIGNED_INT_SAMPLER_2D_ARRAY:
                {
                    const uniformLocation = gl.getUniformLocation(glProgram, name);
                    const varType = GetShaderVariableTypeByName(name, SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_DYNAMIC, variableDescs, variableDescs.length);

                    let staticSampler = null;
                    for(let i=0; i<staticSamplers.length; i++) {
                        if(name == staticSamplers[i].sampler_name) {
                            staticSampler = renderDevice.CreateSampler(staticSamplers[i].desc);
                            break;
                        }
                    }
                    this.samplers.push(new SamplerInfo(name, size, varType, uniformLocation, dataType, staticSampler));
                    break;
                }
                default:
                    // some other uniform type like scaler, matrix etc
                    break;
            }
        }

        for(let i=0; i<numActiveUniformBlocks; i++) {
            const cbReflection = new CBufferReflection();
            result.CBuffer_ref.push(cbReflection);

            const name = gl.getActiveUniformBlockName(glProgram, i);
            const uniformBlockIndex = gl.getUniformBlockIndex(glProgram, name);
            const uboSize = gl.getActiveUniformBlockParameter(glProgram, uniformBlockIndex, gl.UNIFORM_BLOCK_DATA_SIZE);

            cbReflection.CBuffer_size = uboSize;
            cbReflection.CBuffer_name = name;

            const arraySize = 1;
            const varType = GetShaderVariableTypeByName(name, defaultVariableType, variableDescs, variableDescs.length);
            this.uniform_blocks.push(new UniformBufferInfo(name, arraySize, varType, uniformBlockIndex));

            // remove scale uniform from uniform buffer
            const uniforms = gl.getActiveUniformBlockParameter(glProgram, uniformBlockIndex, gl.UNIFORM_BLOCK_ACTIVE_UNIFORMS);
            const uniformIndices = gl.getActiveUniformBlockParameter(glProgram, uniformBlockIndex, gl.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES);

            const uniformOffsets = gl.getActiveUniforms(glProgram, uniformIndices, gl.UNIFORM_OFFSET);

            for(let j=0; j<uniforms; j++) {
                const info = gl.getActiveUniform(glProgram, i);
                const name = info.name;

                globalScaleUniform.delete(name);
                cbReflection.elements.push(new ElementReflection(name, uniformOffsets[i]));
            }
        }

        for(let [key, value] of globalScaleUniform) {
            this.scale_uniform_info.push(new ScaleUniformInfo(key/* name */, 0, 
                                                            SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_DYNAMIC, 
                                                            value.uniform_location, 
                                                            value.scale_size, 
                                                            value.data_type));
        }

        return result;
    }

    Clone(srcResources, varTypes) {
        for(let info of srcResources.uniform_blocks) {
            if(varTypes.indexOf(info.var_type) != -1) {
                this.uniform_blocks.push(new UniformBufferInfo(info.name, info.array_size, info.var_type, info.index));
            }
        }

        for(let info of srcResources.samplers) {
            if(varTypes.indexOf(info.var_type) != -1) {
                this.samplers.push(new SamplerInfo(info.name, info.array_size, info.var_type, info.location, info.type, info.static_sampler));
            }
        }

        for(let info of srcResources.scale_uniform_info) {
            if(varTypes.indexOf(info.var_type) != -1) {
                this.scale_uniform_info.puush(new ScaleUniformInfo(info.name, info.array_size, info.var_type, info.uniform_location, info.scale_size, info.data_type));
            }
        }

        InitVariables();
    }

    InitVariables() {
        // after all program resources are loaded, we can populate shader variable map
        for(let info of srcResources.uniform_blocks) {
            this.variable_map.set(info.name, new GLShaderVariable(info));
        }

        for(let info of srcResources.samplers) {
            this.variable_map.set(info.name, new GLShaderVariable(info));
        }

        for(let info of srcResources.scale_uniform_info) {
            this.variable_map.set(info.name, new GLShaderVariable(info));
        }
    }

    GetShaderVariable(name) {
        if(this.variable_map.has(name)) {
            return this.variable_map.get(name);
        }
        return null;
    }
}

export {
    GLProgramResources,
}