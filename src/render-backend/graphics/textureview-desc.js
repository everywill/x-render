import { RESOURCE_DIMENSION, TEXTURE_FORMAT, TEXTURE_VIEW_TYPE } from "./graphics-types";

const UAV_ACCESS_FLAG = {
    UAV_ACCESS_UNSPECIFIED: 0,
    // allow read operations on the UAV
    UAV_ACCESS_FLAG_READ: 1,
    // allow write operations on the UAV
    UAV_ACCESS_FLAG_WRITE: 2,
    UAV_ACCESS_FLAG_READ_WRITE: 3
}

class TextureViewDesc {
    constructor() {
        this.view_type = TEXTURE_VIEW_TYPE.TEXTURE_VIEW_UNDEFINED;
        // view interpretation of the original texture.
        // for instance, one slice of a 2D texture array can be viewer as a 2D texture
        // if RESOURCE_DIM_UNDEFINED is provided, will match the type of the referenced texture
        this.texture_dim = RESOURCE_DIMENSION.RESOURCE_DIM_UNDEFINED;
        // if TEX_FORMAT_UNKNOWN is provided, will match the referenced texture format
        this.format = TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN;
        this.most_detailed_mip = 0;
        // total number of mip levels for the view of the texture.
        // Render target and depth stencil views can address only one mip level.
        // If 0 is provided, then for a shader resource view all mip levels will be referenced
        // and for a render target or a depth stencil view, one mip level will be referenced.
        this.num_mip_levels = 0;
        // for a texture array or a 3D texture
        this.first_array_or_depth_slice = 0;
        this.num_array_or_depth_slice = 0;
        this.access_flags = UAV_ACCESS_FLAG.UAV_ACCESS_UNSPECIFIED;
    }
}

export {
    TextureViewDesc,
}
