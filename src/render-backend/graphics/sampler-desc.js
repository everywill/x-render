import { COMPARISON_FUNCTION, FILTER_TYPE, TEXTURE_ADDRESS_MODE } from "./graphics-types";

class SamplerDesc {
    constructor() {
        this.min_filter = FILTER_TYPE.FILTER_TYPE_LINEAR;
        this.mag_filter = FILTER_TYPE.FILTER_TYPE_LINEAR;
        // only POINT/LINEAR/ANISOTROPIC/COMPARISON_ANISOTROPIC are allowed 
        this.mip_filter = FILTER_TYPE.FILTER_TYPE_LINEAR;
        this.address_u = TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_CLAMP;
        this.address_v = TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_CLAMP;
        this.address_w = TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_CLAMP;
        this.max_anisotropy = 0;
        this.comparison_func = COMPARISON_FUNCTION.COMPARISON_FUNC_NEVER;
        this.border_color = [0, 0, 0, 0]
        this.min_LOD = 0;
        this.max_LOD = 15;
    }
}

export { 
    SamplerDesc,
}