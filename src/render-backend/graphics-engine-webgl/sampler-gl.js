import { Sampler } from "../graphics-engine/sampler";
import { FILTER_TYPE, TEXTURE_ADDRESS_MODE } from "../graphics/graphics-types";
import { CompareFuncToGLCompare, gl } from "./gl";

function AddressModeToGLAddressMode(mode) {
    switch(mode) {
        case TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_WRAP:
            return gl.REPEAT;
        case TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_MIRROR:
            return gl.MIRRORED_REPEAT;
        case TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_CLAMP:
            return gl.CLAMP_TO_EDGE;
        case TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_BORDER:
        default:
            console.warn('unknown texture address mode');
            return gl.CLAMP_TO_EDGE;
    }
}

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

        gl.samplerParameteri(this.gl_sampler, gl.TEXTURE_WRAP_S, AddressModeToGLAddressMode(this.desc.address_u));
        gl.samplerParameteri(this.gl_sampler, gl.TEXTURE_WRAP_T, AddressModeToGLAddressMode(this.desc.address_v));
        gl.samplerParameteri(this.gl_sampler, gl.TEXTURE_WRAP_R, AddressModeToGLAddressMode(this.desc.address_w));

        // if(samCaps.lod_bias_supported) { // not supported }
        if(samCaps.anisotropic_filtering_supported) {
            // gl.samplerParameterf(this.gl_sampler, gl.ani)
        }
        gl.samplerParameteri(this.gl_sampler, gl.TEXTURE_COMPARE_MODE, minComparison ? gl.COMPARE_REF_TO_TEXTURE : gl.NONE);

        gl.samplerParameteri(this.gl_sampler, gl.TEXTURE_COMPARE_FUNC, CompareFuncToGLCompare(this.desc.comparison_func));
        gl.samplerParameterf(this.gl_sampler, gl.TEXTURE_MAX_LOD, this.desc.max_LOD);
        gl.samplerParameterf(this.gl_sampler, gl.TEXTURE_MIN_LOD, this.desc.min_LOD);
    }

    GetGLSampler() { return this.gl_sampler; }
}

export {
    SamplerGL,
}
