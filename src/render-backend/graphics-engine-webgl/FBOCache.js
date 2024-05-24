import { KeyPool } from "../../utils/key-pool";
import { MAX_RENDER_TARGETS } from "../graphics/device-caps";
import { TEXTURE_FORMAT } from "../graphics/graphics-types";
import { GetCurrentContext } from "./gl-context";

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
        // map cache key to fbo
        // cache includes render target number/depth stencil/render targets
        this.cache = new Map();
        // map texture 
        this.texture_cachekey = new Map();
        // store fbo waiting for be released in next GetFBO action
        this.release_queue = [];
        this.cache_key_pool = new KeyPool(() => new FBOCacheKey());
    }

    FindKey(cacheKey) {
        for(let [key, value] of this.cache) {
            if(key.equal(cacheKey)) {
                return key;
            }
        }
    }

    OnReleaseTexture(texture) {
        const cacheKeys = this.texture_cachekey.get(texture) || [];
        const releaseFBOCacheKeys = [];
        for(let cacheKey of cacheKeys) {
            const fbo = this.cache.get(cacheKey);

            if(fbo) {
                this.release_queue.push(fbo);
                releaseFBOCacheKeys.push(cacheKey);
            }

            this.cache.delete(cacheKey);
        }
        this.texture_cachekey.set(texture, []);

        for(let cacheKey of releaseFBOCacheKeys) {
            for(let [key, val] of this.texture_cachekey) {
                const keyIndex = val.indexOf(cacheKey);
                if(keyIndex != -1) {
                    val.splice(keyIndex, 1);
                }
            }
        }
    }

    GetFBO(numRenderTargets, renderTargets, depthStencil, contextState) {
        const gl = GetCurrentContext();
        if(numRenderTargets>0 && !renderTargets[numRenderTargets-1]) {
            numRenderTargets--;
        }
        if(numRenderTargets==0 && !depthStencil) {
            throw 'At least one render target or a depth-stencil must be provided';
        }

        if(this.release_queue.length) {
            for(let fbo of this.release_queue) {
                gl.deleteFramebuffer(fbo);
            }
            this.release_queue.length = 0;
        }

        const key = this.cache_key_pool.GetKey();
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
            this.cache_key_pool.ReleaseKey(key);
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

            if(cacheKey.depth_stencil) {
                const depthStencilTex = cacheKey.depth_stencil;
                if(!this.texture_cachekey.get(depthStencilTex)) {
                    this.texture_cachekey.set(depthStencilTex, []);
                }
                const cachekeys = this.texture_cachekey.get(depthStencilTex);
                cachekeys.push(cacheKey);
            }

            for(let i=0; i<cacheKey.render_targets.length; i++) {
                const renderTargetTex = cacheKey.render_targets[i];
                if(!this.texture_cachekey.get(renderTargetTex)) {
                    this.texture_cachekey.set(renderTargetTex, []);
                }
                const cachekeys = this.texture_cachekey.get(renderTargetTex);
                cachekeys.push(cacheKey);
            }

            return newFBO;
        }
    }
}

export {
    FBOCache,
}
