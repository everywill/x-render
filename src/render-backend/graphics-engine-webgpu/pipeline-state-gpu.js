import { PipelineState } from "../graphics-engine/pipelinestate";
import { ShaderResourceBindingGPU } from "./shader-resource-binding-gpu";

class PipelineStateGPU extends PipelineState {
    constructor(renderDevice, pipelineStateDesc) {
        super(renderDevice, pipelineStateDesc);
        
        const deviceCaps = this.render_device.GetDeviceCaps();
    }

    Release() { }

    CreateShaderResourceBinding() {
        return new ShaderResourceBindingGPU(this);
    }
}

export {
    PipelineStateGPU
}
