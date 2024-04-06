import { MAX_RENDER_TARGETS } from "../graphics/device-caps";
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
            const newFBO = gl.createFramebuffer();
            contextState.BindFBO(newFBO);
        }
    }
}

export {
    FBOCache,
}
