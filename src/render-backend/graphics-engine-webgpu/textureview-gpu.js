import { TextureView } from "../graphics-engine/textureview";
import { RESOURCE_DIMENSION } from "../graphics/graphics-types";

class TextureViewGPU extends TextureView {
    constructor(renderDevice, viewDesc, texture) {
        super(renderDevice, viewDesc, texture);

        const descriptor = {};
        descriptor.aspect = 'all';
        descriptor.baseArrayLayer = this.desc.first_array_or_depth_slice;
        descriptor.arrayLayerCount = this.desc.num_array_or_depth_slice;
        descriptor.baseMipLevel = this.desc.most_detailed_mip;
        descriptor.mipLevelCount = this.desc.num_mip_levels;

        switch(this.desc.texture_dim) {
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_1D:
                descriptor.dimension = '1d';
                break;   
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D:
                descriptor.dimension = '2d';  
                break;
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY:
                descriptor.dimension = '2d-array';
                break;
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE:
                descriptor.dimension = 'cube';
                break;
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY:
                descriptor.dimension = 'cube-array';
                break;
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D:
                descriptor.dimension = '3d';
                break;
            default:
                throw 'texture view dimension not supported';
        }

        this.gpu_texture_view = texture.GetNativeHandle().createView(descriptor);
    }

    GetNativeHandle() { return this.gpu_texture_view; }

    Release() {}

    GenerateMips(deviceContext) {
        // todo: generate by rendering
    }
}

export {
    TextureViewGPU,
}
