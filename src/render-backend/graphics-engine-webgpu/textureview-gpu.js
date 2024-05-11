import { TextureView } from "../graphics-engine/textureview";

class TextureViewGPU extends TextureView {
    constructor(renderDevice, viewDesc, texture) {
        super(renderDevice, viewDesc, texture);
    }
}

export {
    TextureViewGPU,
}
