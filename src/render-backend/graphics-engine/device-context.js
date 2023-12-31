class DeviceContext {
    constructor(renderDevice, isDeferred) {
        this.render_device = renderDevice;
        this.is_deferred = isDeferred;
        this.pipelinestate = null;
        this.stencil_ref = 0;
        this.blend_factors = [-1, -1, -1, -1];
    }

    SetPipelineState(pipelineState) {
        this.pipelinestate = pipelineState;
    }

    SetStencilRef(stencilRef) {
        if(this.stencil_ref != stencilRef) {
            this.stencil_ref = stencilRef;
            return true;
        }
        return false;
    }

    SetBlendFactors(blendFactors) {
        let factorDiff = false;
    }
}