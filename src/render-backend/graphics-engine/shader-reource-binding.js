class ShaderResourceBinding {
    constructor(pipelineState) {
        this.pipelinestate = pipelineState;
    }

    GetPipielineState() { return this.pipelinestate; }
    GetVariable(shaderType, name) { throw 'implementation needed'; }

    Release() { throw 'need implement'; }
}

export {
    ShaderResourceBinding,
}
