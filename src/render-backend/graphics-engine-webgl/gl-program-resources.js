import { UNIFORM_TYPE } from "../graphics/graphics-types";
import { gl } from "./gl";

class GLProgramVariable {
    constructor(name, size, varType) {
        this.name = name;
        this.resources = [];
        this.scale_uniforms = [];
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

class SamplerInfo extends GLProgramVariable {
    constructor(name, size, varType, location, type, staticSampler) {
        super(name, size, varType);
        this.location = location;
        this.type = type;
        this.static_sampler = staticSampler;
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
    }
}



class GLProgramResources {
    constructor() {}
}

export {
    GLProgramResources,
}