import { Sampler } from "../graphics-engine/sampler";
import { FILTER_TYPE, TEXTURE_ADDRESS_MODE } from "../graphics/graphics-types";

function AddressModeToGPUAddressMode(mode) {
    switch(mode) {
        case TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_WRAP:
            return 'repeat';
        case TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_MIRROR:
            return 'mirror-repeat';
        case TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_CLAMP:
            return 'clamp-to-edge';
        case TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_BORDER:
        default:
            console.warn('unknown texture address mode');
            return 'clamp-to-edge';
    }
}

function CompareFuncToGPUCompare(func) {
    switch(func) {
        case COMPARISON_FUNCTION.COMPARISON_FUNC_NEVER:
            return 'never';
        case COMPARISON_FUNCTION.COMPARISON_FUNC_LESS:
            return 'less';
        case COMPARISON_FUNCTION.COMPARISON_FUNC_EQUAL:
            return 'equal';
        case COMPARISON_FUNCTION.COMPARISON_FUNC_LESS_EQUAL:
            return 'less-equal';
        case COMPARISON_FUNCTION.COMPARISON_FUNC_GREATER:
            return 'greater';
        case COMPARISON_FUNCTION.COMPARISON_FUNC_GREATER_EQUAL:
            return 'greater-equal';
        case COMPARISON_FUNCTION.COMPARISON_FUNC_NOT_EQUAL:
            return 'not-equal';
        case COMPARISON_FUNCTION.COMPARISON_FUNC_ALWAYS:
            return 'always';
        default:
            console.warn('unknown comparison func');
            return 'always';
    }
}

class SamplerGPU extends Sampler {
    constructor(renderDevice, samplerDesc) {
        super(renderDevice, samplerDesc);
        const device = this.render_device.GetWebGPUDevice();
        const samCaps = this.render_device.GetDeviceCaps().sampler_caps;

        let minAnisotropic = false;
        let minComparison = false;
        let magAnisotropic = false;
        let magComparison = false;
        let minFilter;
        let magFilter;
        let mipmapFilter;

        switch(this.desc.min_filter) {
            case FILTER_TYPE.FILTER_TYPE_POINT:
                minAnisotropic = false;
                minComparison = false;
                minFilter = 'nearest';
                break;
            case FILTER_TYPE.FILTER_TYPE_LINEAR:
                minAnisotropic = false;
                minComparison = false;
                minFilter = 'linear';
                break;
            case FILTER_TYPE.FILTER_TYPE_ANISOTROPIC:
                minAnisotropic = true;
                minComparison = false;
                minFilter = 'linear';
                break;
            case FILTER_TYPE.FILTER_TYPE_COMPARISON_POINT:
                minAnisotropic = false;
                minComparison = true;
                minFilter = 'nearest';
                break;
            case FILTER_TYPE.FILTER_TYPE_COMPARISON_LINEAR:
                minAnisotropic = false;
                minComparison = true;
                minFilter = 'linear';
                break;
            case FILTER_TYPE.FILTER_TYPE_COMPARISON_ANISOTROPIC:
                minAnisotropic = true;
                minComparison = true;
                minFilter = 'linear';
                break;
            default:
                throw 'unknown filter type';
        }

        switch(this.desc.mag_filter) {
            case FILTER_TYPE.FILTER_TYPE_POINT:
                magAnisotropic = false;
                magComparison = false;
                magFilter = 'nearest';
                break;
            case FILTER_TYPE.FILTER_TYPE_LINEAR:
                magAnisotropic = false;
                magComparison = false;
                magFilter = 'linear';
                break;
            case FILTER_TYPE.FILTER_TYPE_ANISOTROPIC:
                magAnisotropic = true;
                magComparison = false;
                magFilter = 'linear';
                break;
            case FILTER_TYPE.FILTER_TYPE_COMPARISON_POINT:
                magAnisotropic = false;
                magComparison = true;
                magFilter = 'nearest';
                break;
            case FILTER_TYPE.FILTER_TYPE_COMPARISON_LINEAR:
                magAnisotropic = false;
                magComparison = true;
                magFilter = 'linear';
                break;
            case FILTER_TYPE.FILTER_TYPE_COMPARISON_ANISOTROPIC:
                magAnisotropic = true;
                magComparison = true;
                magFilter = 'linear';
                break;
            default:
                throw 'unknown filter type';
        }

        switch(this.desc.mip_filter) {
            case FILTER_TYPE.FILTER_TYPE_UNKNOWN:
            case FILTER_TYPE.FILTER_TYPE_POINT:
                mipmapFilter = 'nearest';
                break;
            case FILTER_TYPE.FILTER_TYPE_LINEAR:
                mipmapFilter = 'linear';
                break;
            default:
                throw 'unknown mip mode';
        }

        if(minAnisotropic != magAnisotropic) {
            throw 'incosistent anisotropy filter setting';
        }

        if(minComparison != magComparison) {
            throw 'incosistent comprison filter setting';
        }

        const descriptor = {
            addressModeU: AddressModeToGPUAddressMode(this.desc.address_u),
            addressModeV: AddressModeToGPUAddressMode(this.desc.address_v),
            addressModeW: AddressModeToGPUAddressMode(this.desc.address_w),
            compare: CompareFuncToGPUCompare(this.desc.comparison_func),
            lodMinClamp: this.desc.min_LOD,
            lodMaxClamp: this.desc.max_LOD,
            maxAnisotropy: this.desc.max_anisotropy,
            magFilter,
            minFilter,
            mipmapFilter,
        };

        this.gpu_sampler = device.createSampler(descriptor);
    }

    GetNativeHandle() { return this.gpu_sampler; }

    Release() { }
}

export {
    SamplerGPU
}
