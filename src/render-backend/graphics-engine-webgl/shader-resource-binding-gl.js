import { ShaderResourceBinding } from "../graphics-engine/shader-reource-binding";

class ShaderResourceBindingGL extends ShaderResourceBinding {
    constructor(pipelineState) {
        super(pipelineState);
        this.dynamic_program_resources = null;
    }
}

export {
    ShaderResourceBindingGL,
}
