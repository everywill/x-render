import { TextureView } from "../graphics-engine/textureview";
import { gl } from "./gl";

class TextureViewGL extends TextureView {
    constructor(renderDevice, viewDesc, texture, createGLViewTex) {
        super(renderDevice, viewDesc, texture);
        if(createGLViewTex) {
            this.view_gl_texture = gl.createTexture();
        }
        this.view_texture_bind_target = undefined;
    }

    GetTexture() { 
        if(this.view_gl_texture) {
            return this.view_gl_texture; 
        } else {
            return this.texture.GetGLTexture();
        }
    }

    GetBindTarget() { 
        if(this.view_texture_bind_target) {
            return this.view_texture_bind_target; 
        } else {
            return this.GetTexture().GetBindTarget();
        } 
    }

    SetBindTarget(bindTarget) {
        this.view_texture_bind_target = bindTarget;
    }

    GenerateMips(deviceContext) {

    }
}

export {
    TextureViewGL
}
