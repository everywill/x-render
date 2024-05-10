class Sampler {
    constructor(renderDevice, samplerDesc) {
        this.render_device = renderDevice;
        this.desc = samplerDesc;
    }

    Release() { throw 'need implement'; }
}

export {
    Sampler,
}
