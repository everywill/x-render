import { RenderDevice } from "../graphics-engine/render-device";

class RenderDeviceGPU extends RenderDevice {
    constructor(engineAttribs) {
        super(engineAttribs.custom_device_caps, 0);
    }
}

export {
    RenderDeviceGPU,
}