import { ShaderResourceBinding } from "../graphics-engine/shader-reource-binding";
import { ShaderResourcesGPU } from "./shader-resources-gpu";

class ShaderResourceBindingGPU extends ShaderResourceBinding {
    constructor(pipelineState) {
        super(pipelineState);
        this.dynamic_resources = new ShaderResourcesGPU();
        const varTypes = [
            SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_DYNAMIC,
            SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_MUTABLE
        ];

        const program = this.pipelinestate.GetProgram();

        for(let i=0; i<program.GetNumShaders(); i++) {
            this.dynamic_resources.Clone(this.pipelinestate.GetShader(i).GetAllResources(), varTypes);
        }

        this.dynamic_resources.InitVariables();
    }

    Release() {}

    GetVariable(shaderType, name) {
        const shaderVariable = this.dynamic_program_resources.GetShaderVariable(name);
        if(!shaderVariable) {
            return new DummyShaderVariable();
        }
        return shaderVariable;
    }
}

export {
    ShaderResourceBindingGPU,
}
