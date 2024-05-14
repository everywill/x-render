import { TextureView } from "../graphics-engine/textureview";

class TextureViewGPU extends TextureView {
    constructor(renderDevice, viewDesc, texture) {
        super(renderDevice, viewDesc, texture);

        this.gpu_texture_view = null;
    }

    GetNativeHandle() { return this.gpu_texture_view; }

    Release() {}

    GenerateMips(deviceContext) {}
}

export {
    TextureViewGPU,
}
