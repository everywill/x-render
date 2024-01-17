import { Sampler } from "../graphics-engine/sampler";
import { FILTER_TYPE } from "../graphics/graphics-types";
import { gl } from "./gl";

class SamplerGL extends Sampler {
    constructor(renderDevice, samplerDesc) {
        super(renderDevice, samplerDesc);
        this.gl_sampler = gl.createSampler();
        const samCaps = this.render_device.GetDeviceCaps().sampler_caps;

        let minAnisotropic = false;
        let minComparison = false;
        let magAnisotropic = false;
        let magComparison = false;
        let glMinFilter;
        let glMagFilter;
        let glMipFilter;

        switch(this.desc.min_filter) {
            case FILTER_TYPE.FILTER_TYPE_POINT:
                minAnisotropic = false;
                minComparison = false;
                glMinFilter = gl.NEAREST;
                break;
            case FILTER_TYPE.FILTER_TYPE_LINEAR:
                minAnisotropic = false;
                minComparison = false;
                glMinFilter = gl.LINEAR;
                break;
            case FILTER_TYPE.FILTER_TYPE_ANISOTROPIC:
                minAnisotropic = true;
                minComparison = false;
                glMinFilter = gl.LINEAR;
                break;
            case FILTER_TYPE.FILTER_TYPE_COMPARISON_POINT:
                minAnisotropic = false;
                minComparison = true;
                glMinFilter = gl.NEAREST;
                break;
            case FILTER_TYPE.FILTER_TYPE_COMPARISON_LINEAR:
                minAnisotropic = false;
                minComparison = true;
                glMinFilter = gl.LINEAR;
                break;
            case FILTER_TYPE.FILTER_TYPE_COMPARISON_ANISOTROPIC:
                minAnisotropic = true;
                minComparison = true;
                glMinFilter = gl.LINEAR;
                break;
            default:
                throw 'unknown filter type';
        }

        switch(this.desc.mag_filter) {
            case FILTER_TYPE.FILTER_TYPE_POINT:
                magAnisotropic = false;
                magComparison = false;
                glMagFilter = gl.NEAREST;
                break;
            case FILTER_TYPE.FILTER_TYPE_LINEAR:
                magAnisotropic = false;
                magComparison = false;
                glMagFilter = gl.LINEAR;
                break;
            case FILTER_TYPE.FILTER_TYPE_ANISOTROPIC:
                magAnisotropic = true;
                magComparison = false;
                glMagFilter = gl.LINEAR;
                break;
            case FILTER_TYPE.FILTER_TYPE_COMPARISON_POINT:
                magAnisotropic = false;
                magComparison = true;
                glMagFilter = gl.NEAREST;
                break;
            case FILTER_TYPE.FILTER_TYPE_COMPARISON_LINEAR:
                magAnisotropic = false;
                magComparison = true;
                glMagFilter = gl.LINEAR;
                break;
            case FILTER_TYPE.FILTER_TYPE_COMPARISON_ANISOTROPIC:
                magAnisotropic = true;
                magComparison = true;
                glMagFilter = gl.LINEAR;
                break;
            default:
                throw 'unknown filter type';
        }

        switch(this.desc.mip_filter) {
            case FILTER_TYPE.FILTER_TYPE_UNKNOWN:
                glMipFilter = 0;
                break;
            case FILTER_TYPE.FILTER_TYPE_POINT:
                glMipFilter = gl.NEAREST;
                break;
            case FILTER_TYPE.FILTER_TYPE_LINEAR:
                glMipFilter = gl.LINEAR;
                break;
            default:
                throw 'unknown mip mode';
        }

        if(minAnisotropic != magAnisotropic) {
            throw 'incosistent anisotropy filter setting';
        }
        if(minComparison != magComparison) {
            throw 'incosistent comprison filter setting'
        }

        gl.samplerParameteri(this.gl_sampler, gl.TEXTURE_MAG_FILTER, glMagFilter);
        let glMinMipFilter = 0;
        if(this.desc.mip_filter == FILTER_TYPE.FILTER_TYPE_UNKNOWN) {
            glMinMipFilter = glMinFilter;
        } else {
            if(glMinFilter==gl.NEAREST && glMipFilter==gl.NEAREST) {
                glMinMipFilter = gl.NEAREST_MIPMAP_NEAREST;
            }else if(glMinFilter==gl.LINEAR && glMipFilter==gl.NEAREST) {
                glMinMipFilter = gl.LINEAR_MIPMAP_NEAREST;
            }else if(glMinFilter==gl.NEAREST && glMipFilter==gl.LINEAR) {
                glMinMipFilter = gl.NEAREST_MIPMAP_LINEAR;
            }else if(glMinFilter==gl.LINEAR && glMipFilter==gl.LINEAR) {
                glMinMipFilter = gl.LINEAR_MIPMAP_LINEAR;
            } else {
                throw 'unknown min/mip filter combination';
            }
        }
        gl.samplerParameteri(this.gl_sampler, gl.TEXTURE_MIN_FILTER, glMinMipFilter);
    }
}

export {
    Sampler
}