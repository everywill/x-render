import { RESOURCE_DIMENSION, TEXTURE_FORMAT } from "./graphics-types";

class TextureDesc {
    constructor() {
        this.type = RESOURCE_DIMENSION.RESOURCE_DIM_UNDEFINED;
        this.width = 0;
        this.height = 0;
        // for a 1D array or 2D array, number of array slices
        // for a 3D texture, number of depth slices
        this.array_size_or_depth = 1;
        this.format = TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN;
        // number of mip levels in texture. Multisampled textures can only have 1 Mip level.
        // Specify 0 to create full mipmap chain.
        this.mip_levels = 1;
        this.sample_count = 1;
    }
}