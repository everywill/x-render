import { Sampler } from "../graphics-engine/sampler";

class SamplerGPU extends Sampler {
    constructor(renderDevice, samplerDesc) {
        super(renderDevice, samplerDesc);
        const samCaps = this.render_device.GetDeviceCaps().sampler_caps;

        switch(this.desc.min_filter) {

        }

        switch(this.desc.mag_filter) {

        }

        switch(this.desc.mip_filter) {
            
        }
    }

    Release() { }
}

export {
    SamplerGPU
}
