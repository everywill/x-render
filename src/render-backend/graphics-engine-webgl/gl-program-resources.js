import { UNIFORM_TYPE } from "../graphics/graphics-types";
import { gl } from "./gl";

class GLProgramVariable {
    constructor(name, size, varType) {
        this.name = name;
        this.resources = [];
        // scale_uniform store data in uint8array
        this.scale_uniform = null;
        this.array_size = size;
        this.var_type = varType;
    }
}

class UniformBufferInfo extends GLProgramVariable {
    constructor(name, size, varType, index) {
        super(name, size, varType);
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

class ImageInfo extends GLProgramVariable {
    constructor(name, size, varType, binding, dataType) {
        super(name, size, varType);
        this.binding = binding;
        this.type = dataType;
    }
}

class GlobalScaleUniform {
    constructor() {
        this.uniform_location = 0;
        this.scale_size = 0;
        this.data_type = UNIFORM_TYPE.BOOL;
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
        this.scale_uniform = new Uint8Array(typeSize);
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
    }

    GetUniformBlocks() { return this.uniform_blocks; }
    GetSamplers() { return this.samplers; }
    GetScaleUniforms() { return this.scale_uniform_info; }

    LoadUniforms(renderDevice, glProgram, defaultVariableType, variableDescs, staticSamples) {}

    GetShaderVariable(name) {}
}

export {
    GLProgramResources,
}