import { SHADER_TYPE } from "./graphics-types";

const SHADER_RESOURCE_VARIABLE_TYPE = {
    SHADER_RESOURCE_VARIABLE_TYPE_STATIC: 0,
    
};

class ShaderDesc {
    constructor() {
        this.shader_type = SHADER_TYPE.SHADER_TYPE_UNKNOWN;
    }
}

export {
    ShaderDesc,
}