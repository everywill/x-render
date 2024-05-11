import { Shader } from "../graphics-engine/shader";

class ShaderGPU extends Shader {
    constructor(renderDevice, shaderCreationAttribs) {
        super(renderDevice, shaderCreationAttribs.shader_desc);
    }
}

export {
    ShaderGPU,
}
