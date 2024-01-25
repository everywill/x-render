import { ShaderReflection } from "../graphics/program-desc";
import { ShaderVariableDesc, StaticSamplerDesc } from "../graphics/shader-desc";

class ShaderVariable {
    constructor() {}

    Set(object) { throw 'implementation needed'; }
    SetArray(objectArray, firstElement, numElements) { throw 'implementation needed'; }
    // used in OpenGLES 2.0
    // others should use uniform buffer object 
    // SetFloatArray(array, count) {}
    // SetIntArray(array, count) {}
    // SetUintArray(array, count) {}
}

class Shader {
    constructor(renderDevice, shaderDesc) {
        this.desc = shaderDesc;
        this.name = '';
        this.variables_desc = [];
        for(let i=0; i<this.desc.variable_desc.length; i++) {
            this.variables_desc.push(this.desc.variable_desc[i]);
            if(!this.variables_desc[i].name) {
                throw 'variable name not provided';
            }
        }
        this.static_samplers_desc = [];
        for(let i=0; i<this.desc.static_sampler_desc.length; i++) {
            this.static_samplers_desc.push(this.desc.static_sampler_desc[i]);
            if(this.static_samplers_desc[i].sampler_name) {
                throw 'sampler name nnot provided';
            }
        }
        this.shader_reflection = new ShaderReflection();
    }
    GetDesc() { return this.desc; }

    GetShaderReflection() { return this.shader_reflection; }

    GetShaderVariable(name) { throw 'need implement'; }
}

export {
    Shader,
    ShaderVariable,
}
