import { MAX_RENDER_TARGETS } from "../graphics/device-caps";
import { TEXTURE_FORMAT } from "../graphics/graphics-types";
import { gl } from "./gl";

class FBOCacheKey {
    constructor() {
        this.num_render_targets = 0;
        this.depth_stencil = null;
        this.depth_stencil_desc = null;
        this.render_targets = [];
        this.render_target_desc = [];
    }
    equal(key) {
        if(this.num_render_targets != key.num_render_targets) {
            return false;
        }
        for(let i=0; i<this.num_render_targets; i++) {
            if(this.render_targets[i] != key.render_targets[i]) {
                return false;
            }
            if(this.render_targets[i]) {
                if(this.render_target_desc[i] != key.render_target_desc[i]) {
                    return false;
                }
            }
        }
        if(this.depth_stencil != key.depth_stencil) {
            return false;
        }
        if(this.depth_stencil) {
            if(this.depth_stencil_desc != key.depth_stencil_desc) {
                return false;
            }
        }

        return true;
    }
}

class FBOCache {
    constructor() {
        this.cache = new Map();
    }

    FindKey(cacheKey) {
        for(let [key, value] of this.cache) {
            if(key.equal(cacheKey)) {
                return key;
            }
        }
    }

    GetFBO(numRenderTargets, renderTargets, depthStencil, contextState) {
        if(numRenderTargets>0 && !renderTargets[numRenderTargets-1]) {
            numRenderTargets--;
        }
        if(numRenderTargets==0 && !depthStencil) {
            throw 'At least one render target or a depth-stencil must be provided';
        }

        const key = new FBOCacheKey();
        if(numRenderTargets>MAX_RENDER_TARGETS) {
            console.warn('Too many render targets set');
            numRenderTargets = Math.min(numRenderTargets, MAX_RENDER_TARGETS);
        }
        key.num_render_targets = numRenderTargets;

        for(let i=0; i<numRenderTargets; i++) {
            const RTView = renderTargets[i];
            if(!RTView) {
                continue;
            }

            key.render_targets[i] = RTView.GetTexture();
            key.render_target_desc[i] = RTView.GetDesc();
        }

        if(depthStencil) {
            key.depth_stencil = depthStencil.GetTexture();
            key.depth_stencil_desc = depthStencil.GetDesc();
        }

        const cacheKey = this.FindKey(key);

        if(cacheKey) {
            return this.cache[cacheKey];
        } else {
            // create new FBO
            const newFBO = gl.createFramebuffer();
            contextState.BindFBO(newFBO);

            // initialize FBO
            for(let rt=0; rt<numRenderTargets; rt++) {
                const RTView = renderTargets[rt];
                if(RTView) {
                    const tex = RTView.GetTexture();
                    const viewDesc = RTView.GetDesc();
                    tex.AttachToFramebuffer(viewDesc, gl.COLOR_ATTACHMENT0+rt);
                }
            }

            const DSView = depthStencil;
            if(DSView) {
                const tex = RTView.GetTexture();
                const viewDesc = RTView.GetDesc();
                let attachmentPoint;
                if(viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT
                    || viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_D16_UNORM) 
                {
                    const glTexFormat = tex.GetGLTexFormat();
                    if(glTexFormat != gl.DEPTH_COMPONENT32F && glTexFormat != gl.DEPTH_COMPONENT16) {
                        throw `Inappropriate internal texture format: ${glTexFormat} for depth attachment`;
                    }
                    attachmentPoint = gl.DEPTH_ATTACHMENT
                } else if(viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT_S8X24_UINT
                    || viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_D24_UNORM_S8_UINT)
                {
                    const glTexFormat = tex.GetGLTexFormat();
                    if(glTexFormat != gl.DEPTH24_STENCIL8 && glTexFormat != gl.DEPTH32F_STENCIL8) {
                        throw `Inappropriate internal texture format: ${glTexFormat} for depth attachment`;
                    }
                    attachmentPoint = gl.DEPTH_STENCIL_ATTACHMENT;
                } else {
                    throw 'is not valid depth-stencil format';
                }
                tex.AttachToFramebuffer(viewDesc, attachmentPoint);
            }

            const drawBuffers = [
                gl.COLOR_ATTACHMENT0,
                gl.COLOR_ATTACHMENT1,
                gl.COLOR_ATTACHMENT2,
                gl.COLOR_ATTACHMENT3,
                gl.COLOR_ATTACHMENT4,
                gl.COLOR_ATTACHMENT5,
                gl.COLOR_ATTACHMENT6,
                gl.COLOR_ATTACHMENT7,
                gl.COLOR_ATTACHMENT8,
                gl.COLOR_ATTACHMENT9,
                gl.COLOR_ATTACHMENT10,
                gl.COLOR_ATTACHMENT11,
                gl.COLOR_ATTACHMENT12,
                gl.COLOR_ATTACHMENT13,
                gl.COLOR_ATTACHMENT14,
                gl.COLOR_ATTACHMENT15,
            ];
            // the state set by drawbuffers is part of the state of the framebuffer
            // so it can be set up once and left it set
            gl.drawBuffers(drawBuffers);

            const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            if(status !=gl.FRAMEBUFFER_COMPLETE) {
                // let statusString = "Unknown";
                // switch(status) {
                //     case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                //         statusString = "FRAMEBUFFER_INCOMPLETE_ATTACHMENT";
                //         break;
                //     case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                //         statusString = "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";
                //         break;
                //     case gl.FRAMEBUFFER_UNSUPPORTED:
                //         statusString = "FRAMEBUFFER_UNSUPPORTED";
                //         break;
                //     case gl.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE:
                //         statusString = "FRAMEBUFFER_INCOMPLETE_MULTISAMPLE";
                //         break;
                // }
                throw(`FrameBuffer is incomplete, status: ${status}`);
            }
            this.cache.set(cacheKey, newFBO);

            return newFBO;
        }
    }
}

export {
    FBOCache,
}
