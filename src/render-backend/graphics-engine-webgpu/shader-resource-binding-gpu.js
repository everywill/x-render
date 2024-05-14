import { ShaderResourceBinding } from "../graphics-engine/shader-reource-binding";

class ShaderResourceBindingGPU extends ShaderResourceBinding {
    constructor(pipelineState) {
        super(pipelineState);
    }

    Release() {}

    GetVariable(shaderType, name) {}
}

export {
    ShaderResourceBindingGPU,
}
