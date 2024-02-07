import { PipelineState } from "../graphics-engine/pipelinestate";
import { DEVICE_TYPE } from "../graphics/device-caps";

class PipelineStateGL extends PipelineState {
    constructor(renderDevice, pipelineStateDesc) {
        super(renderDevice, pipelineStateDesc);

        const deviceCaps = this.render_device.GetDeviceCaps();
        if(deviceCaps.dev_type == DEVICE_TYPE.DEVICE_TYPE_UNDEFINED) {
            throw 'device caps are not initialized';
        }
    }

    LinkGLProgram(isProgramPipelineSupported) {
        if(isProgramPipelineSupported) {

        } else {}
    }

    CreateShaderResourceBinding() {
        
    }
}

export {
    PipelineStateGL,
}
