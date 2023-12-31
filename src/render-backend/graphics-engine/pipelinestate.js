class PipelineState {
    constructor(renderDevice, pipelineStateDesc) {
        this.desc = pipelineStateDesc;

        // calculate relative offset automatically
        let bAutoCalcLayout = true;
        // stride must be defined
        let bDefineAllStride = true;

        for(let elem=0; elem<this.desc.input_layout_desc.layout_elements.length; elem++) {
            const inputElem = this.desc.input_layout_desc.layout_elements[elem];
            bAutoCalcLayout &= inputElem.relative_offset == 0;
            bDefineAllStride &= inputElem.stride != 0
        }

        if(!bDefineAllStride) {
            throw 'stride should not be 0';
        }

        if(this.desc.is_compute_pipeline) {
            const computePipelineDesc = this.desc.compute_pipeline_desc;
            this.program = computePipelineDesc.program;
            if(!this.program || !this.program.GetCS()) {
                throw 'compute shader not provided';
            }
        } else {
            const graphicsPipelineDesc = this.desc.graphics_pipeline_desc;
            this.program = graphicsPipelineDesc.program;
            if(!this.program || this.program.GetCS()) {
                throw 'graphics shader not provided';
            }
        }
    }
}