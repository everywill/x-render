import { BIND_FLAGS, CPU_ACCESS_FLAGS, MISC_TEXTURE_FLAGS, RESOURCE_DIMENSION, TEXTURE_FORMAT, USAGE } from "./graphics-types";

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
        this.bind_flags = BIND_FLAGS.BIND_NONE;
        this.usage = USAGE.USAGE_DEFAULT;
        this.cpu_access_flags = CPU_ACCESS_FLAGS.CPU_ACCESS_NONE;
        this.misc_flag = MISC_TEXTURE_FLAGS.MISC_TEXTURE_FLAG_NONE;
    }
}

class TextureSubResData {
    constructor(data = null, srcBuffer = null, stride = 0, depthStride = 0) {
        // not null if provided with CPU memory
        this.data = data;
        // not null if provided with GPU buffer
        this.src_buffer = srcBuffer;
        this.stride = stride;
        this.depth_stride = depthStride;
    }
}

class TextureData {
    constructor() {
        this.sub_resources = [];
    }
}

export {
    TextureDesc,
    TextureSubResData,
    TextureData,
}
