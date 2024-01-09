import { Texture } from "../graphics-engine/texture";

function TexFormatToGLInternalTexFormat(format, bindFlags) {

}

class TextureGL extends Texture {
    constructor(renderDevice, deviceContext, textureDesc, textureData) {
        super(renderDevice, textureDesc);
        this.gl_texture = null;
        this.gl_renderbuffer = null;
        this.gl_tex_format
    }
}

export {
    TextureGL,
}