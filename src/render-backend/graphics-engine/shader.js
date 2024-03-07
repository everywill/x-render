import { ShaderReflection } from "../graphics/program-desc";
// import { ShaderVariableDesc, StaticSamplerDesc } from "../graphics/shader-desc";

class ShaderVariable {
    constructor() {}

    // set the variable to the given value
    Set(object) { throw 'implementation needed'; }

    // set the variable array
    SetArray(objectArray, firstElement, numElements) { throw 'implementation needed'; }
    // used in OpenGLES 2.0
    // others should use uniform buffer object 
    SetFloatArray(floatArray, count) { throw 'implementation needed'; }

    SetIntArray(intArray, count) { throw 'implementation needed'; }

    SetUintArray(uintArray, count) { throw 'implementation needed'; }
}

function GetShaderVariableType(defaultVariableType, variableDescs, numVars, compFunc) {
    for(let i=0; i<numVars; i++) {
        const currVarDesc = variableDescs[i];
        // user's config first
        if(compFunc(currVarDesc.name)) {
            return currVarDesc.type;
        }
        return defaultVariableType;
    }
}

function GetShaderVariableTypeByName(name, defaultVariableType, variableDescs, numVars) {
    return GetShaderVariableType(defaultVariableType, variableDescs, numVars, function(name) {return name == name});
}

class Shader {
    constructor(renderDevice, shaderDesc) {
        this.render_device = renderDevice;
        this.desc = shaderDesc;
        // this.name = '';
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
    GetShaderVariableTypeByName,
}
