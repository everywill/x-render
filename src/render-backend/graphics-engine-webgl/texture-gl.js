import { GetTextureFormatAttribs } from "../graphics-accessories/graphics-accessories";
import { Texture } from "../graphics-engine/texture";
import { BIND_FLAGS, Box, GetViewFormat, MISC_TEXTURE_FLAGS, RESOURCE_DIMENSION, TEXTURE_FORMAT, TEXTURE_VIEW_TYPE, USAGE } from '../graphics/graphics-types';
import { gl } from "./gl";
import { TextureViewGL } from "./textureview-gl";

const FORMAT_GL_INTERNAL_FORMAT_MAP = {};

FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN] = 0;

FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_TYPELESS] = gl.RGBA32F;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_FLOAT] = gl.RGBA32F;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_UINT] = gl.RGBA32UI;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_SINT] = gl.RGBA32I;

FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB32_TYPELESS] = gl.RGB32F;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB32_FLOAT] = gl.RGB32F;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB32_UINT] = gl.RGB32UI;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB32_SINT] = gl.RGB32I;

FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_TYPELESS] = gl.RGBA16F;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_FLOAT] = gl.RGBA16F;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UNORM] = gl.RGBA16F;  not supported in WebGL
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UINT] = gl.RGBA16UI;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SNORM] = gl.RGBA16_SNORM;  not supported in WebGL
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SINT] = gl.RGBA16I;

FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG32_TYPELESS] = gl.RG32F;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG32_FLOAT] = gl.RG32F;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG32_UINT] = gl.RG32UI;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG32_SINT] = gl.RG32I;

FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R32G8X24_TYPELESS] = gl.DEPTH32F_STENCIL8;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT] = gl.DEPTH32F_STENCIL8;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT_X8X24_TYPELESS] = gl.DEPTH32F_STENCIL8;

FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG8_TYPELESS] = gl.RG8;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG8_UNORM] = gl.RG8;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG8_UINT] = gl.RG8UI;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG8_SNORM] = gl.RG8_SNORM;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG8_SINT] = gl.RG8I

FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_TYPELESS] = gl.R16F;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_FLOAT] = gl.R16F;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_D16_UNORM] = gl.DEPTH_COMPONENT16;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_UNORM] = gl.R16;  not supported in WebGL
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_UINT] = gl.R16UI;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_SNORM] = gl.R16_SNORM;  not supported in WebGL
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_SINT] = gl.R16I;

FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_TYPELESS] = gl.R8;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_UNORM] = gl.R8;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_UINT] = gl.R8UI;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM] = gl.R8_SNORM;
FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_SINT] = gl.R8I;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_A8_UNORM] = 0;  not supported in WebGL

FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB9E5_SHAREDEXP] = gl.RGB9_E5;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG8_B8G8_UNORM] = 0;  not supported in WebGL
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_G8R8_G8B8_UNORM] = 0;  not supported in WebGL

// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC1_TYPELESS] = gl.COMPRESSED_TEXTURE_FORMATS;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM] = GL_COMPRESSED_RGB_S3TC_DXT1_EXT;       // GL_COMPRESSED_RGBA_S3TC_DXT1_EXT;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM_SRGB] = GL_COMPRESSED_SRGB_S3TC_DXT1_EXT; // GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC2_TYPELESS] = GL_COMPRESSED_RGBA_S3TC_DXT3_EXT;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM] = GL_COMPRESSED_RGBA_S3TC_DXT3_EXT;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM_SRGB] = GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC3_TYPELESS] = GL_COMPRESSED_RGBA_S3TC_DXT5_EXT;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM] = GL_COMPRESSED_RGBA_S3TC_DXT5_EXT;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM_SRGB] = GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC4_TYPELESS] = GL_COMPRESSED_RED_RGTC1;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC4_UNORM] = GL_COMPRESSED_RED_RGTC1;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC4_SNORM] = GL_COMPRESSED_SIGNED_RED_RGTC1;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC5_TYPELESS] = GL_COMPRESSED_RG_RGTC2;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC5_UNORM] = GL_COMPRESSED_RG_RGTC2;
// FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC5_SNORM] = GL_COMPRESSED_SIGNED_RG_RGTC2;

class NativePixelAttribs {
    constructor(pixelFormat=0, dataType=0, isCompressed=false) {
        this.pixel_format = pixelFormat;
        this.data_type = dataType;
        this.is_compressed = isCompressed;
    }
}

const FORMAT_TO_GL_PIXEL_FORMAT = []
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN] = new NativePixelAttribs();

FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_TYPELESS] = new NativePixelAttribs(gl.RGBA, gl.FLOAT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_FLOAT] = new NativePixelAttribs(gl.RGBA, gl.FLOAT)
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_UINT] = new NativePixelAttribs(gl.RGBA_INTEGER, gl.UNSIGNED_INT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_SINT] = new NativePixelAttribs(gl.RGBA_INTEGER, gl.INT);

FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGB32_TYPELESS] = new NativePixelAttribs(gl.RGB, gl.FLOAT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGB32_FLOAT] = new NativePixelAttribs(gl.RGB, gl.FLOAT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGB32_UINT] = new NativePixelAttribs(gl.RGB_INTEGER, gl.UNSIGNED_INT)
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGB32_SINT] = new NativePixelAttribs(gl.RGB_INTEGER, gl.INT);

FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_TYPELESS] = new NativePixelAttribs(gl.RGBA, gl.HALF_FLOAT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_FLOAT] = new NativePixelAttribs(gl.RGBA, gl.HALF_FLOAT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UNORM] = new NativePixelAttribs(gl.RGBA, gl.UNSIGNED_SHORT)
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UINT] = new NativePixelAttribs(gl.RGBA_INTEGER, gl.UNSIGNED_SHORT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SNORM] = new NativePixelAttribs(gl.RGBA, gl.SHORT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SINT] = new NativePixelAttribs(gl.RGBA_INTEGER, gl.SHORT);

FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RG32_TYPELESS] = new NativePixelAttribs(gl.RG, gl.FLOAT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RG32_FLOAT] = new NativePixelAttribs(gl.RG, gl.FLOAT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RG32_UINT] = new NativePixelAttribs(gl.RG, gl.UNSIGNED_INT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RG32_SINT] = new NativePixelAttribs(gl.RG, gl.INT);

FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_R32G8X24_TYPELESS] = new NativePixelAttribs(gl.DEPTH_STENCIL, gl.FLOAT_32_UNSIGNED_INT_24_8_REV);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT_S8X24_UINT] = new NativePixelAttribs(gl.DEPTH_STENCIL, gl.FLOAT_32_UNSIGNED_INT_24_8_REV);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT_X8X24_TYPELESS] = new NativePixelAttribs(gl.DEPTH_STENCIL, gl.FLOAT_32_UNSIGNED_INT_24_8_REV);

FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RG8_TYPELESS] = new NativePixelAttribs(gl.RG, gl.UNSIGNED_BYTE);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RG8_UNORM] = new NativePixelAttribs(gl.RG, gl.UNSIGNED_BYTE);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RG8_UINT] = new NativePixelAttribs(gl.RG_INTEGER, gl.UNSIGNED_BYTE);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RG8_SNORM] = new NativePixelAttribs(gl.RG, gl.BYTE);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RG8_SINT] = new NativePixelAttribs(gl.RG_INTEGER, gl.BYTE);

FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_R16_TYPELESS] = new NativePixelAttribs(gl.RED, gl.HALF_FLOAT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_R16_FLOAT] = new NativePixelAttribs(gl.RED, gl.HALF_FLOAT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_D16_UNORM] = new NativePixelAttribs(gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_R16_UINT] = new NativePixelAttribs(gl.RED_INTEGER, gl.UNSIGNED_SHORT);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_R16_SINT] = new NativePixelAttribs(gl.RED_INTEGER, gl.SHORT);

FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_R8_TYPELESS] = new NativePixelAttribs(gl.RED, gl.UNSIGNED_BYTE);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_R8_UNORM] = new NativePixelAttribs(gl.RED, gl.UNSIGNED_BYTE);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_R8_UINT] = new NativePixelAttribs(gl.RED_INTEGER, gl.UNSIGNED_BYTE);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM] = new NativePixelAttribs(gl.RED, gl.BYTE);
FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_R8_SINT] = new NativePixelAttribs(gl.RED_INTEGER, gl.BYTE);

FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGB9E5_SHAREDEXP] = new NativePixelAttribs(gl.RGB, gl.UNSIGNED_INT_5_9_9_9_REV);

function GetNativePixelTransferAttribs(format) {
    if(format>TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN && format<TEXTURE_FORMAT.TEX_FORMAT_NUM_FORMATS) {
        return FORMAT_TO_GL_PIXEL_FORMAT[format];
    } else {
        throw 'texture format is out of expected range';
    }
}

function CorrectGLTexFormat(glTexFormat, bindFlags) {
    if(bindFlags & BIND_FLAGS.BIND_DEPTH_STENCILL) {
        if(glTexFormat == gl.R32F) {
            glTexFormat = gl.DEPTH_COMPONENT32F;
        }
        // r16 => depth_component16
    }
    return glTexFormat;
}

function TexFormatToGLInternalTexFormat(textureFormat, bindFlags) {
    if(textureFormat>=TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN && textureFormat<TEXTURE_FORMAT.TEX_FORMAT_NUM_FORMATS) {
        let glFormat = FORMAT_GL_INTERNAL_FORMAT_MAP[textureFormat];
        if(bindFlags) {
            glFormat = CorrectGLTexFormat(glFormat, bindFlags);
        }
        return glFormat;
    } else {
        throw 'Texture format is out of range';
    }
}

function GetCurrentBindTexture(bindTarget) {
    let currentTexture = null;
    switch(bindTarget) {
        case gl.TEXTURE_2D:
            currentTexture = gl.getParameter(gl.TEXTURE_BINDING_2D);
            break;
        case gl.TEXTURE_3D:
            currentTexture = gl.getParameter(gl.TEXTURE_BINDING_3D);
            break;
        case gl.TEXTURE_CUBE_MAP:
            currentTexture = gl.getParameter(gl.TEXTURE_BINDING_CUBE_MAP);
            break;
        case gl.TEXTURE_BINDING_2D_ARRAY:
            currentTexture = gl.getParameter(gl.TEXTURE_BINDING_2D_ARRAY);
        default:
            break;
    }
    return currentTexture;
}

const CubeMapFaces = [
    gl.TEXTURE_CUBE_MAP_POSITIVE_X,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
    gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
    gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
]

class TextureGL extends Texture {
    constructor(renderDevice, textureDesc, textureData) {
        super(renderDevice, textureDesc);
        const deviceContext = this.render_device.GetImmediateContext();
        this.gl_texture = null;
        this.gl_renderbuffer = null;
        this.resolved_texture = null;
        this.gl_tex_format = TexFormatToGLInternalTexFormat(this.desc.format, this.desc.bind_flags);
        this.bind_target = gl.TEXTURE_2D;
        this.PBOs = [];  
        this.current_PBO = null;

        if(this.desc.sample_count<=1) {
            this.gl_texture = gl.createTexture();
        }
        if(!this.gl_tex_format) {
            throw 'unsupported texture format';
        }
        if(this.desc.usage==USAGE.USAGE_STATIC && !textureData.sub_resources.length) {
            throw 'static texture must be initialized with data at creation time';
        }

        const currentRenderBuffer = gl.getParameter(gl.RENDERBUFFER_BINDING);

        if(this.desc.sample_count > 1) {
            if(this.desc.type != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D) {
                throw 'only 2D textures support multisamples';
            }
            if(this.desc.bind_flags & BIND_FLAGS.BIND_DEPTH_STENCILL) {
                this.gl_renderbuffer = gl.createRenderbuffer();
                gl.bindRenderbuffer(gl.RENDERBUFFER, this.gl_renderbuffer);
                gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.desc.sample_count, this.gl_tex_format, this.desc.width, this.desc.height);
            } else {
                const caps = this.render_device.GetDeviceCaps();
                if(caps.multisample_rendertexture_supported) {
                    // const currentTexture = GetCurrentBindTexture(gl.TEXTURE_BINDING_2D);
                    // this.gl_texture = gl.createTexture();
                    // not supported in WebGLs
                } else {
                    this.gl_renderbuffer = gl.createRenderbuffer();
                    gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.desc.sample_count, this.gl_tex_format, this.desc.width, this.desc.height);

                    if(this.desc.misc_flag & MISC_TEXTURE_FLAGS.MISC_TEXTURE_FLAG_RESOLVE) {
                        const desc = Object.create(this.desc);
                        desc.misc_flag &= ~MISC_TEXTURE_FLAGS.MISC_TEXTURE_FLAG_RESOLVE;
                        desc.sample_count = 1;
                        
                        this.resolved_texture = new TextureGL(renderDevice, deviceContext, desc, textureData).gl_texture;
                    }
                }
            }
        } else {
            switch(this.desc.type) {
                case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D: 
                {
                    this.bind_target = gl.TEXTURE_2D;
                    const currentTexture = GetCurrentBindTexture(this.bind_target);
                    gl.bindTexture(this.bind_target, this.gl_texture);

                    const transferAttribs = FORMAT_TO_GL_PIXEL_FORMAT[this.desc.format];
                    const formatAttribs = GetTextureFormatAttribs(this.desc.format);
                    let width = this.desc.width;
                    let height = this.desc.height;
                    gl.texParameteri(this.bind_target, gl.TEXTURE_MAX_LEVEL, this.desc.mip_levels - 1);
                    for(let i=0; i<this.desc.mip_levels; i++) {
                        if(transferAttribs.is_compressed) {
                            if((width%4==0 || width==Math.max(width>>i, 1)) && (height%4==0 || height==Math.max(height>>1, i))) {
                                const blockByteInRow = Math.floor((width+formatAttribs.block_width-1) / formatAttribs.block_width)*formatAttribs.component_size;
                                gl.compressedTexImage2D(this.bind_target, i, this.gl_tex_format, width, height, 0, Math.floor((height+formatAttribs.block_height-1) / formatAttribs.block_height)*blockByteInRow, 0);
                            } else {
                                throw 'compressed texture update region must be 4 pixel align';
                            }
                        } else {
                            gl.texImage2D(this.bind_target, i, this.gl_tex_format, width, height, 0, transferAttribs.pixel_format, transferAttribs.data_type, null);
                        }
                        width = Math.max(1, width>>1);
                        height = Math.max(1, height>>1);
                    }

                    this.SetDefaultGLParameters();

                    if(textureData.sub_resources.length) {
                        if(this.desc.mip_levels == textureData.sub_resources.length) {
                            for(let i=0; i<this.desc.mip_levels; i++) {
                                const dstBox = new Box(0, Math.max(this.desc.width>>i, 1), 0, Math.max(this.desc.height>>i, 1));
                                this.UpdateData(deviceContext, i, 0, dstBox, textureData.sub_resources[i]);
                            }
                        } else {
                            throw 'incorrect number of sub_resources';
                        }
                    }

                    gl.bindTexture(this.bind_target, currentTexture);
                }
                    break;
                case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY:
                {
                    this.bind_target = gl.TEXTURE_2D_ARRAY;
                    const currentTexture = GetCurrentBindTexture(this.bind_target);
                    gl.bindTexture(this.bind_target, this.gl_texture);

                    const transferAttribs = FORMAT_TO_GL_PIXEL_FORMAT[this.desc.format];
                    const formatAttribs = GetTextureFormatAttribs(this.desc.format);
                    let width = this.desc.width;
                    let height = this.desc.height;
                    gl.texParameteri(this.bind_target, gl.TEXTURE_MAX_LEVEL, this.desc.mip_levels - 1);

                    for(let i=0; i<this.desc.mip_levels; i++) {
                        if(transferAttribs.is_compressed) {
                            if((width%4==0 || width==Math.max(width>>i, 1)) && (height%4==0 || height==Math.max(height>>1, i))) {
                                const blockByteInRow = Math.floor((width+formatAttribs.block_width-1) / formatAttribs.block_width)*formatAttribs.component_size;
                                gl.compressedTexImage3D(this.bind_target, i, this.gl_tex_format, width, height, this.desc.array_size_or_depth, 0, Math.floor((height+formatAttribs.block_height-1) / formatAttribs.block_height)*blockByteInRow*this.desc.array_size_or_depth, 0);
                            } else {
                                throw 'compressed texture update region must be 4 pixel align';
                            }
                        } else {
                            gl.texImage3D(this.bind_target, i, this.gl_tex_format, width, height, this.desc.array_size_or_depth, 0, transferAttribs.pixel_format, transferAttribs.data_type, null);
                        }
                        width = Math.max(1, width>>1);
                        height = Math.max(1, height>>1);
                    }

                    this.SetDefaultGLParameters();

                    if(textureData.sub_resources.length) {
                        if(this.desc.mip_levels*this.desc.array_size_or_depth == textureData.sub_resources.length) {
                            for(let i=0; i<this.desc.array_size_or_depth; i++) {
                                for(let j=0; j<this.desc.mip_levels; j++) {
                                    const dstBox = new Box(0, Math.max(this.desc.width>>j, 1), 0, Math.max(this.desc.height>>j, 1));
                                    this.UpdateData(deviceContext, j, i, dstBox, textureData.sub_resources[j*i+j]);
                                }
                            }
                        } else {
                            throw 'incorrect number of sub_resources';
                        }
                    }

                    gl.bindTexture(this.bind_target, currentTexture);
                }
                    break;
                case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D:
                {
                    this.bind_target = gl.TEXTURE_3D;
                    const currentTexture = GetCurrentBindTexture(this.bind_target);
                    gl.bindTexture(this.bind_target, this.gl_texture);

                    const transferAttribs = FORMAT_TO_GL_PIXEL_FORMAT[this.desc.format];
                    // const formatAttribs = GetTextureFormatAttribs(this.desc.format);
                    let width = this.desc.width;
                    let height = this.desc.height;
                    let depth = this.desc.array_size_or_depth;
                    gl.texParameteri(this.bind_target, gl.TEXTURE_MAX_LEVEL, this.desc.mip_levels - 1);

                    for(let i=0; i<this.desc.mip_levels; i++) {
                        gl.texImage3D(this.bind_target, i, this.gl_tex_format, width, height, depth, 0, transferAttribs.pixel_format, transferAttribs.data_type, 0);
                        width = Math.max(1, width>>1);
                        height = Math.max(1, height>>1);
                        depth = Math.max(1, depth>>1);
                    }

                    this.SetDefaultGLParameters();

                    if(textureData.sub_resources.length) {
                        if(this.desc.mip_levels == textureData.sub_resources.length) {
                            for(let i=0; i<this.desc.mip_levels; i++) {
                                const dstBox = new Box(0, Math.max(this.desc.width>>i, 1), 0, Math.max(this.desc.height>>i, 1), 0, Math.max(this.desc.depth>>i, 1));
                                this.UpdateData(deviceContext, i, 0, dstBox, textureData.sub_resources[i]);
                            }
                        } else {
                            throw 'incorrect number of sub_resources';
                        }
                    }

                    gl.bindTexture(this.bind_target, currentTexture);
                }
                    break;
                case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE:
                {
                    this.bind_target = gl.TEXTURE_CUBE_MAP;
                    const currentTexture = GetCurrentBindTexture(this.bind_target);
                    if(this.desc.array_size_or_depth != 6) {
                        throw 'cubemap texture is expected to have 6 slices';
                    }
                    gl.bindTexture(this.bind_target, this.gl_texture);

                    const transferAttribs = FORMAT_TO_GL_PIXEL_FORMAT[this.desc.format];
                    const formatAttribs = GetTextureFormatAttribs(this.desc.format);
                    let width = this.desc.width;
                    let height = this.desc.height;
                    gl.texParameteri(this.bind_target, gl.TEXTURE_MAX_LEVEL, this.desc.mip_levels - 1);

                    for(let i=0; i<this.desc.mip_levels; i++) {
                        for(let face=0; face<6; face++) {
                            if(transferAttribs.is_compressed) {
                                if((width%4==0 || width==Math.max(width>>i, 1)) && (height%4==0 || height==Math.max(height>>1, i))) {
                                    const blockByteInRow = Math.floor((width+formatAttribs.block_width-1) / formatAttribs.block_width)*formatAttribs.component_size;
                                    gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X+face, i, this.gl_tex_format, width, height, 0, Math.floor((height+formatAttribs.block_height-1) / formatAttribs.block_height)*blockByteInRow, 0);
                                } else {
                                    throw 'compressed texture update region must be 4 pixel align';
                                }
                            } else {
                                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X+face, i, this.gl_tex_format, width, height, 0, transferAttribs.pixel_format, transferAttribs.data_type, null);
                            }
                        }
                        width = Math.max(1, width>>1);
                        height = Math.max(1, height>>1);
                    }

                    this.SetDefaultGLParameters();

                    if(textureData.sub_resources.length) {
                        if(this.desc.mip_levels*this.desc.array_size_or_depth == textureData.sub_resources.length) {
                            for(let i=0; i<this.desc.array_size_or_depth; i++) {
                                for(let j=0; j<this.desc.mip_levels; j++) {
                                    const dstBox = new Box(0, Math.max(this.desc.width>>j, 1), 0, Math.max(this.desc.height>>j, 1));
                                    this.UpdateData(deviceContext, j, i, dstBox, textureData.sub_resources[j*i+j]);
                                }
                            }
                        } else {
                            throw 'incorrect number of sub_resources';
                        }
                    }

                    gl.bindTexture(this.bind_target, currentTexture);
                }
                    break;
                // not supported in WebGL
                // case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY:
                // {
                // }
                //     break;
                default:
                    break;
            }
        }

        gl.bindRenderbuffer(gl.RENDERBUFFER, currentRenderBuffer);
    }

    GetGLTexture() { return this.gl_texture; }
    GetBindTarget() { return this.bind_target; }

    Release() {
        if(this.gl_texture) {
            gl.deleteTexture(this.gl_texture);
        }
        if(this.gl_renderbuffer) {
            gl.deleteRenderbuffer(this.gl_renderbuffer);
        }
        if(this.resolved_texture) {
            gl.deleteTexture(this.resolved_texture);
        }
    }

    SetDefaultGLParameters() {
        // The default value of GL_TEXTURE_MIN_FILTER is GL_NEAREST_MIPMAP_LINEAR
        // Reset it to GL_NEAREST to avoid incompletness issues with integer textures
        gl.texParameteri(this.bind_target, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

        // The default value of GL_TEXTURE_MAG_FILTER is GL_LINEAR
        gl.texParameteri(this.bind_target, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }

    CreateViewInternal(viewDesc) {
        viewDesc = this.CorrectTextureViewDesc(viewDesc);
        const viewGLFormat = CorrectGLTexFormat(FORMAT_GL_INTERNAL_FORMAT_MAP[viewDesc.format], this.desc.bind_flags);
        if(viewGLFormat == 0) {
            throw 'unsupported texture format';
        }

        let view;
        if(viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE) {
            const isFullTextureView = 
                viewDesc.texture_dim == this.desc.type &&
                viewDesc.format == GetViewFormat(this.desc.format, viewDesc.view_type, this.desc.bind_flags) &&
                viewDesc.most_detailed_mip == 0 &&
                viewDesc.num_mip_levels == this.desc.mip_levels &&
                viewDesc.first_array_or_depth_slice == 0 &&
                viewDesc.num_array_or_depth_slice == this.desc.array_size_or_depth;
            view = new TextureViewGL(this.render_device, viewDesc, 
                        ((this.desc.misc_flag&MISC_TEXTURE_FLAGS.MISC_TEXTURE_FLAG_RESOLVE) && !this.render_device.GetDeviceCaps().multisample_rendertexture_supported) ? this.resolved_texture : this, !isFullTextureView);
            
            if(!isFullTextureView) {
                let glViewTarget = 0;
                switch(viewDesc.texture_dim) {
                    case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D:
                        glViewTarget = gl.TEXTURE_2D;
                        break;
                    case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY:
                        glViewTarget = gl.TEXTURE_2D_ARRAY;
                        break;
                    case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D:
                        glViewTarget = gl.TEXTURE_3D;
                        break;
                    case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE:
                        glViewTarget = gl.TEXTURE_CUBE_MAP;
                        break;
                    // case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY:
                    default:
                        throw 'unexpected texture view type';
                }
                view.SetBindTarget(glViewTarget);
            }
        } else if(viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_UNORDERED_ACCESS) {
            if(!(viewDesc.num_array_or_depth_slice == 1 
                || (this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D && viewDesc.num_array_or_depth_slice == Math.max(viewDesc.most_detailed_mip, 1))
                || viewDesc.num_array_or_depth_slice == this.desc.array_size_or_depth))
            {
                throw 'only single array/depth slice or the whole texture can be bound as UAV';
            }
            if(viewDesc.access_flag == 0) {
                throw 'at least one access flag must be specified';
            }
            view = new TextureViewGL(this.render_device, viewDesc, this, false);
        } else if(viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET) {
            if(viewDesc.um_mip_levels != 1) {
                throw 'only single mipmap can be bound as RTV';
            }
            view = new TextureViewGL(this.render_device, viewDesc, this, false);
        } else if(viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_DEPTH_STENCIL) {
            if(viewDesc.um_mip_levels != 1) {
                throw 'only single mipmap can be bound as DSV';
            }
            view = new TextureViewGL(this.render_device, viewDesc, this, false);
        }

        return view;
    }

    UpdateData(deviceContext, mipLevel, slice, dstBox, subResData) {
        super.UpdateData(deviceContext, mipLevel, slice, dstBox, subResData);

        const currentTexture = GetCurrentBindTexture(this.bind_target);
        switch(this.desc.type) {
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D:
            {
                gl.bindTexture(this.bind_target, this.gl_texture);
                let unpackBuffer = null;
                if(subResData.src_buffer) {
                    unpackBuffer = subResData.src_buffer.GetGLBuffer();
                }

                // Transfers to OpenGL memory are called unpack operations
                // If there is a buffer bound to GL_PIXEL_UNPACK_BUFFER target, then all the pixel transfer
                // operations will be performed from this buffer.
                gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, unpackBuffer);

                const transferAttribs = GetNativePixelTransferAttribs(this.desc.format);
                
                gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);

                if(transferAttribs.is_compressed) {
                    if((!(dstBox.min_x%4==0 && dstBox.min_y%4==0) ||
                        (dstBox.max_x%4==0 || dstBox.max_x==Math.max(this.desc.width>>mipLevel, 1)) ||
                        (dstBox.max_y%4==0 || dstBox.max_y==Math.max(this.desc.height>>mipLevel, 1))))
                    {
                        throw 'compressed texture update region must be 4-pixel aligned';
                    }
                    const fmtAttribs = GetTextureFormatAttribs(this.desc.format);
                    const blockBytesInRow = (dstBox.max_x-dstBox.min_x+3)/4 * fmtAttribs.component_size;
                    if(subResData.stride != blockBytesInRow) {
                        throw 'compressed data stride must match the size of a row of compressed block';
                    }
                    gl.compressedTexSubImage2D(this.bind_target, 
                                                mipLevel, 
                                                dstBox.min_x, 
                                                dstBox.min_y, 
                                                dstBox.max_x-dstBox.min_x, 
                                                dstBox.max_y-dstBox.min_y, 
                                                this.gl_tex_format,
                                                (dstBox.max_y-dstBox.min_y+3)/4*subResData.stride,
                                                subResData.data);
                } else {
                    const texFormatAttribs = GetTextureFormatAttribs(this.desc.format);
                    const pixelSize = texFormatAttribs.component_size * texFormatAttribs.num_components;
                    if(subResData.stride % pixelSize != 0) {
                        throw 'data stride is not multiple of pixelSize';
                    }
                    gl.pixelStorei(gl.UNPACK_ROW_LENGTH, subResData.stride / pixelSize);
                    gl.pixelStorei(gl.UNPACK_SKIP_PIXELS, 0);
                    gl.pixelStorei(gl.UNPACK_SKIP_ROWS, 0);

                    gl.texSubImage2D(this.bind_target, mipLevel, 
                                    dstBox.min_x, 
                                    dstBox.min_y, 
                                    dstBox.max_x-dstBox.min_x, 
                                    dstBox.max_y-dstBox.min_y, 
                                    transferAttribs.pixel_format, 
                                    transferAttribs.data_type, 
                                    subResData.data);
                }
                if(unpackBuffer) {
                    gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, null);
                }
            }
            break;
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY:
            {
                gl.bindTexture(this.bind_target, this.gl_texture);
                let unpackBuffer = null;
                if(subResData.src_buffer) {
                    unpackBuffer = subResData.src_buffer.GetGLBuffer();
                }

                gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, unpackBuffer);

                const transferAttribs = GetNativePixelTransferAttribs(this.desc.format);
                gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);

                if(transferAttribs.is_compressed) {
                    if((!(dstBox.min_x%4==0 && dstBox.min_y%4==0) ||
                        (dstBox.max_x%4==0 || dstBox.max_x==Math.max(this.desc.width>>mipLevel, 1)) ||
                        (dstBox.max_y%4==0 || dstBox.max_y==Math.max(this.desc.height>>mipLevel, 1))))
                    {
                        throw 'compressed texture update region must be 4-pixel aligned';
                    }
                    const fmtAttribs = GetTextureFormatAttribs(this.desc.format);
                    const blockBytesInRow = (dstBox.max_x-dstBox.min_x+3)/4 * fmtAttribs.component_size;
                    if(subResData.stride != blockBytesInRow) {
                        throw 'compressed data stride must match the size of a row of compressed block';
                    }
                    gl.compressedTexSubImage3D(this.bind_target, mipLevel, 
                                                dstBox.min_x, 
                                                dstBox.min_y, 
                                                slice,
                                                dstBox.max_x-dstBox.min_x, 
                                                dstBox.max_y-dstBox.min_y, 
                                                1,
                                                this.gl_tex_format,
                                                (dstBox.max_y-dstBox.min_y+3)/4*subResData.stride,
                                                subResData.data);
                } else {
                    const texFormatAttribs = GetTextureFormatAttribs(this.desc.format);
                    const pixelSize = texFormatAttribs.component_size * texFormatAttribs.num_components;
                    if(subResData.stride % pixelSize != 0) {
                        throw 'data stride is not multiple of pixelSize';
                    }
                    gl.pixelStorei(gl.UNPACK_ROW_LENGTH, subResData.stride / pixelSize);
                    gl.pixelStorei(gl.UNPACK_SKIP_PIXELS, 0);
                    gl.pixelStorei(gl.UNPACK_SKIP_ROWS, 0);

                    gl.texSubImage3D(this.bind_target, mipLevel, 
                                    dstBox.min_x, 
                                    dstBox.min_y, 
                                    slice,
                                    dstBox.max_x-dstBox.min_x, 
                                    dstBox.max_y-dstBox.min_y, 
                                    1,
                                    transferAttribs.pixel_format, 
                                    transferAttribs.data_type, 
                                    subResData.data);
                }

                if(unpackBuffer) {
                    gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, null);
                }
            }
            break;
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D:
            {
                gl.bindTexture(this.bind_target, this.gl_texture);
                let unpackBuffer = null;
                if(subResData.src_buffer) {
                    unpackBuffer = subResData.src_buffer.GetGLBuffer();
                }

                gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, unpackBuffer);
                const transferAttribs = GetNativePixelTransferAttribs(this.desc.format);

                gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
                gl.pixelStorei(gl.UNPACK_SKIP_PIXELS, 0);
                gl.pixelStorei(gl.UNPACK_SKIP_ROWS, 0);
                gl.pixelStorei(gl.UNPACK_SKIP_IMAGES, 0);

                
                const texFormatAttribs = GetTextureFormatAttribs(this.desc.format);
                const pixelSize = texFormatAttribs.component_size * texFormatAttribs.num_components;
                if(subResData.stride % pixelSize != 0) {
                    throw 'data stride is not multiple of pixelSize';
                }
                gl.pixelStorei(gl.UNPACK_ROW_LENGTH, subResData.stride / pixelSize);
                

                gl.texSubImage3D(this.bind_target, mipLevel, 
                                dstBox.min_x, 
                                dstBox.min_y, 
                                slice,
                                dstBox.max_x-dstBox.min_x, 
                                dstBox.max_y-dstBox.min_y, 
                                1,
                                transferAttribs.pixel_format, 
                                transferAttribs.data_type, 
                                subResData.data);

                if(unpackBuffer) {
                    gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, null);
                }
            }
            break;
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE:
            {
                gl.bindTexture(this.bind_target, this.gl_texture);

                const cubemapFaceBindTarget = CubeMapFaces[slice];

                let unpackBuffer = null;
                if(subResData.src_buffer) {
                    unpackBuffer = subResData.src_buffer.GetGLBuffer();
                }
                gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, unpackBuffer);

                const transferAttribs = GetNativePixelTransferAttribs(this.desc.format);
                gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);

                if(transferAttribs.is_compressed) {
                    if((!(dstBox.min_x%4==0 && dstBox.min_y%4==0) ||
                        (dstBox.max_x%4==0 || dstBox.max_x==Math.max(this.desc.width>>mipLevel, 1)) ||
                        (dstBox.max_y%4==0 || dstBox.max_y==Math.max(this.desc.height>>mipLevel, 1))))
                    {
                        throw 'compressed texture update region must be 4-pixel aligned';
                    }
                    const fmtAttribs = GetTextureFormatAttribs(this.desc.format);
                    const blockBytesInRow = (dstBox.max_x-dstBox.min_x+3)/4 * fmtAttribs.component_size;
                    if(subResData.stride != blockBytesInRow) {
                        throw 'compressed data stride must match the size of a row of compressed block';
                    }
                    gl.compressedTexSubImage2D(CubeMapFaceBindTarget, mipLevel, 
                                                dstBox.min_x, 
                                                dstBox.min_y,
                                                dstBox.max_x-dstBox.min_x, 
                                                dstBox.max_y-dstBox.min_y, 
                                                this.gl_tex_format,
                                                (dstBox.max_y-dstBox.min_y+3)/4*subResData.stride,
                                                subResData.data);
                } else {
                    const texFormatAttribs = GetTextureFormatAttribs(this.desc.format);
                    const pixelSize = texFormatAttribs.component_size * texFormatAttribs.num_components;
                    if(subResData.stride % pixelSize != 0) {
                        throw 'data stride is not multiple of pixelSize';
                    }
                    gl.pixelStorei(gl.UNPACK_ROW_LENGTH, subResData.stride / pixelSize);
                    gl.pixelStorei(gl.UNPACK_SKIP_PIXELS, 0);
                    gl.pixelStorei(gl.UNPACK_SKIP_ROWS, 0);

                    gl.texSubImage2D(CubeMapFaceBindTarget, mipLevel, 
                                    dstBox.min_x, 
                                    dstBox.min_y, 
                                    dstBox.max_x-dstBox.min_x, 
                                    dstBox.max_y-dstBox.min_y, 
                                    transferAttribs.pixel_format, 
                                    transferAttribs.data_type, 
                                    subResData.data);
                }
            }
            break;
            default:
                break;
        }

        gl.bindTexture(this.bind_target, currentTexture);
        gl.pixelStorei(gl.UNPACK_ROW_LENGTH, 0)
    }

    CopyData(deviceContext, srcTexture, srcMipLevel, srcSlice, srcBox, 
        dstMipLevel, dstSlice, dstX, dstY, dstZ) 
    {
        super.CopyData(deviceContext, srcTexture, srcMipLevel, srcSlice, srcBox, 
            dstMipLevel, dstSlice, dstX, dstY, dstZ);
        
        const srcTextureDesc = srcTexture.GetDesc();

        if(!srcBox) {
            srcBox = new Box();
            srcBox. max_x = Math.max(srcTextureDesc.width >> srcMipLevel, 1);
            srcBox.max_y = Math.max(srcTextureDesc.height >> srcMipLevel, 1);

            if(srcTextureDesc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
                srcBox.max_z = Math.max(srcTextureDesc.array_size_or_depth >> srcMipLevel, 1);
            } else {
                srcBox.max_z = 1;
            }
        }
        
        if(this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D) {
            // this.render_device.GetImmediateContext()
        } else {
            throw 'WebGL texture copy not supported';
        }
    }

    AttachToFramebuffer(viewDesc, attachmentPoint) {
        switch(this.desc.type) {
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D:
            {
                if(this.desc.sample_count>=2) {
                    if(attachmentPoint == gl.DEPTH_STENCIL_ATTACHMENT || attachmentPoint == gl.DEPTH_ATTACHMENT) {
                        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachmentPoint, gl.RENDERBUFFER, this.gl_renderbuffer);
                    } else {
                        if(this.render_device.GetDeviceCaps().multisample_rendertexture_supported && viewDesc.format) {
                            // not supported in WebGL
                        } else {
                            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachmentPoint, gl.RENDERBUFFER, this.gl_renderbuffer);
                        }
                    }
                } else {
                    gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, attachmentPoint, this.bind_target, this.gl_texture, viewDesc.most_detailed_mip);
                    gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, attachmentPoint, this.bind_target, this.gl_texture, viewDesc.most_detailed_mip);
                }
                break;
            }
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY:
            {
                if(viewDesc.num_array_or_depth_slice == this.desc.array_size_or_depth) {
                    throw 'Render target not support entire 2D Array Texture';
                } else if(viewDesc.num_array_or_depth_slice == 1) {
                    gl.framebufferTextureLayer(gl.DRAW_FRAMEBUFFER, attachmentPoint, this.gl_texture, viewDesc.most_detailed_mip, viewDesc.first_array_or_depth_slice);
                    gl.framebufferTextureLayer(gl.READ_FRAMEBUFFER, attachmentPoint, this.gl_texture, viewDesc.most_detailed_mip, viewDesc.first_array_or_depth_slice);
                } else {
                    throw 'Only one slice or the entire texture array can be attached to a framebuffer';
                }
                break;
            }
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D:
            {
                const numDepthSlicesInMip = this.desc.array_size_or_depth >> viewDesc.most_detailed_mip;
                if(viewDesc.num_array_or_depth_slice == numDepthSlicesInMip) {
                    throw 'Render target not support entire 3D Array Texture';
                } else if(viewDesc.num_array_or_depth_slice == 1) {
                    gl.framebufferTextureLayer(gl.DRAW_FRAMEBUFFER, attachmentPoint, this.gl_texture, viewDesc.most_detailed_mip, viewDesc.first_array_or_depth_slice);
                    gl.framebufferTextureLayer(gl.READ_FRAMEBUFFER, attachmentPoint, this.gl_texture, viewDesc.most_detailed_mip, viewDesc.first_array_or_depth_slice);
                } else {
                    throw 'Only one slice or the entire 3D texture can be attached to a framebuffer';
                }
                break;
            }
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE:
            {
                if(viewDesc.num_array_or_depth_slice == this.desc.array_size_or_depth) {
                    throw 'Render Target not support entire Cube Array Texture';
                } else if(viewDesc.num_array_or_depth_slice == 1) {
                    const cubemapFaceBindTarget = CubeMapFaces[viewDesc.first_array_or_depth_slice];

                    gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, attachmentPoint, cubemapFaceBindTarget, this.gl_texture, viewDesc.most_detailed_mip);
                    gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, attachmentPoint, cubemapFaceBindTarget, this.gl_texture, viewDesc.most_detailed_mip);
                } else {
                    throw 'Only one slice or the entire Cube Array texture can be attached to a framebuffer'
                }
                break;
            }
            case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY:
            {
                gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, attachmentPoint, this.bind_target, this.gl_texture, viewDesc.most_detailed_mip);
                gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, attachmentPoint, this.bind_target, this.gl_texture, viewDesc.most_detailed_mip);
                break;
            }
            default:
                break;
        }
    }

    ReadPixels(deviceContext, isHDR) { 
        
    }
} 

export {
    TextureGL,
}
