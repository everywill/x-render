import { Texture } from "../graphics-engine/texture";
import { BIND_FLAGS, RESOURCE_DIMENSION, USAGE } from "../graphics/graphics-types";
import { TextureViewGPU } from "./textureview-gpu";

const FORMAT_GPU_INTERNAL_FORMAT_MAP = {};

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN] = '';

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_TYPELESS] = 'rgba32float';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_FLOAT] = 'rgba32float';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_UINT] = 'rgba32uint';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_SINT] = 'rgba32sint';

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB32_TYPELESS] = '';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB32_FLOAT] = '';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB32_UINT] = '';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB32_SINT] = '';

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_TYPELESS] = 'rgba16float';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_FLOAT] = 'rgba16float';
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UNORM] = gl.RGBA16F;  not supported
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UINT] = 'rgba16uint';
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SNORM] = gl.RGBA16_SNORM;  not supported
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SINT] = 'rgba16sint';

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG32_TYPELESS] = 'rg32float';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG32_FLOAT] = 'rg32float';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG32_UINT] = 'rg32uint';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG32_SINT] = 'rg32sint';

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R32G8X24_TYPELESS] = 'depth32float-stencil8';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT] = 'depth32float-stencil8';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT_X8X24_TYPELESS] = 'depth32float-stencil8';

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_TYPELESS] = 'rgb10a2unorm';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_UNORM] = 'rgb10a2unorm';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_UINT] = 'rgb10a2uint';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R11G11B10_FLOAT] = 'rg11b10ufloat';

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA8_TYPELESS] = 'rgba8snorm';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM] = 'rgba8snorm';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM_SRGB] = 'rgba8unorm-srgb';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UINT] = 'rgba8uint';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SNORM] = 'rgba8snorm';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SINT] = 'rgba8sint';

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG16_TYPELESS] = 'rg16float';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG16_FLOAT] = 'rg16float';
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG16_UNORM] = norm16Ext.RG16_EXT;
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG16_UINT] = 'rg16uint';
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG16_SNORM] = norm16Ext.RG16_SNORM_EXT;
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG16_SINT] = 'rg16sint';

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R32_TYPELESS] = 'r32float'
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT] = 'depth32float';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT] = 'r32float';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R32_UINT] = 'r32uint';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R32_SINT] = 'r32sint';

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R24G8_TYPELESS] = 'depth32float-stencil8';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_D24_UNORM_S8_UINT] = 'depth24plus-stencil8';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R24_UNORM_X8_TYPELESS] = 'depth24plus-stencil8';

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG8_TYPELESS] = 'rg8unorm';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG8_UNORM] = 'rg8unorm';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG8_UINT] = 'rg8uint';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG8_SNORM] = 'rg8snorm';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG8_SINT] = 'rg8sint';

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_TYPELESS] = 'r16float';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_FLOAT] = 'r16float';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_D16_UNORM] = 'depth16unorm';
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_UNORM] = gl.R16;  not supported
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_UINT] = 'r16uint';
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_SNORM] = gl.R16_SNORM;  not supported
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_SINT] = 'r16sint';

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_TYPELESS] = 'r8unorm';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_UNORM] = 'r8unorm';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_UINT] = 'r8uint';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM] = 'r8snorm';
FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_SINT] = 'r8sint';

ORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT] = 'depth32float-stencil8';

FORMAT_GPU_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB9E5_SHAREDEXP] = 'rgb9e5ufloat';

// function CorrectGPUTexFormat(gpuTexFormat, bindFlags) {
//     if(bindFlags & BIND_FLAGS.BIND_DEPTH_STENCILL) {
//         if(gpuTexFormat == gl.R32F) {
//             glTexFormat = gl.DEPTH_COMPONENT32F;
//         }
//     }
//     return glTexFormat;
// }

function TexFormatToGPUInternalTexFormat(textureFormat, bindFlags = 0) {
    if(textureFormat>=TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN && textureFormat<TEXTURE_FORMAT.TEX_FORMAT_NUM_FORMATS) {
        let gpuFormat = FORMAT_GPU_INTERNAL_FORMAT_MAP[textureFormat];
        // if(bindFlags) {
        //     gpuFormat = CorrectGPUTexFormat(gpuFormat, bindFlags);
        // }
        return gpuFormat;
    } else {
        throw 'Texture format is out of range';
    }
}

class TextureGPU extends Texture {
    constructor(renderDevice, textureDesc, textureData) {
        super(renderDevice, textureDesc);

        if(!this.gpu_tex_format) {
            throw 'unsupported texture format';
        }
        if(this.desc.usage==USAGE.USAGE_STATIC && !textureData.sub_resources.length) {
            throw 'static texture must be initialized with data at creation time';
        }

        const device = this.render_device.GetWebGPUDevice();
        const descriptor = {};
        descriptor.format = TexFormatToGPUInternalTexFormat(this.desc.format, this.desc.bind_flags);
        descriptor.mipLevelCount = this.desc.mip_levels;
        if(this.desc.sample_count > 1) {
            console.warn('multisample texture count only support 4 samples');
            descriptor.sampleCount = 4;
        } else {
            descriptor.sampleCount = 1;
        }
        descriptor.size = {
            width: this.desc.width,
            height: this.desc.height,
            depthOrArrayLayers: this.desc.array_size_or_depth,
        };

        descriptor.usage = 0;
        if(this.desc.bind_flags&(BIND_FLAGS.BIND_RENDER_TARGET|BIND_FLAGS.BIND_DEPTH_STENCILL)) {
            descriptor.usage |= GPUTextureUsage.RENDER_ATTACHMENT;
        }
        if(this.desc.bind_flags & BIND_FLAGS.BIND_UNORDERED_ACCESS) {
            descriptor.usage |= GPUTextureUsage.STORAGE_BINDING;
        }
        if(this.desc.bind_flags & BIND_FLAGS.BIND_SHADER_RESOURCE) {
            descriptor.usage |= GPUTextureUsage.TEXTURE_BINDING;
        }

        switch(this.desc.type) {
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_1D:
                descriptor.dimension = '1d';
                break;
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D:
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY:
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE:
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY:
                descriptor.dimension = '2d';
                break;
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D:
                descriptor.dimension = '3d';
                break;
            default:
                throw 'texture dimension not supported';
        }

        this.gpu_texture = device.createTexture(descriptor);
    }

    GetNativeHandle() { return this.gpu_texture; }

    Release() {
        if(this.gpu_texture) {
            this.gpu_texture.destroy();
            this.gpu_texture = null;
        }
    }

    CreateViewInternal(viewDesc) {
        this.CorrectTextureViewDesc(viewDesc);
        return new TextureViewGPU(this.render_device, viewDesc, this);
    }

    UpdateData(deviceContext, mipLevel, slice, dstBox, subResData) {
        super.UpdateData(deviceContext, mipLevel, slice, dstBox, subResData);
        if(this.desc.usage != USAGE.USAGE_DEFAULT) {
            throw 'only default usage textures can be updated with UpdateData';
        }
        deviceContext.UpdateTextureRegion(this, mipLevel, slice, dstBox, subResData);
    }

    CopyData(deviceContext, srcTexture, srcMipLevel, srcSlice, srcBox, 
        dstMipLevel, dstSlice, dstX, dstY, dstZ) 
    {    
        super.CopyData(deviceContext, srcTexture, srcMipLevel, srcSlice, srcBox, 
            dstMipLevel, dstSlice, dstX, dstY, dstZ);
        
        deviceContext.CopyTextureRegion(srcTexture, srcMipLevel, srcSlice, srcBox, 
                this, dstMipLevel, dstSlice, dstX, dstY, dstZ);
    }

    ReadPixels(deviceContext, pixels, isHDR) {
        if(isHDR && (this.desc.type != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D || this.desc.format != TEXTURE_FORMAT.TEX_FORMAT_RGBA32_FLOAT)) {
            throw 'Read Pixels only support 2D Texture, HDR Texture only support RGBA32F';
        }
        if(!isHDR && (this.desc.type != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D || this.desc.format != TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM)) {
            throw 'Read Pixels only support 2D Texture, 8bit Texture only support RGBA8';
        }
        // todo: 
    }

    ReadPixelsInternal(deviceContext, pixels) {
        if(pixels instanceof Float32Array) {
            return this.ReadPixelsInternal(deviceContext, pixels, true);
        } else {
            return this.ReadPixelsInternal(deviceContext, pixels, false);
        }
    }
}

export {
    TextureGPU,
}
