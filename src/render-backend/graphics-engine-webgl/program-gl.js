import { Program } from "../graphics-engine/program";
import { DEVICE_TYPE } from "../graphics/device-caps";

class ProgramGL extends Program {
    constructor(renderDevice, programDesc) {
        super(renderDevice, programDesc);

        this.gl_program = null;
        this.checked_link_status = false;

        const deviceCaps = this.render_device.GetDeviceCaps();
        if(deviceCaps.dev_type == DEVICE_TYPE.DEVICE_TYPE_UNDEFINED) {
            throw 'device caps is not initialzed';
        }

        const isSeparableProgramSupported = deviceCaps.eparable_program_supported;
        const isShaderBinarySupported = deviceCaps.shader_binary_supported;
    }
}

export {
    ProgramGL,
}
