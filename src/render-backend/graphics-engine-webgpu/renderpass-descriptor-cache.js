import { KeyPool } from "../../utils/key-pool";
import { MAX_RENDER_TARGETS } from "../graphics/device-caps";
import { TexFormatToGPUInternalTexFormat } from "./texture-gpu";

class RenderPassDescriptorCacheKey {
    constructor() {
        this.num_render_targets = 0;
        this.depth_stencil = null;
    }
    equal(key) {
        if(this.num_render_targets != key.num_render_targets) {
            return false;
        }
        if(this.depth_stencil != key.depth_stencil) {
            return false;
        }
        return true;
    }
}

class RenderPassDescriptorCache {
    constructor() {
        // this.render_device = renderDevice;
        this.cache = new Map();
        this.cache_key_pool = new KeyPool(() => new RenderPassDescriptorCacheKey());
    }

    FindKey(cacheKey) {
        for(let [key, value] of this.cache) {
            if(key.equal(cacheKey)) {
                return key;
            }
        }
    }

    GetDescriptor(numRenderTargets, renderTargets, depthStencil) {
        if(numRenderTargets>0 && !renderTargets[numRenderTargets-1]) {
            numRenderTargets--;
        }
        if(numRenderTargets==0 && !depthStencil) {
            throw 'At least one render target or a depth-stencil must be provided';
        }
        
        if(numRenderTargets>MAX_RENDER_TARGETS) {
            console.warn('Too many render targets set');
            numRenderTargets = Math.min(numRenderTargets, MAX_RENDER_TARGETS);
        }
        const cacheKey = this.cache_key_pool.GetKey();

        cacheKey.num_render_targets = numRenderTargets;
        cacheKey.depth_stencil = depthStencil;

        const key = this.FindKey(cacheKey);

        if(key) {
            this.cache_key_pool.ReleaseKey(cacheKey);
            return this.cache[key];
        } else {
            const descriptor = {};

            const colorAttachments = [];
            for(let i=0; i<numRenderTargets; i++) {
                const attachment = {
                    clearValue: [0, 0, 0, 0],
                    loadOp: "clear",  // better performance on some devices
                    storeOp: "discard",
                    resolveTarget: null,
                    view: null,
                };
                colorAttachments[i] = attachment;
            }

            descriptor.colorAttachments = colorAttachments;

            if(depthStencil) {
                const depthStencilAttachment = {
                    depthClearValue: undefined,
                    depthLoadOp: "clear", // better performance on some devices
                    depthReadOnly: false,
                    depthStoreOp: "discard",
                    stencilClearValue: 0,
                    stencilLoadOp: "clear", // better performance on some devices
                    stencilReadOnly: false,
                    stencilStoreOp: "discard",
                    view: null,
                };

                descriptor.depthStencilAttachment = depthStencilAttachment;
            }

            this.cache[key] = descriptor;

            return this.cache[key];
        }
    }
}

export {
    RenderPassDescriptorCache,
}
