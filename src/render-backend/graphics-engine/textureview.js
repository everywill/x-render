class TextureView {
    constructor(renderDevice, viewDesc, texture) {
        this.desc = viewDesc;
        this.texture = texture;
        this.sampler = null;
    }
    GetSampler() { 
        return this.sampler 
    }
    GetTexture() {
        return this.texture;
    }
    SetSampler(sampler) {
        this.sampler = sampler;
    }
    
}

export {
    TextureView,
}