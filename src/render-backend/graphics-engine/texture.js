import { BIND_FLAGS, COMPONENT_TYPE, RESOURCE_DIMENSION, TEXTURE_FORMAT, TEXTURE_VIEW_TYPE } from "../graphics/graphics-types";
import { ComputeMipLevelsCount, GetTextureFormatAttribs } from "../graphics-accessories/graphics-accessories";
import { TextureViewDesc } from "../graphics/textureview-desc";

class Texture {
    constructor(renderDevice, textureDesc) {
        this.desc = textureDesc;

        if(this.desc.mip_levels == 0) {
            // 2D texture
            if(this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D ||
                this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY ||
                this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE ||
                this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY) 
            {
                this.desc.mip_levels = ComputeMipLevelsCount(this.desc.width, this.desc.height);
            }
            else if(this.desc == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D)
            {
                this.desc.mip_levels = ComputeMipLevelsCount(this.desc.width, this.desc.height, this.desc.array_size_or_depth);
            } else {
                throw "Unknown texture type";
            }
        }

        this.ValidateTextureDesc(this.desc);
        this.created_texture_views = new Map();
        this.default_SRV = null;
        this.default_RTV = null;
        this.default_DSV = null;
        this.default_UAV = null;
    }

    CreateViewInternal() {
        throw 'implementation needed';
    }

    // calls CreateViewInternal() that creates texture view for the specific engine implementation
    CreateView(viewDesc) {
        let view = this.created_texture_views.get(viewDesc)
        if(!view) {
            view = this.CreateViewInternal(ViewDesc);
            this.created_texture_views.set(viewDesc, view);
        }
        return view;
    }

    CreateDefaultViews() {
        const texFmtAttribs = GetTextureFormatAttribs(this.desc.format);
        if(texFmtAttribs.component_type == COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED) {
            return;
        }
        if(this.desc.bind_flags == BIND_FLAGS.BIND_SHADER_RESOURCE) {
            const viewDesc = new TextureViewDesc();
            viewDesc.view_type = TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE;
            this.default_SRV = this.CreateViewInternal(viewDesc);
            this.created_texture_views.set(viewDesc, this.default_SRV);
        }
        if(this.desc.bind_flags == BIND_FLAGS.BIND_RENDER_TARGET) {
            const viewDesc = new TextureViewDesc();
            viewDesc.view_type = TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET;
            this.default_RTV = this.CreateViewInternal(viewDesc);
            this.created_texture_views.set(viewDesc, this.default_RTV);
        }
        if(this.desc.bind_flags == BIND_FLAGS.BIND_DEPTH_STENCILL) {
            const viewDesc = new TextureViewDesc();
            viewDesc.view_type = TEXTURE_VIEW_TYPE.TEXTURE_VIEW_DEPTH_STENCIL;
            this.default_DSV = this.CreateViewInternal(viewDesc);
            this.created_texture_views.set(viewDesc, this.default_DSV);
        }
        if(this.desc.bind_flags == BIND_FLAGS.BIND_UNORDERED_ACCESS) {
            const viewDesc = new TextureViewDesc();
            viewDesc.view_type = TEXTURE_VIEW_TYPE.TEXTURE_VIEW_UNORDERED_ACCESS;
            this.default_UAV = this.CreateViewInternal(viewDesc);
            this.created_texture_views.set(viewDesc, this.default_UAV);
        }
    }

    GetDefaultView(view_type) {
        switch(view_type) {
            case TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE:
                return this.default_SRV;
            case TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET:
                return this.default_RTV;
            case TEXTURE_VIEW_TYPE.TEXTURE_VIEW_DEPTH_STENCIL:
                return this.default_DSV;
            case TEXTURE_VIEW_TYPE.TEXTURE_VIEW_UNORDERED_ACCESS:
                return this.default_UAV;
            default:
                throw "Unknown view type";
        }
    }

    UpdateData(deviceContext, mipLevel, slice, dstBox, subResData) {
        throw 'implementation needed';
    }

    CopyData(deviceContext, srcTexture, srcMipLevel, srcSlice, srcBox, 
                dstMipLevel, dstSlice, dstX, dstY, dstZ) 
    {
        throw 'implementation needed';
    }

    ValidateTextureDesc(desc) {
        if(desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_UNDEFINED) {
            console.error('Texture Resource dimension is undefined');
        }
        if(!(desc.type>=RESOURCE_DIMENSION.RESOURCE_DIM_TEX_1D && desc.type<RESOURCE_DIMENSION.RESOURCE_DIM_NUM_DIMENSIONS)) {
            console.error('Texture Unexpected resource dimension');
        }
        if(desc.width == 0) {
            console.error("Texture width cannot be zero");
        }
        if(desc.height == 0) {
            console.error('Texture height cannot be zero');
        }
        if(desc.type==RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D && desc.array_size_or_depth==0) {
            console.error('3D texture depth cannot be zero');
        }
        if(desc.type==RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D && desc.array_size_or_depth != 1) {
            console.error('Texture 2D must have one array slice');
        }
        if(desc.type==RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE || desc.type==RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY) {
            if(desc.width != desc.height) {
                console.error("For cube map textures, width must match height");
            }
            if(desc.array_size_or_depth < 6) {
                console.error("Texture cube/cube array must have at least 6 slices");
            }
        }

        let maxDim = 0;
        if(desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D ||
            desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY ||
            desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE ||
            desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY)
        {
            maxDim = Math.max(desc.width, desc.height);
        } else if(desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
            maxDim = Math.max(desc.width, desc.height, desc.array_size_or_depth);
        }

        if(maxDim >= (1 << desc.mip_levels)) {
            console.error('Incorrect number of Mip levels');
        }

        if(desc.sample_count > 1) {
            if(!(desc.type==RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D||desc.type==RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY)) {
                console.error('Only Texture 2D/Texture 2D Array can be multisampled');
            }
            if(desc.mip_levels != 1) {
                console.error('Multisampled textures must have one mip level');
            }
            if(desc.bind_flags == BIND_FLAGS.BIND_UNORDERED_ACCESS) {
                console.error('UAVs are not allowed for multisampled resources')
            }
        }
        if(desc.bind_flags == BIND_FLAGS.BIND_RENDER_TARGET && (
            desc.format == TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SNORM ||
            desc.format == TEXTURE_FORMAT.TEX_FORMAT_RG8_SNORM ||
            desc.format == TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM ||
            desc.format == TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SNORM ||
            desc.format == TEXTURE_FORMAT.TEX_FORMAT_RG16_SNORM ||
            desc.format == TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM
        )) {
            console.warn('There might be an issue in OpenGL driver on NVidia hardware: when rendering to SNORM textures, all negative values are clamped to zero');
        }
    }
}

export {
    Texture,
}