class GLProgram {
    constructor() {
        this.all_resources = null;
        this.const_resources = null;
        this.shader_reflection = null;
    }

    GetAllResources() { return this.all_resources; }
    GetConstantResources() { return this.const_resources; }
    GetShaderReflection() { return this.shader_reflection; }

    InitResources(renderDevice, defaultVarType, variableDescs, staticSamplers) {

    }
}

export {
    GLProgram,
}
