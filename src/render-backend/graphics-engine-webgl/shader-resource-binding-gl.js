import { DummyShaderVariable } from "../graphics-engine/shader";
import { ShaderResourceBinding } from "../graphics-engine/shader-reource-binding";
import { SHADER_RESOURCE_VARIABLE_TYPE } from "../graphics/shader-desc";
import { GLProgramResources } from "./gl-program-resources";

class ShaderResourceBindingGL extends ShaderResourceBinding {
    constructor(pipelineState) {
        super(pipelineState);
        this.dynamic_program_resources = new GLProgramResources();
        const varTypes = [
            SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_DYNAMIC,
            SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_MUTABLE
        ];

        this.dynamic_program_resources.Clone(this.pipelinestate.GetProgram().GetGLProgram().GetAllResources(), varTypes);
    }

    Release() {}

    GetProgramResources(shaderType, pipelineState) {
        return this.dynamic_program_resources;
    }

    GetVariable(shaderType, name) {
        const shaderVariable = this.dynamic_program_resources.GetShaderVariable(name);
        if(!shaderVariable) {
            return new DummyShaderVariable();
        }
        return shaderVariable;
    }
}

export {
    ShaderResourceBindingGL,
}
