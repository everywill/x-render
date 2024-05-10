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

    Release() {}

    SetBindTarget(bindTarget) {
        this.view_texture_bind_target = bindTarget;
    }

    GenerateMips(deviceContext) {
        const contextState = deviceContext.GetContextState
        const bindTarget = this.GetBindTarget();
        // bind to the last unit
        contextState.BindTexture(-1, bindTarget, this.GetTexture());
        gl.generateMipmap(bindTarget);
        contextState.BindTexture(-1, bindTarget, null);
    }
}

export {
    TextureViewGL
}
