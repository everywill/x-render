// used by SamplerDesc to define a comparisonn function if one of the comparison mode filters is used
// used by StencilOpDDesc to define a stencil function
// used by DepthStencilStateDesc to define a depth function
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

// describe available texture formats
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
    TEX_FORMAT_RGBA16_UINT: 12,  // OpenGL: GL_RGBA16UI
    // four-component 64-bit signed-normalized-integer format with 16-bit channels.
    TEX_FORMAT_RGBA16_SNORM: 13,  // OpenGL: GL_RGBA16_SNORM; extension [GL_EXT_texture_norm16] is required
    // four-component 64-bit signed-integer format with 16-bit channels.
    TEX_FORMAT_RGBA16_SINT: 14,  // OpenGL: GL_RGBA16I
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

const COMPONENT_TYPE = {
    COMPONENT_TYPE_UNDEFINED: 0,
    // float point
    COMPONENT_TYPE_FLOAT: 1,
    // Signed-normalized-integer component type
    COMPONENT_TYPE_SNORM: 2,
    // Unsigned-normalized-integer component type
    COMPONENT_TYPE_UNORM: 3,
    // Unsigned-normalized-integer sRGB component type
    COMPONENT_TYPE_UNORM_SRGB: 4,
    // Signed-integer component type
    COMPONENT_TYPE_SINT: 5,
    COMPONENT_TYPE_UINT: 6,
    // Depth component type
    COMPONENT_TYPE_DEPTH: 7,
    // Depth-stencil component type
    COMPONENT_TYPE_DEPTH_STENCIL: 8, 
    // Compound component type, for example: TEX_FORMAT_R11G11B10_FLOAT or TEX_FORMAT_RGB9E5_SHAREDEXP
    COMPONENT_TYPE_COMPOUND: 9,
    COMPONENT_TYPE_COMPRESSED: 10,
}

const TEXTURE_VIEW_TYPE = {
    TEXTURE_VIEW_UNDEFINED: 0,
    // used as the source for the shader read operations
    TEXTURE_VIEW_SHADER_RESOURCE: 1,
    // used as the target for rendering operations
    TEXTURE_VIEW_RENDER_TARGET: 2,
    TEXTURE_VIEW_DEPTH_STENCIL: 3,
    // unordered read/write operation from shaders
    TEXTURE_VIEW_UNORDERED_ACCESS: 4,
    TEXTURE_VIEW_NUM_VIEWS: 5,
};

const BUFFER_VIEW_TYPE = {
    BUFFER_VIEW_UNDEFINED: 0,
    // shader resource view that will be used as the source for the shader read operations 
    BUFFER_VIEW_SHADER_RESOURCE: 1,
    // unordered access view that will be used for unordered read/write operations from the shaders
    BUFFER_VIEW_UNORDERED_ACCESS: 2,
    BUFFER_VIEW_NUM_VIEWS: 3
}

// describe how a mapped resource will be accessed
const MAP_TYPE = {
    MAP_READ: 1,  // OpenGL: GL_MAP_READ_BIT
    MAP_WRITE: 2,  // OpenGL: GL_MAP_WRITE_BIT
    MAP_READ_WRITE: 3, // OpenGL: GL_MAP_WRITE_BIT | GL_MAP_READ_BIT
}

// used to describe buffer mapping
const MAP_FLAGS = {
    MAP_FLAG_NONE: 0,
    // map operation should not wait until previous command that using the same resource completes
    // map returns null pointer if the resource is still in use 
    // MAP_FLAG_DO_NOT_WAIT;  OpenGL not support, will always be mapped

    // previous contents of the resource will be undefined, only be compatible with MAP_WRITE
    MAP_FLAG_DISCARD: 1,  // OpenGL simulate it by orphaninng a buffer
    // system will not synchronize pending operations before mapping the buffer.
    // it's responsibility of the app to make sure the buffer content not overwritten when used by GPU
    MAP_FLAG_NO_OVERWRITE: 2  // OpenGL: GL_MAP_UNSYNCHRONIZED_BIT
}

class TextureFormatAttribs {
    constructor(name, format, componentSize, numComponents, componentType, isTypeless, blockWidth, blockHeight) {
        this.name = name || 'TEX_FORMAT_UNKNOWN';
        this.format = format || TEXTURE_FORMAT[this.name];
        this.component_size = componentSize || 0;
        this.num_components = numComponents || 0;
        this.component_type = componentType || COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED;
        this.is_typeless = isTypeless || false;
        this.block_width = blockWidth || 0;
        this.block_height = blockHeight || 0;
    }
}

class TextureFormatInfo extends TextureFormatAttribs {
    constructor(name, format, componentSize, numComponents, componentType, isTypeless, blockWidth, blockHeight) {
        super(name, format, componentSize, numComponents, componentType, isTypeless, blockWidth, blockHeight);
        // if this format is supported by the device
        this.supported = false;
        // if this format can be filtered
        this.filterable = false;
        // if this format can be used as a render target
        this.color_renderable = false;
        // if this format can be used as a depth format
        this.depth_renderable = false;
        // if this format can be used to create 1D texture
        this.texture1D_format = false;
        // if this format can be used to create 2D texture
        this.texture2D_format = false;
        // if this format can be used to create 3D texture
        this.texture3D_format = false;
        // if this format can be used to create cube texture
        this.texture_cube_format = false;
        this.support_multisample = false;
    }
}

// describes which parts of the pipeline a resouce can be bound to
// used by buffer and texture
const BIND_FLAGS = {
    BIND_NONE: 0,
    // bind buffer as a vertex buffer
    BIND_VERTEX_BUFFER: 1,
    // bind buffer as an index buffer
    BIND_INDEX_BUFFER: 2,
    // bind buffer as a uniform buffer
    // may not be combined with other flags
    BIND_UNIFORM_BUFFER: 4,
    // bind a buffer or a texture as a shader resource
    BIND_SHADER_RESOURCE: 8,
    // bind a buffer as a target for stream output stage
    BIND_STREAM_OUTPUT: 16,
    // bind a texture as a render target
    BIND_RENDER_TARGET: 32,
    // bind a texture as a depth-stencil target
    BIND_DEPTH_STENCILL: 64,
    // bind a buffer or a texture as an unordered access view
    BIND_UNORDERED_ACCESS: 128,
    // bind a buffer as source buffer for indirect draw commands
    BIND_INDIRECT_DRAW_ARGS: 256,
    // BIND_INPUT_ATTACHMENT, BIND_RAY_TRACING, BIND_SHADING_RATE,
    BIND_FLAG_LAST: 10,
};

// describe usage of a buffer or a texture
const USAGE = {
    // a resource that can only be readd by the GPU. 
    // it cannot be written by the GPU, and cannot be accessed at all by the CPU.
    // this type of resource must be initialized when it is created, since it cannot be changed after creation
    // do not allow CPU access and must use CPU_ACCESS_NONE flag
    USAGE_STATIC: 0,  // OpenGL: GL_STATIC_DRAW
    // a resource that requires read and write access by the GPU 
    // and can also be occasionally written by the CPU.
    // do not allow CPU access must and must use CPU_ACCESS_NONE flag
    USAGE_DEFAULT: 1,  // OpenGL: GL_DYNAMIC_DRAW
    // a resource that can be read by the GPU
    // and written at least once per frame by the CPU
    USAGE_DYNAMIC: 2,  // OpenGL: GL_STREAM_DRAW
    // a resource that facilitates transferring data between GPU and CPU
    USAGE_STAGING: 3,  // OpenGL: GL_STATIC_READ or GL_STATIC_COPY
};

// describe CPU access mode for a buffer or a texture
const CPU_ACCESS_FLAGS = {
    CPU_ACCESS_NONE: 0,
    // a resource can be mapped for reading
    CPU_ACCESS_READ: 1,
    // a resource can be mapped for writing
    CPU_ACCESS_WRITE: 2,
}

const MISC_TEXTURE_FLAGS = {
    MISC_TEXTURE_FLAG_NONE: 0,
    // allow automatic mipmap generation
    // texture must be created with BIND_RENDER_TARGET flag
    MISC_TEXTURE_FLAG_GENERATE_MIPS: 1,
    // read pixel in asynchronized way
    // almost always read last drawcall result
    MISC_TEXTURE_FLAG_ASYNC_READ: 2,
    // for multisample render target
    MISC_TEXTURE_FLAG_RESOLVE: 4,
}

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

const RESOURCE_DIMENSION = {
    RESOURCE_DIM_UNDEFINED: 0,  // undefined texture type
    RESOURCE_DIM_BUFFER: 1,  // buffer
    RESOURCE_DIM_TEX_1D: 2,  // one-dimensional texture
    RESOURCE_DIM_TEX_1D_ARRAY: 3,  // one-dimensional texture array
    RESOURCE_DIM_TEX_2D: 4,  // two-dimensional texture
    RESOURCE_DIM_TEX_2D_ARRAY: 5,  // two-dimensional texture array
    RESOURCE_DIM_TEX_3D: 6,  // three-dimensional texture
    RESOURCE_DIM_TEX_CUBE: 7,  // cube-map texture
    RESOURCE_DIM_TEX_CUBE_ARRAY: 8,  // cube-map array texture
    RESOURCE_DIM_NUM_DIMENSIONS: 9, 
}

class Box {
    constructor(minX = 0, maxX = 0, minY = 0, maxY = 0, minZ = 0, maxZ = 1) {
        this.min_x = minX;
        this.max_x = maxX;
        this.min_y = minY;
        this.max_y = maxY;
        this.min_z = minZ;
        this.max_z = maxZ;
    }
}

// used by SamplerDesc to define min, mag and mip filters
const FILTER_TYPE = {
    FILTER_TYPE_UNKNOWN: 0,
    FILTER_TYPE_POINT: 1,
    FILTER_TYPE_LINEAR: 2,
    FILTER_TYPE_ANISOTROPIC: 3,
    FILTER_TYPE_COMPARISON_POINT: 4,
    FILTER_TYPE_COMPARISON_LINEAR: 5,
    FILTER_TYPE_COMPARISON_ANISOTROPIC: 6
};

// define how to resolve texture coordinates that are outside of the boundaries of a texture
const TEXTURE_ADDRESS_MODE = {
    TEXTURE_ADDRESS_UNKNOWN: 0,
    TEXTURE_ADDRESS_WRAP: 1,  // OpenGL: GL_REPEAT
    TEXTURE_ADDRESS_MIRROR: 2,  // OpenGL: GL_MIRRORED_REPEAT
    // Texture coordinates outside the range [0.0, 1.0] are set to the
    // texture color at 0.0 or 1.0, respectively
    TEXTURE_ADDRESS_CLAMP: 3,  // OpenGL: GL_CLAMP_TO_EDGE
    // Texture coordinates outside the range [0.0, 1.0] are set to the border color
    TEXTURE_ADDRESS_BORDER: 4,  // OpenGL: GL_CLAMP_TO_BORDER
    // Takes the absolute value of the texture coordinate (thus, mirroring around 0), and then clamps to the maximum value
    // TEXTURE_ADDRESS_MIRROR_ONCE: 5,  not supported in WebGL
    TEXTURE_ADDRESS_NUM_MODES: 5,
};

const SHADER_TYPE = {
    SHADER_TYPE_UNKNOWN: 0x0,
    SHADER_TYPE_VERTEX: 0x1,
    SHADER_TYPE_PIXEL: 0x2,
    SHADER_TYPE_GEOMETRY: 0x4,
    SHADER_TYPE_HULL: 0x8,
    SHADER_TYPE_DOMAIN: 0x10,
    SHADER_TYPE_COMPUTE: 0x20,
}

const TARGET_BUFFER_FLAGS = {
    // no buffer selected
    NONE: 0,

    COLOR0: 0x1,
    COLOR1: 0x2,
    COLOR2: 0x4,
    COLOR3: 0x8,
    COLOR4: 0x10,
    COLOR5: 0x20,
    COLOR6: 0x40,
    COLOR7: 0x80,

    COLOR: 0x1,
    COLOR_ALL: 0x1|0x2|0x4|0x8|0x10|0x20|0x40|0x80,
    // depth buffer selected
    DEPTH: 0x100,
    // stencil buffer selected
    STENCIL: 0x200,
    COLOR_AND_DEPTH: 0x1|0x100,
    COLOR_AND_STENCIL: 0x1|0x200,
    DEPTH_AND_STENCIL: 0x100|0x200,
    COLOR0_DEPTH_AND_STENCIL: 0x1|0x100|0x200,
    ALL: 0x1|0x2|0x4|0x8|0x10|0x20|0x40|0x80|0x100|0x200,
}

const VIEW_FORMATS = {}
function initViewFormats(texFormat, SRVFmt, RTVFmt, DSVFmt, UAVFmt) {
    VIEW_FORMATS[texFormat][TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE] = TEXTURE_FORMAT[`TEX_FORMAT_${SRVFmt}`];
    VIEW_FORMATS[texFormat][TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET] = TEXTURE_FORMAT[`TEX_FORMAT_${RTVFmt}`];
    VIEW_FORMATS[texFormat][TEXTURE_VIEW_TYPE.TEXTURE_VIEW_DEPTH_STENCIL] = TEXTURE_FORMAT[`TEX_FORMAT_${DSVFmt}`];
    VIEW_FORMATS[texFormat][TEXTURE_VIEW_TYPE.TEXTURE_VIEW_UNORDERED_ACCESS] = TEXTURE_FORMAT[`TEX_FORMAT_${UAVFmt}`];
}

initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN, 'UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN');

export {
    COMPARISON_FUNCTION,
    PRIMITIVE_TOPOLOGY,
    VALUE_TYPE,
    TEXTURE_FORMAT,
    MISC_TEXTURE_FLAGS,
    TEXTURE_VIEW_TYPE,
    BUFFER_VIEW_TYPE,
    COMPONENT_TYPE,
    TextureFormatAttribs,
    SwapChainDesc,
    RESOURCE_DIMENSION,
    BIND_FLAGS,
    USAGE,
    CPU_ACCESS_FLAGS,
    Box,
    FILTER_TYPE,
    TEXTURE_ADDRESS_MODE,
    MAP_TYPE, MAP_FLAGS,
    SHADER_TYPE,
    TextureFormatInfo,
    TARGET_BUFFER_FLAGS
}
