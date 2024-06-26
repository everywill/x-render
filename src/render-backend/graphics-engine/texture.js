import { BIND_FLAGS, Box, COMPONENT_TYPE, GetViewFormat, RESOURCE_DIMENSION, TEXTURE_FORMAT, TEXTURE_VIEW_TYPE, USAGE } from "../graphics/graphics-types";
import { ComputeMipLevelsCount, GetTextureFormatAttribs } from "../graphics-accessories/graphics-accessories";
import { TextureViewDesc } from "../graphics/textureview-desc";

class Texture {
    constructor(renderDevice, textureDesc) {
        this.render_device = renderDevice;
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
        this.resolved = false;
    }

    GetDesc() { return this.desc; }

    Release() {
        for(let [key, view] of this.created_texture_views) {
            view.Release();
        }
    }

    GetResolveFlag() { return this.resolved; }
    SetResolveFlag(resolved) { this.resolved = resolved; }

    CreateViewInternal(viewDesc) { throw 'implementation needed'; }

    CorrectTextureViewDesc(viewDesc) {
        if(!(viewDesc.view_type>TEXTURE_VIEW_TYPE.TEXTURE_VIEW_UNDEFINED && viewDesc.view_type<TEXTURE_VIEW_TYPE.TEXTURE_VIEW_NUM_VIEWS)) {
            console.error('texture view type is not specified');
        }
        if(viewDesc.most_detailed_mip+viewDesc.num_mip_levels>this.desc.mip_levels) {
            console.error('most detailed mip and number of mip levels in the view specify more levels than target texture');
        }

        if(viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN) {
            viewDesc.format = GetViewFormat(this.desc.format, viewDesc.view_type, this.desc.bind_flags);
        }

        if(viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_UNDEFINED) {
            if(this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE || this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY) {
                switch(viewDesc.view_type) {
                    case TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE:
                        viewDesc.texture_dim = this.desc.type;
                        break;
                    case TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET:
                    case TEXTURE_VIEW_TYPE.TEXTURE_VIEW_DEPTH_STENCIL:
                    case TEXTURE_VIEW_TYPE.TEXTURE_VIEW_UNORDERED_ACCESS:
                        viewDesc.texture_dim = RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY;
                        break;
                    default:
                        throw 'unexpected view type';
                }
            } else {
                viewDesc.texture_dim = this.desc.type;
            }
        }

        switch(this.desc.type) {
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D:
                if(viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D 
                    && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY)
                {
                    console.error('incorrect texture view type for Texture 2D, only Texture 2D view is allowed');
                }
                break;
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY:
                if(viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D
                    && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY)
                {
                    console.error('incorrect texture view type for Textuure 2D array, only Texture 2D view or Texture 2D array view are allowed');
                }
                break;
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D:
                if(viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
                    console.error('incorrect texture view type for Texture 3D, only Texture 3D view is allowed');
                }
                break;
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE:
                if(viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE) {
                    if(viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE 
                        && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY
                        && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D)
                    {
                        console.error('incorrect texture SRV type for Texture cube, only Texture2D/Texture2D array/Texture cube view are allowed');
                    }
                } else {
                    if(viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY
                        && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D) 
                    {
                        console.error('incorrect texture non-SRV type for Texture cube, only Texture2D/Texture2D array view are allowed');
                    }
                }
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY:
                if(viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE) {
                    if(viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY
                        && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE
                        && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY
                        && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D)
                    {
                        console.error('incorrect texture SRV for Texture cube array, only Texture2D/Texture2D array/Texture cube/Texture cube array are allowed');
                    }
                } else {
                    if(viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY
                        && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D) 
                    {
                        console.error('incorrect texture non-SRV type for Texture cube array, only Texture2D/Texture2D array view are allowed');
                    }
                }
            default:
                throw 'unexpected texture type';
        }

        if(viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE) {
            if(viewDesc.view_type != TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE) {
                throw 'unexpected texture view type, SRV is expected';
            }
            if(viewDesc.num_array_or_depth_slice!=6 && viewDesc.num_array_or_depth_slice!=0) {
                console.error('texture cube SRV is expected to have 6 array slices');
            }
            if(viewDesc.first_array_or_depth_slice != 0) {
                console.error('first slice must be 0 for non-array texture cube SRV');
            }
        }
        if(viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY) {
            if(viewDesc.view_type != TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE) {
                throw 'unexpected texture view type, SRV is expected'
            }
            if((viewDesc.num_array_or_depth_slice%6) != 0) {
                console.error('number of slices in texture cube array SRV is expected to be multiple of 6');
            }
        }
        if(viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D) {
            if(viewDesc.first_array_or_depth_slice != 0) {
                console.error('first slice must be 0 for non-array texture 1D/2D views');
            }
            if(viewDesc.num_array_or_depth_slice > 1) {
                console.error('number of slices in view must be 1(or 0) for non-array texture 1D/2D views');
            }
        } else if(viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY
                || viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE
                || viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY) 
        {
            if(viewDesc.first_array_or_depth_slice + viewDesc.num_array_or_depth_slice > this.desc.array_size_or_depth) {
                console.error('first slice and number of slices in the view specify more slices than target texture has');
            }
        } else if(viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
            const mipDepth = this.desc.array_size_or_depth >> viewDesc.most_detailed_mip;
            if(viewDesc.first_array_or_depth_slice + viewDesc.num_array_or_depth_slice > mipDepth) {
                console.error('first depth and number of depth in the view specify more depth than target 3D mip level texture has');
            }
        } else {
            throw 'unexpected texture view dimension';
        }

        if(viewDesc.num_mip_levels == 0) {
            if(viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE) {
                viewDesc.num_mip_levels = this.desc.mip_levels - viewDesc.most_detailed_mip;
            } else {
                viewDesc.num_mip_levels = 1;
            }
        }

        if(viewDesc.num_array_or_depth_slice == 0) {
            if(viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY
                || viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE
                || viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY)
            {
                viewDesc.num_array_or_depth_slice = this.desc.array_size_or_depth - viewDesc.first_array_or_depth_slice;
            } else if(viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
                const mipDepth = this.desc.array_size_or_depth >> viewDesc.most_detailed_mip;
                viewDesc.num_array_or_depth_slice = mipDepth - viewDesc.first_array_or_depth_slice;
            } else {
                viewDesc.num_array_or_depth_slice = 1;
            }
        }

        if(viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET && (
            viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM || viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_RG8_SNORM || viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SNORM ||
            viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_R16_SNORM || viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_RG16_SNORM || viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SNORM   
        )) {
            console.warn('There might be an issue in OpenGL driver on NVidia hardware: when rendering to SNORM textures, all negative values are clamped to zero. Use UNORM format instead');
        }
    }

    // calls CreateViewInternal() that creates texture view for the specific engine implementation
    CreateView(viewDesc) {
        let view = this.created_texture_views.get(viewDesc)
        if(!view) {
            view = this.CreateViewInternal(viewDesc);
            this.created_texture_views.set(viewDesc, view);
        }
        return view;
    }

    CreateDefaultViews() {
        const texFmtAttribs = GetTextureFormatAttribs(this.desc.format);
        if(texFmtAttribs.component_type == COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED) {
            return;
        }
        if(this.desc.bind_flags & BIND_FLAGS.BIND_SHADER_RESOURCE) {
            const viewDesc = new TextureViewDesc();
            viewDesc.view_type = TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE;
            this.default_SRV = this.CreateViewInternal(viewDesc);
            this.created_texture_views.set(viewDesc, this.default_SRV);
        }
        if(this.desc.bind_flags & BIND_FLAGS.BIND_RENDER_TARGET) {
            const viewDesc = new TextureViewDesc();
            viewDesc.view_type = TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET;
            this.default_RTV = this.CreateViewInternal(viewDesc);
            this.created_texture_views.set(viewDesc, this.default_RTV);
        }
        if(this.desc.bind_flags & BIND_FLAGS.BIND_DEPTH_STENCILL) {
            const viewDesc = new TextureViewDesc();
            viewDesc.view_type = TEXTURE_VIEW_TYPE.TEXTURE_VIEW_DEPTH_STENCIL;
            this.default_DSV = this.CreateViewInternal(viewDesc);
            this.created_texture_views.set(viewDesc, this.default_DSV);
        }
        if(this.desc.bind_flags & BIND_FLAGS.BIND_UNORDERED_ACCESS) {
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
        this.ValidateUpdateDataParams(this.desc, mipLevel, slice, dstBox, subResData);
    }

    CopyData(deviceContext, srcTexture, srcMipLevel, srcSlice, srcBox, 
                dstMipLevel, dstSlice, dstX, dstY, dstZ) 
    {
        this.ValidateCopyDataParams(srcTexture.GetDesc(), srcMipLevel, srcSlice, srcBox, this.desc, dstMipLevel, dstSlice, dstBox);
    }

    ReadPixels(deviceContext, pixels) { throw 'need implement'; }

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

        if(maxDim < (1 << (desc.mip_levels-1))) {
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

    ValidateUpdateDataParams(textureDesc, mipLevel, slice, dstBox, subResData) {
        if(!(!!subResData.data ^ !!subResData.srcBuffer)) 
    {
            throw 'Either CPU memory or GPU buffer must be provided, exclusively';
        }
        this.ValidateTextureRegion(textureDesc, mipLevel, slice, dstBox);
    }

    ValidateCopyDataParams(srcTextureDesc, srcMipLevel, srcSlice, srcBox,
                            dstTextureDesc, dstMipLevel, dstSlice, dstX, dstY, dstZ)
    {
        if(!srcBox) {
            srcBox = new Box();
            srcBox.max_x = Math.max(srcTextureDesc.width >> srcMipLevel, 1);
            srcBox.max_y = Math.max(srcTextureDesc.height >> srcMipLevel, 1);
            if(srcTextureDesc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
                srcBox.max_z = Math.max(srcTextureDesc.array_size_or_depth >> srcMipLevel, 1);
            }
        }
        this.ValidateTextureRegion(srcTextureDesc, srcMipLevel, srcSlice, srcBox);
        const dstBox = new Box();
        dstBox.min_x = dstX;
        dstBox.max_x = dstBox.min_x + (srcBox.max_x - srcBox.min_x);
        dstBox.min_y = dstY;
        dstBox.max_y = dstBox.min_y + (srcBox.max_y - srcBox.min_y);
        dstBox.min_z = dstZ;
        dstBox.max_z = dstBox.min_z + (srcBox.max_z - srcBox.min_z);
        this.ValidateTextureRegion(dstTextureDesc, dstMipLevel, dstSlice, dstBox);
    }     

    ValidateTextureRegion(textureDesc, mipLevel, slice, box) {
        if(mipLevel >= textureDesc.mip_levels) {
            throw `mipLevel ${mipLevel} is out of allowed range [0, ${textureDesc.mip_levels-1}]`
        }
        if(box.min_x >= box.max_z) {
            throw 'Incorrect X range';
        }
        if(box.min_y >= box.max_y) {
            throw 'Incorrect Y range';
        }
        if(box.min_z >= box.max_z) {
            throw 'Incorrect Z range';
        }
        if(textureDesc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY ||
            textureDesc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE ||
            textureDesc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY)
        {
            if(slice >= textureDesc.array_size_or_depth) {
                throw `depth or array slice is out of range [0, ${textureDesc.array_size_or_depth}]`;
            }
        } else {
            if(slice != 0) {
                throw 'depth or array slice must be 0 for non-array textures';
            }
        }

        const mipWidth = Math.max(textureDesc.width >> mipLevel, 1);
        if(mipWidth < box.max_x) {
            throw `Regin max X coordinate is out of range [0, ${mipWidth}]`;
        }

        if(textureDesc == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
            const mipDepth = Math.max(textureDesc.array_size_or_depth >> mipLevel, 1);
            if(mipDepth < box.max_z) {
                throw `Regin max Z coordinate is out of range [0, ${mipDepth}]`;
            }
        }
    }
}

export {
    Texture,
}
