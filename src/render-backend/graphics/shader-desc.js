import { SHADER_TYPE } from "./graphics-types";
import { SamplerDesc } from './sampler-desc';

const SHADER_RESOURCE_VARIABLE_TYPE = {
    // shader resource bound to the variable is the same(or constant) for all shader instances。
    // it must be set once directly through Shader::BindResources or through the shader variable
    SHADER_RESOURCE_VARIABLE_TYPE_STATIC: 0,
    // shader resource bound to the variable is the same(or constant) for all shader resource binding instances.
    // it must be set once through ShaderResourceBinding::BindResources or through the shader variable
    SHADER_RESOURCE_VARIABLE_TYPE_MUTABLE: 1,
    // shader variable binding is dynamic
    // it can be set multiple times for every instance of shader resource binding
    SHADER_RESOURCE_VARIABLE_TYPE_DYNAMIC: 2,
    SHADER_RESOURCE_VARIABLE_TYPE_NUM_TYPES: 3,
};

class ShaderVariableDesc {
    constructor() {
        this.name = '';
        this.type = SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_STATIC;
    }
}

class StaticSamplerDesc {
    constructor() {
        this.sampler_name = '';
        this.desc = new SamplerDesc();
    }
}

class ShaderDesc {
    constructor() {
        this.shader_type = SHADER_TYPE.SHADER_TYPE_UNKNOWN;
        this.default_variable_type = SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_DYNAMIC;
        // array of ShaderVariableDesc
        this.variable_desc = [];
        // array of StaticSamplerDesc
        this.static_sampler_desc = [];
    }
}

class ShaderCreationAttribs {
    constructor() {
        this.source = '';
        this.shader_desc = new ShaderDesc();
    }
}

export {
    ShaderDesc,
    ShaderVariableDesc,
    StaticSamplerDesc,
    ShaderCreationAttribs,
}
