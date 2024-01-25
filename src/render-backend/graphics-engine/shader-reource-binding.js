class ShaderResourceBinding {
    constructor(pipelineState) {
        this.pipelinestate = pipelineState;
    }

    GetPipielineState() { return this.pipelinestate; }

    GetVariable(shaderType, name) { throw 'implementation needed'; }
}

export {
    ShaderResourceBinding,
}
