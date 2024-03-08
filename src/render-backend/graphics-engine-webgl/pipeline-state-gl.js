import { PipelineState } from "../graphics-engine/pipelinestate";
import { DEVICE_TYPE } from "../graphics/device-caps";
import { ShaderResourceBindingGL } from "./shader-resource-binding-gl";

class PipelineStateGL extends PipelineState {
    constructor(renderDevice, pipelineStateDesc) {
        super(renderDevice, pipelineStateDesc);

        const deviceCaps = this.render_device.GetDeviceCaps();
        if(deviceCaps.dev_type == DEVICE_TYPE.DEVICE_TYPE_UNDEFINED) {
            throw 'device caps are not initialized';
        }
        this.LinkGLProgram(deviceCaps.separable_program_supported);

        t
    }

    LinkGLProgram(isProgramPipelineSupported) {
        if(isProgramPipelineSupported) {
            // not supported in WebGL
        } else {

        }
    }

    CreateShaderResourceBinding() {
        const srb = new ShaderResourceBindingGL(this);
        return srb;
    }
}

export {
    PipelineStateGL,
}
