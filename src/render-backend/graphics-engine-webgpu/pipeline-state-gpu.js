import { PipelineState } from "../graphics-engine/pipelinestate";

class PipelineStateGPU extends PipelineState {
    constructor(renderDevice, pipelineStateDesc) {
        super(renderDevice, pipelineStateDesc);
        
        const deviceCaps = this.render_device.GetDeviceCaps();
    }
}

export {
    PipelineStateGPU
}
