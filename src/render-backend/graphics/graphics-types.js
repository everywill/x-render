const COMPARISON_FUNCTION = {
    COMPARISON_FUNC_UNKNOWN: 0,
    // never pass
    COMPARISON_FUNC_NEVER: 1,  // OpenGL: GL_NEVER
    // pass if less than destination data
    COMPARISON_FUNC_LESS: 2,  // OpenGL: GL_LESS
    // pass if equal
    COMPARISON_FUNC_EQUAL: 3,   // OpenGL: GL_EQUAL
    COMPARISON_FUNC_LESS_EQUAL: 4,  // OpenGL: GL_LEQUAL
    COMPARISON_FUNC_GREATER: 5,  // OpenGL: GL_GREATER
    COMPARISON_FUNC_NOT_EQUAL: 6,  // OpenGL: GL_NOTEQUAL
    COMPARISON_FUNC_GREATER_EQUAL: 7, // OpenGL: GL_GEQUAL
    COMPARISON_FUNC_ALWAYS: 8,  // OpenGL: GL_ALWAYS
    COMPARISON_FUNC_NUM_FUNCTIONS: 9
};

const PRIMITIVE_TOPOLOGY = {
    PRIMITIVE_TOPOLOGY_UNDEFINED: 0,
    PRIMITIVE_TOPOLOGY_TRIANGLE_LIST: 1,  // OpenGL: GL_TRIANGLES
    PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP: 2, // OpenGL: GL_TRIANGLE_STRIP
    PRIMITIVE_TOPOLOGY_POINT_LIST: 3,  // OpenGL: GL_POINTS
    PRIMITIVE_TOPOLOGY_LINE_LIST: 4,   // OpenGL: GL_LINES
    PRIMITIVE_TOPOLOGY_LINE_STRIP: 5,  // OpenGL: GL_LINE_STRIP
    // used in GS
    PRIMITIVE_TOPOLOGY_TRIANGLE_LIST_ADJ: 6,  // OpenGL: GL_TRIANGLES_ADJACENCY
    PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP_ADJ: 7,  // OpenGL: GL_TRIANGLE_STRIP_ADJACENCY
    RIMITIVE_TOPOLOGY_LINE_LIST_ADJ: 8,  // OpenGL: GL_LINES_ADJACENCY
    PRIMITIVE_TOPOLOGY_LINE_STRIP_ADJ: 9,  // OpenGL: GL_LINE_STRIP_ADJACENCY
    // 0~31 
    // PRIMITIVE_TOPOLOGY_1_CONTROL_POINT_PATCHLIST:   GL_PATCHES
}; 

const VALUE_TYPE = {
    // Undefined type
    VT_UNDEFINED: 0,
    // Signed 8-bit integer
    VT_INT8: 1,
    // Signed 16-bit integer       
    VT_INT16: 2,     
    // Signed 32-bit integer    
    VT_INT32: 3,
    // Unsigned 8-bit integer
    VT_UINT8: 4,     
    // Unsigned 16-bit integer    
    VT_UINT16: 5,
    // Unsigned 32-bit integer      
    VT_UINT32: 6,
    // Half-precision 16-bit floating point
    VT_FLOAT16: 7,
    // Full-precision 32-bit floating point
    VT_FLOAT32: 8,
    // VT_FLOAT64: 9,       ///< Double-precision 64-bit floating point
    VT_NUM_TYPES: 9     
}

const TEXTURE_FORMAT = {
    TEX_FORMAT_UNKNOWN: 0,
    // four-component 128-bit typeless format with 32-bit channels
    // designate fotmat when creating SRV
    TEX_FORMAT_RGBA32_TYPELESS: 1,  // OpenGL has no direct counterpart, use GL_RGBA32F
    // four-component 128-bit floating-point format with 32-bit channels
    TEX_FORMAT_RGBA32_FLOAT: 2,  // OpenGL: GL_RGBA32F
    // four-component 128-bit unsigned-integer format with 32-bit channels.
    TEX_FORMAT_RGBA32_UINT: 3,  // OpenGL: GL_RGBA32UI
    // four-component 128-bit signed-integer format with 32-bit channels.
    TEX_FORMAT_RGBA32_SINT: 4,  // OpenGL: GL_RGBA32I
    // three-component 96-bit typeless format with 32-bit channels.
    TEX_FORMAT_RGB32_TYPELESS: 5,  // OpenGL has no direct counterpart, use GL_RGB32F
    // three-component 96-bit floating-point format with 32-bit channels.
    TEX_FORMAT_RGB32_FLOAT: 6,  // OpenGL: GL_RGB32F
    // three-component 96-bit floating-point format with 32-bit channels
    TEX_FORMAT_RGB32_UINT: 7,  // OpenGL: GL_RGB32UI
    // four-component 96-bit signed-integer format with 32-bit channels.
    TEX_FORMAT_RGB32_SINT: 8,  // OpenGL: GL_RGB32I
    // four-component 64-bit typeless format with 16-bit channels.
    TEX_FORMAT_RGBA16_TYPELESS: 9, // OpenGL has no direct counterpart, use GL_RGBA16F
    // four-component 64-bit floating-point format with 16-bit channels.
    TEX_FORMAT_RGBA16_FLOAT: 10,  // OpenGL: GL_RGBA16F
    // four-component 64-bit unsigned-normalized-integer format with 16-bit channels.
    TEX_FORMAT_RGBA16_UNORM: 11,  // OpenGL: GL_RGBA16; extension [GL_EXT_texture_norm16] is required
    // four-component 64-bit unsigned-integer format with 16-bit channels
    TEX_FORMAT_RGBA32_UINT: 12,  // OpenGL: GL_RGBA16UI
    // four-component 64-bit signed-normalized-integer format with 16-bit channels.
    TEX_FORMAT_RGB32_SNORM: 13,  // OpenGL: GL_RGBA16_SNORM; extension [GL_EXT_texture_norm16] is required
    // four-component 64-bit signed-integer format with 16-bit channels.
    TEX_FORMAT_RGB32_SINT: 14,  // OpenGL: GL_RGBA16I
    // two-component 64-bit typeless format with 32-bit channels.
    TEX_FORMAT_RG32_TYPELESS: 15,  // OpenGL has no direct counterpart, use GL_RG32F
    // two-component 64-bit floating-point format with 32-bit channels.
    TEX_FORMAT_RG32_FLOAT: 16,  // OpenGL: GL_RG32F
    // two-component 64-bit unsigned-integer format with 32-bit channels.
    TEX_FORMAT_RG32_UINT: 17, // OpenGL: GL_RG32UI
    // Two-component 64-bit signed-integer format with 32-bit channels.
    TEX_FORMAT_RG32_SINT: 18,  // OpenGL: GL_RG32I
    // two-component 64-bit typeless format with 32-bits for R channel and 8 bits for G channel.
    TEX_FORMAT_R32G8X24_TYPELESS: 19,  // OpenGL has no direct counterpart, use GL_DEPTH32F_STENCIL8 
    // two-component 64-bit format with 32-bit floating-point depth channel and 8-bit stencil channel.
    TEX_FORMAT_D32_FLOAT_S8X24_UINT: 20,  // OpenGL: GL_DEPTH32F_STENCIL8 
    // two-component 64-bit format with 32-bit floating-point R channel and 8+24-bits of typeless data.
    TEX_FORMAT_R32_FLOAT_X8X24_TYPELESS: 21,  // OpenGL has no direct counterpart, use GL_DEPTH32F_STENCIL8 
    // two-component 64-bit format with 32-bit typeless data and 8-bit G channel. 
    // TEX_FORMAT_X32_TYPELESS_G8X24_UINT,  not supported in OpenGL
    // four-component 32-bit typeless format with 10 bits for RGB and 2 bits for alpha channel.
    TEX_FORMAT_RGB10A2_TYPELESS: 22,  // OpenGL has no direct counterpart, use GL_RGB10_A2 (is normalized)
    // four-component 32-bit unsigned-normalized-integer format with 10 bits for each color and 2 bits for alpha channel.
    TEX_FORMAT_RGB10A2_UNORM: 23,  // OpenGL: GL_RGB10_A2
    // four-component 32-bit unsigned-integer format with 10 bits for each color and 2 bits for alpha channel.
    TEX_FORMAT_RGB10A2_UINT: 24,  // OpenGL: GL_RGB10_A2UI
    // three-component 32-bit format encoding three partial precision channels using 11 bits for red and green and 10 bits for blue channel. \n
    TEX_FORMAT_R11G11B10_FLOAT: 25,  // OpenGL: GL_R11F_G11F_B10F
    // four-component 32-bit typeless format with 8-bit channels.
    TEX_FORMAT_RGBA8_TYPELESS: 26,  // OpenGL has no direct counterpart, use GL_RGBA8
    // four-component 32-bit unsigned-normalized-integer format with 8-bit channels.
    TEX_FORMAT_RGBA8_UNORM: 27,  // OpenGL: GL_RGBA8
    // four-component 32-bit unsigned-normalized-integer sRGB format with 8-bit channels.
    TEX_FORMAT_RGBA8_UNORM_SRGB: 28,  // OpenGL: GL_SRGB8_ALPHA8
    // four-component 32-bit unsigned-integer format with 8-bit channels.
    TEX_FORMAT_RGBA8_UINT: 29,  // OpenGL: GL_RGBA8UI
    // four-component 32-bit signed-normalized-integer format with 8-bit channels. 
    TEX_FORMAT_RGBA8_SNORM: 30,  // OpenGL: GL_RGBA8_SNORM
    // four-component 32-bit signed-integer format with 8-bit channels.
    TEX_FORMAT_RGBA8_SINT: 31,  // OpenGL: GL_RGBA8I
    // two-component 32-bit typeless format with 16-bit channels.
    TEX_FORMAT_RG16_TYPELESS: 32,  // OpenGL has no direct counterpart, use GL_RG16F
    // two-component 32-bit half-precision floating-point format with 16-bit channels.
    TEX_FORMAT_RG16_FLOAT: 33,  // OpenGL: GL_RG16F
    // two-component 32-bit unsigned-normalized-integer format with 16-bit channels.
    TEX_FORMAT_RG16_UNORM: 34,  // OpenGL: GL_RG16, extension [GL_EXT_texture_norm16] is required 
    // two-component 32-bit unsigned-integer format with 16-bit channels.
    TEX_FORMAT_RG16_UINT: 35,  // OpenGL: GL_RG16UI
    // two-component 32-bit signed-normalized-integer format with 16-bit channels.
    TEX_FORMAT_RG16_SNORM: 36,  // OpenGL: GL_RG16_SNORM, extension [GL_EXT_texture_norm16] is required 
    // two-component 32-bit signed-integer format with 16-bit channels.
    TEX_FORMAT_RG16_SINT: 37,  // OpenGL: GL_RG16I
    // single-component 32-bit typeless format.
    TEX_FORMAT_R32_TYPELESS: 38,  // OpenGL has no direct counterpart, use GL_R32F
    // single-component 32-bit floating-point depth format.
    TEX_FORMAT_D32_FLOAT: 39,  // OpenGL: GL_DEPTH_COMPONENT32F
    // single-component 32-bit floating-point format.
    TEX_FORMAT_R32_FLOAT: 40,  // OpenGL: GL_R32F
    // single-component 32-bit unsigned-integer format.
    TEX_FORMAT_R32_UINT: 41,  // OpenGL: GL_R32UI
    // single-component 32-bit signed-integer format.
    TEX_FORMAT_R32_SINT: 42,  // OpenGL: GL_R32I
    // two-component 32-bit typeless format with 24 bits for R and 8 bits for G channel.
    TEX_FORMAT_R24G8_TYPELESS: 43,  // OpenGL has no direct counterpart, use GL_DEPTH24_STENCIL8
    // two-component 32-bit format with 24 bits for unsigned-normalized-integer depth and 8 bits for stencil.
    TEX_FORMAT_D24_UNORM_S8_UINT: 44,  // OpenGL: GL_DEPTH24_STENCIL8
    // two-component 32-bit format with 24 bits for unsigned-normalized-integer data and 8 bits of unreferenced data.
    TEX_FORMAT_R24_UNORM_X8_TYPELESS: 45,  // OpenGL has no direct counterpart, use GL_DEPTH24_STENCIL8
    // two-component 32-bit format with 24 bits of unreferenced data and 8 bits of unsigned-integer data.
    // TEX_FORMAT_X24_TYPELESS_G8_UINT, not supported inn OpenGL
    // two-component 16-bit typeless format with 8-bit channels.
    TEX_FORMAT_RG8_TYPELESS: 46,  // OpenGL has no direct counterpart, use GL_RG8
    // two-component 16-bit unsigned-normalized-integer format with 8-bit channels.
    TEX_FORMAT_RG8_UNORM: 47,  // OpenGL: GL_RG8
    // two-component 16-bit unsigned-integer format with 8-bit channels.
    TEX_FORMAT_RG8_UINT: 48,  // OpenGL: GL_RG8UI
    // two-component 16-bit signed-normalized-integer format with 8-bit channels.
    TEX_FORMAT_RG8_SNORM: 49,  // OpenGL: GL_RG8_SNORM
    // two-component 16-bit signed-integer format with 8-bit channels.
    TEX_FORMAT_RG8_SINT: 50,  // OpenGL: GL_RG8I
    // single-component 16-bit typeless format.
    TEX_FORMAT_R16_TYPELESS: 51,  // OpenGL has no direct counterpart, use GL_R16F
    // single-component 16-bit half-precision floating-point format.
    TEX_FORMAT_R16_FLOAT: 52,  // OpenGL: GL_R16F
    // single-component 16-bit unsigned-normalized-integer depth format. 
    TEX_FORMAT_D16_UNORM: 53, // OpenGL: GL_DEPTH_COMPONENT16
    // single-component 16-bit unsigned-normalized-integer format.
    TEX_FORMAT_R16_UNORM: 54,  // OpenGL: GL_R16; extension [GL_EXT_texture_norm16] is required
    // single-component 16-bit unsigned-integer format.
    TEX_FORMAT_R16_UINT: 55,  // OpenGL: GL_R16UI
    // single-component 16-bit signed-normalized-integer format.
    TEX_FORMAT_R16_SNORM: 56,  // OpenGL: GL_R16_SNORM; extension [GL_EXT_texture_norm16] is required
    // single-component 16-bit signed-integer format.
    TEX_FORMAT_R16_SINT: 57,  // OpenGL: GL_R16I
    // single-component 8-bit typeless format.
    TEX_FORMAT_R8_TYPELESS: 58,  // OpenGL has no direct counterpart, use GL_R8
    // single-component 8-bit unsigned-normalized-integer format.
    TEX_FORMAT_R8_UNORM: 59,  // OpenGL: GL_R8
    // single-component 8-bit unsigned-integer format.
    TEX_FORMAT_R8_UINT: 60,  // OpenGL: GL_R8UI
    // single-component 8-bit signed-normalized-integer format.
    TEX_FORMAT_R8_SNORM: 61,  // OpenGL: GL_R8_SNORM
    // single-component 8-bit signed-integer format.
    TEX_FORMAT_R8_SINT: 62,  // OpenGL: GL_R8I
    // single-component 8-bit unsigned-normalized-integer format for alpha only.
    // TEX_FORMAT_A8_UNORM, not supported in OpenGL
    // single-component 1-bit format. \n
    // TEX_FORMAT_R1_UNORM,  not supported in OpenGL
    // three partial-precision floating pointer numbers sharing single exponent encoded into a 32-bit value.
    TEX_FORMAT_RGB9E5_SHAREDEXP: 63,  // OpenGL: GL_RGB9_E5
    // four-component unsigned-normalized integer format analogous to UYVY encoding.
    // TEX_FORMAT_RG8_B8G8_UNORM, not supported in OpenGL
    // four-component unsigned-normalized integer format analogous to YUY2 encoding.
    // TEX_FORMAT_G8R8_G8B8_UNORM, not supported in OpenGL

    // four-component typeless block-compression format with 1:8 compression ratio.
    TEX_FORMAT_BC1_TYPELESS: 64, // OpenGL have no direct counterpart, use GL_COMPRESSED_RGB_S3TC_DXT1_EXT; extension [GL_EXT_texture_compression_s3tc] is required
    // four-component unsigned-normalized-integer block-compression format with 5 bits for R, 6 bits for G, 5 bits for B, and 0 or 1 bit for A channel.
    // the pixel data is encoded using 8 bytes per 4x4 block (4 bits per pixel) providing 1:8 compression ratio against RGBA8 format.
    TEX_FORMAT_BC1_UNORM: 65,  // OpenGL: GL_COMPRESSED_RGB_S3TC_DXT1_EXT; extension [GL_EXT_texture_compression_s3tc] is required
    // four-component unsigned-normalized-integer block-compression sRGB format with 5 bits for R, 6 bits for G, 5 bits for B, and 0 or 1 bit for A channel.
    // The pixel data is encoded using 8 bytes per 4x4 block (4 bits per pixel) providing 1:8 compression ratio against RGBA8 format.
    TEX_FORMAT_BC1_UNORM_SRGB: 66,  // OpenGL: GL_COMPRESSED_SRGB_S3TC_DXT1_EXT; extension [GL_EXT_texture_compression_s3tc] is required
    // four component typeless block-compression format with 1:4 compression ratio.
    TEX_FORMAT_BC2_TYPELESS: 67,  // OpenGL have no direct counterpart, use GL_COMPRESSED_RGBA_S3TC_DXT3_EXT; extension [GL_EXT_texture_compression_s3tc] is required
    // four-component unsigned-normalized-integer block-compression format with 5 bits for R, 6 bits for G, 5 bits for B, and 4 bits for low-coherent separate A channel.
    // the pixel data is encoded using 16 bytes per 4x4 block (8 bits per pixel) providing 1:4 compression ratio against RGBA8 format.
    TEX_FORMAT_BC2_UNORM: 68,  // OpenGL: GL_COMPRESSED_RGBA_S3TC_DXT3_EXT; extension [GL_EXT_texture_compression_s3tc] is required
    // four-component signed-normalized-integer block-compression sRGB format with 5 bits for R, 6 bits for G, 5 bits for B, and 4 bits for low-coherent separate A channel.
    // The pixel data is encoded using 16 bytes per 4x4 block (8 bits per pixel) providing 1:4 compression ratio against RGBA8 format.
    TEX_FORMAT_BC2_UNORM_SRGB: 69,  // OpenGL: GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT; extension [GL_EXT_texture_compression_s3tc] is required
    // four-component typeless block-compression format with 1:4 compression ratio.
    TEX_FORMAT_BC3_TYPELESS: 70,  // OpenGL have no direct counterpart, use GL_COMPRESSED_RGBA_S3TC_DXT5_EXT; extension [GL_EXT_texture_compression_s3tc] is required
    // four-component unsigned-normalized-integer block-compression format with 5 bits for R, 6 bits for G, 5 bits for B, and 8 bits for highly-coherent A channel.
    // The pixel data is encoded using 16 bytes per 4x4 block (8 bits per pixel) providing 1:4 compression ratio against RGBA8 format.
    TEX_FORMAT_BC3_UNORM: 71,  // OpenGL: GL_COMPRESSED_RGBA_S3TC_DXT5_EXT; extension [GL_EXT_texture_compression_s3tc] is required
    // four-component unsigned-normalized-integer block-compression sRGB format with 5 bits for R, 6 bits for G, 5 bits for B, and 8 bits for highly-coherent A channel.
    // The pixel data is encoded using 16 bytes per 4x4 block (8 bits per pixel) providing 1:4 compression ratio against RGBA8 format.
    TEX_FORMAT_BC3_UNORM_SRGB: 72,  // OpenGL: GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT.; extension [GL_EXT_texture_compression_s3tc] is required
    // one-component typeless block-compression format with 1:2 compression ratio.
    TEX_FORMAT_BC4_TYPELESS: 73,  // OpenGL have no direct counterpart, use GL_COMPRESSED_RED_RGTC1; extension [GL_ARB_texture_compression_rgtc] is required
    // one-component unsigned-normalized-integer block-compression format with 8 bits for R channel.
    // The pixel data is encoded using 8 bytes per 4x4 block (4 bits per pixel) providing 1:2 compression ratio against R8 format.
    TEX_FORMAT_BC4_UNORM: 74,  // OpenGL: GL_COMPRESSED_RED_RGTC1; extension [GL_ARB_texture_compression_rgtc] is required
    // one-component signed-normalized-integer block-compression format with 8 bits for R channel.
    // The pixel data is encoded using 8 bytes per 4x4 block (4 bits per pixel) providing 1:2 compression ratio against R8 format.
    TEX_FORMAT_BC4_SNORM: 75,  // OpenGL: GL_COMPRESSED_SIGNED_RED_RGTC1; extension [GL_ARB_texture_compression_rgtc] is required
    // two-component typeless block-compression format with 1:2 compression ratio.
    TEX_FORMAT_BC5_TYPELESS: 76,  // OpenGL have no direct counterpart, use GL_COMPRESSED_RG_RGTC2; extension [GL_ARB_texture_compression_rgtc] is required
    // two-component unsigned-normalized-integer block-compression format with 8 bits for R and 8 bits for G channel.
    // The pixel data is encoded using 16 bytes per 4x4 block (8 bits per pixel) providing 1:2 compression ratio against RG8 format. \n
    TEX_FORMAT_BC5_UNORM: 77,  // OpenGL: GL_COMPRESSED_RG_RGTC2; extension [GL_ARB_texture_compression_rgtc] is required
    // two-component signed-normalized-integer block-compression format with 8 bits for R and 8 bits for G channel.
    // The pixel data is encoded using 16 bytes per 4x4 block (8 bits per pixel) providing 1:2 compression ratio against RG8 format. \n
    TEX_FORMAT_BC5_SNORM: 78,  // OpenGL: GL_COMPRESSED_SIGNED_RG_RGTC2; extension [GL_ARB_texture_compression_rgtc] is required
    // three-component 16-bit unsigned-normalized-integer format with 5 bits for blue, 6 bits for green, and 5 bits for red channel.
    // TEX_FORMAT_B5G6R5_UNORM, not supported in OpenGL

    // four-component 16-bit unsigned-normalized-integer format with 5 bits for each color channel and 1-bit alpha.
    // TEX_FORMAT_B5G5R5A1_UNORM, not supported in OpenGL

    // four-component 32-bit unsigned-normalized-integer format with 8 bits for each channel.
    // TEX_FORMAT_BGRA8_UNORM, not supported in OpenGL

    // four-component 32-bit unsigned-normalized-integer format with 8 bits for each color channel and 8 bits unused.
    // TEX_FORMAT_BGRX8_UNORM, not supported in OpenGL

    // four-component 32-bit 2.8-biased fixed-point format with 10 bits for each color channel and 2-bit alpha. 
    // TEX_FORMAT_R10G10B10_XR_BIAS_A2_UNORM, not supported in OpenGL

    // four-component 32-bit typeless format with 8 bits for each channel.
    // TEX_FORMAT_BGRA8_TYPELESS, not supported in OpenGL

    // four-component 32-bit unsigned-normalized sRGB format with 8 bits for each channel.
    // TEX_FORMAT_BGRA8_UNORM_SRGB, not supported in OpenGL

    // four-component 32-bit typeless format that with 8 bits for each color channel, and 8 bits are unused.
    // TEX_FORMAT_BGRX8_TYPELESS, not supported in OpenGL

    // four-component 32-bit unsigned-normalized sRGB format with 8 bits for each color channel, and 8 bits are unused. \n
    // TEX_FORMAT_BGRX8_UNORM_SRGB, not supported in OpenGL

    // three-component typeless block-compression format. 
    TEX_FORMAT_BC6H_TYPELESS: 79,  // OpenGL have no direct counterpart, use GL_COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT; extension [GL_ARB_texture_compression_bptc] is required
    // three-component unsigned half-precision floating-point format with 16 bits for each channel.
    TEX_FORMAT_BC6H_UF16: 80,  // OpenGL: GL_COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT; extension [GL_ARB_texture_compression_bptc] is required
    // three-channel signed half-precision floating-point format with 16 bits per each channel.
    TEX_FORMAT_BC6H_SF16: 81,  // OpenGL: GL_COMPRESSED_RGB_BPTC_SIGNED_FLOAT; extension [GL_ARB_texture_compression_bptc] is required
    // three-component typeless block-compression format.
    TEX_FORMAT_BC7_TYPELESS: 82,  // OpenGL have no direct counterpart, use GL_COMPRESSED_RGBA_BPTC_UNORM; extension [GL_ARB_texture_compression_bptc] is required
    // Three-component block-compression unsigned-normalized-integer format with 4 to 7 bits per color channel and 0 to 8 bits of alpha.
    TEX_FORMAT_BC7_UNORM: 83,  // OpenGL: GL_COMPRESSED_RGBA_BPTC_UNORM; extension [GL_ARB_texture_compression_bptc] is required
    /// three-component block-compression unsigned-normalized-integer sRGB format with 4 to 7 bits per color channel and 0 to 8 bits of alpha.
    TEX_FORMAT_BC7_UNORM_SRGB: 84,  // OpenGL: GL_COMPRESSED_SRGB_ALPHA_BPTC_UNORM; extension [GL_ARB_texture_compression_bptc] is required

    TEX_FORMAT_NUM_FORMATS: 85
};

class SwapChainDesc {
    constructor() {
        this.width = 0;
        this.height = 0;
        // back buffer format
        this.color_buffer_format = TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM_SRGB;
        this.depth_buffer_format = TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT;
        // number of buffers in the swapchain
        this.buffer_count = 2;
        this.default_depth_value = 1.0; // float
        this.default_stencil_value = 0 // uint8
    }
}

export {
    COMPARISON_FUNCTION,
    PRIMITIVE_TOPOLOGY,
    VALUE_TYPE,
    TEXTURE_FORMAT,
    SwapChainDesc,
}