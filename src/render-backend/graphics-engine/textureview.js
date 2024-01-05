class TextureView {
    constructor(renderDevice, viewDesc, texture) {
        this.desc = viewDesc;
        this.texture = texture;
        this.sampler = null;
    }
    GetDesc() { return this.desc; }
    GetSampler() { return this.sampler; }
    GetTexture() { return this.texture; }
    SetSampler(sampler) { this.sampler = sampler; }
    GenerateMips(deviceContext) { throw 'need implement'; }
}

export {
    TextureView,
}