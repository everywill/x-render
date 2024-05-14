import { Sampler } from "../graphics-engine/sampler";

class SamplerGPU extends Sampler {
    constructor(renderDevice, samplerDesc) {
        super(renderDevice, samplerDesc);
        const samCaps = this.render_device.GetDeviceCaps().sampler_caps;
    }

    Release() { }
}

export {
    SamplerGPU
}
