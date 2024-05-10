import { SHADER_RESOURCE_VARIABLE_TYPE } from "../graphics/shader-desc";
import { gl } from "./gl";
import { GLProgramResources } from "./gl-program-resources";

class GLProgram {
    constructor() {
        this.all_resources = new GLProgramResources();
        this.const_resources = new GLProgramResources();
        this.shader_reflection = null;
        this.native_handle = gl.createProgram();
        this.valid = true;
    }

    GetAllResources() { return this.all_resources; }
    GetConstantResources() { return this.const_resources; }
    GetShaderReflection() { return this.shader_reflection; }

    InitResources(renderDevice, defaultVarType, variableDescs, staticSamplers) {
        const glProgram = this.native_handle;
        this.shader_reflection = this.all_resources.LoadUniforms(renderDevice, glProgram, defaultVarType, variableDescs, staticSamplers);

        const filterVarTypes = [SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_STATIC];
        this.const_resources.Clone(this.all_resources, filterVarTypes);
    }

    Release() {
        if(this.valid) {
            gl.deleteProgram(this.native_handle);
            this.valid = false;
        }
    }
}

export {
    GLProgram,
}
