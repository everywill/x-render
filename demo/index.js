(() => {
  // src/render-backend/graphics/graphics-types.js
  var CONTEXT_CREATION_TYPE = {
    ATTACH: 0,
    CREATE: 1
  };
  var COMPARISON_FUNCTION = {
    COMPARISON_FUNC_UNKNOWN: 0,
    COMPARISON_FUNC_NEVER: 1,
    COMPARISON_FUNC_LESS: 2,
    COMPARISON_FUNC_EQUAL: 3,
    COMPARISON_FUNC_LESS_EQUAL: 4,
    COMPARISON_FUNC_GREATER: 5,
    COMPARISON_FUNC_NOT_EQUAL: 6,
    COMPARISON_FUNC_GREATER_EQUAL: 7,
    COMPARISON_FUNC_ALWAYS: 8,
    COMPARISON_FUNC_NUM_FUNCTIONS: 9
  };
  var PRIMITIVE_TOPOLOGY = {
    PRIMITIVE_TOPOLOGY_UNDEFINED: 0,
    PRIMITIVE_TOPOLOGY_TRIANGLE_LIST: 1,
    PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP: 2,
    PRIMITIVE_TOPOLOGY_POINT_LIST: 3,
    PRIMITIVE_TOPOLOGY_LINE_LIST: 4,
    PRIMITIVE_TOPOLOGY_LINE_STRIP: 5,
    PRIMITIVE_TOPOLOGY_TRIANGLE_LIST_ADJ: 6,
    PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP_ADJ: 7,
    RIMITIVE_TOPOLOGY_LINE_LIST_ADJ: 8,
    PRIMITIVE_TOPOLOGY_LINE_STRIP_ADJ: 9,
    PRIMITIVE_TOPOLOGY_CONTROL_POINT_PATCHLIST: 10
  };
  var VALUE_TYPE2 = {
    VT_UNDEFINED: 0,
    VT_INT8: 1,
    VT_INT16: 2,
    VT_INT32: 3,
    VT_UINT8: 4,
    VT_UINT16: 5,
    VT_UINT32: 6,
    VT_FLOAT16: 7,
    VT_FLOAT32: 8,
    VT_NUM_TYPES: 9
  };
  var UNIFORM_TYPE = {
    BOOL: 0,
    BOOL2: 1,
    BOOL3: 2,
    BOOL4: 3,
    FLOAT: 4,
    FLOAT2: 5,
    FLOAT3: 6,
    FLOAT4: 7,
    INT: 8,
    INT2: 9,
    INT3: 10,
    INT4: 11,
    UINT: 12,
    UINT2: 13,
    UINT3: 14,
    UINT4: 15,
    MAT2X2: 16,
    MAT3X3: 17,
    MAT4X4: 18,
    MAT2X3: 19,
    MAT2X4: 20,
    MAT3X2: 21,
    MAT3X4: 22,
    MAT4X2: 23,
    MAT4X3: 24
  };
  var TEXTURE_FORMAT = {
    TEX_FORMAT_UNKNOWN: 0,
    TEX_FORMAT_RGBA32_TYPELESS: 1,
    TEX_FORMAT_RGBA32_FLOAT: 2,
    TEX_FORMAT_RGBA32_UINT: 3,
    TEX_FORMAT_RGBA32_SINT: 4,
    TEX_FORMAT_RGB32_TYPELESS: 5,
    TEX_FORMAT_RGB32_FLOAT: 6,
    TEX_FORMAT_RGB32_UINT: 7,
    TEX_FORMAT_RGB32_SINT: 8,
    TEX_FORMAT_RGBA16_TYPELESS: 9,
    TEX_FORMAT_RGBA16_FLOAT: 10,
    TEX_FORMAT_RGBA16_UNORM: 11,
    TEX_FORMAT_RGBA16_UINT: 12,
    TEX_FORMAT_RGBA16_SNORM: 13,
    TEX_FORMAT_RGBA16_SINT: 14,
    TEX_FORMAT_RG32_TYPELESS: 15,
    TEX_FORMAT_RG32_FLOAT: 16,
    TEX_FORMAT_RG32_UINT: 17,
    TEX_FORMAT_RG32_SINT: 18,
    TEX_FORMAT_R32G8X24_TYPELESS: 19,
    TEX_FORMAT_D32_FLOAT_S8X24_UINT: 20,
    TEX_FORMAT_R32_FLOAT_X8X24_TYPELESS: 21,
    TEX_FORMAT_RGB10A2_TYPELESS: 22,
    TEX_FORMAT_RGB10A2_UNORM: 23,
    TEX_FORMAT_RGB10A2_UINT: 24,
    TEX_FORMAT_R11G11B10_FLOAT: 25,
    TEX_FORMAT_RGBA8_TYPELESS: 26,
    TEX_FORMAT_RGBA8_UNORM: 27,
    TEX_FORMAT_RGBA8_UNORM_SRGB: 28,
    TEX_FORMAT_RGBA8_UINT: 29,
    TEX_FORMAT_RGBA8_SNORM: 30,
    TEX_FORMAT_RGBA8_SINT: 31,
    TEX_FORMAT_RG16_TYPELESS: 32,
    TEX_FORMAT_RG16_FLOAT: 33,
    TEX_FORMAT_RG16_UNORM: 34,
    TEX_FORMAT_RG16_UINT: 35,
    TEX_FORMAT_RG16_SNORM: 36,
    TEX_FORMAT_RG16_SINT: 37,
    TEX_FORMAT_R32_TYPELESS: 38,
    TEX_FORMAT_D32_FLOAT: 39,
    TEX_FORMAT_R32_FLOAT: 40,
    TEX_FORMAT_R32_UINT: 41,
    TEX_FORMAT_R32_SINT: 42,
    TEX_FORMAT_R24G8_TYPELESS: 43,
    TEX_FORMAT_D24_UNORM_S8_UINT: 44,
    TEX_FORMAT_R24_UNORM_X8_TYPELESS: 45,
    TEX_FORMAT_RG8_TYPELESS: 46,
    TEX_FORMAT_RG8_UNORM: 47,
    TEX_FORMAT_RG8_UINT: 48,
    TEX_FORMAT_RG8_SNORM: 49,
    TEX_FORMAT_RG8_SINT: 50,
    TEX_FORMAT_R16_TYPELESS: 51,
    TEX_FORMAT_R16_FLOAT: 52,
    TEX_FORMAT_D16_UNORM: 53,
    TEX_FORMAT_R16_UNORM: 54,
    TEX_FORMAT_R16_UINT: 55,
    TEX_FORMAT_R16_SNORM: 56,
    TEX_FORMAT_R16_SINT: 57,
    TEX_FORMAT_R8_TYPELESS: 58,
    TEX_FORMAT_R8_UNORM: 59,
    TEX_FORMAT_R8_UINT: 60,
    TEX_FORMAT_R8_SNORM: 61,
    TEX_FORMAT_R8_SINT: 62,
    TEX_FORMAT_RGB9E5_SHAREDEXP: 63,
    TEX_FORMAT_BC1_TYPELESS: 64,
    TEX_FORMAT_BC1_UNORM: 65,
    TEX_FORMAT_BC1_UNORM_SRGB: 66,
    TEX_FORMAT_BC2_TYPELESS: 67,
    TEX_FORMAT_BC2_UNORM: 68,
    TEX_FORMAT_BC2_UNORM_SRGB: 69,
    TEX_FORMAT_BC3_TYPELESS: 70,
    TEX_FORMAT_BC3_UNORM: 71,
    TEX_FORMAT_BC3_UNORM_SRGB: 72,
    TEX_FORMAT_BC4_TYPELESS: 73,
    TEX_FORMAT_BC4_UNORM: 74,
    TEX_FORMAT_BC4_SNORM: 75,
    TEX_FORMAT_BC5_TYPELESS: 76,
    TEX_FORMAT_BC5_UNORM: 77,
    TEX_FORMAT_BC5_SNORM: 78,
    TEX_FORMAT_BC6H_TYPELESS: 79,
    TEX_FORMAT_BC6H_UF16: 80,
    TEX_FORMAT_BC6H_SF16: 81,
    TEX_FORMAT_BC7_TYPELESS: 82,
    TEX_FORMAT_BC7_UNORM: 83,
    TEX_FORMAT_BC7_UNORM_SRGB: 84,
    TEX_FORMAT_RGB_ETC2_UNORM_BLOCK8: 85,
    TEX_FORMAT_RGB_ETC2_SRGB_BLOCK8: 86,
    TEX_FORMAT_RGBA_ETC2_UNORM_BLOCK8: 87,
    TEX_FORMAT_RGBA_ETC2_SRGB_BLOCK8: 88,
    TEX_FORMAT_RGBA_ETC2_UNORM_BLOCK16: 89,
    TEX_FORMAT_RGBA_ETC2_SRGB_BLOCK16: 90,
    TEX_FORMAT_RGBA_ASTC_4X4_UNORM_BLOCK16: 91,
    TEX_FORMAT_RGBA_ASTC_4X4_SRGB_BLOCK16: 92,
    TEX_FORMAT_RGBA_ASTC_5X4_UNORM_BLOCK16: 93,
    TEX_FORMAT_RGBA_ASTC_5X4_SRGB_BLOCK16: 94,
    TEX_FORMAT_RGBA_ASTC_5X5_UNORM_BLOCK16: 95,
    TEX_FORMAT_RGBA_ASTC_5X5_SRGB_BLOCK16: 96,
    TEX_FORMAT_RGBA_ASTC_6X5_UNORM_BLOCK16: 97,
    TEX_FORMAT_RGBA_ASTC_6X5_SRGB_BLOCK16: 98,
    TEX_FORMAT_RGBA_ASTC_6X6_UNORM_BLOCK16: 99,
    TEX_FORMAT_RGBA_ASTC_6X6_SRGB_BLOCK16: 100,
    TEX_FORMAT_RGBA_ASTC_8X5_UNORM_BLOCK16: 101,
    TEX_FORMAT_RGBA_ASTC_8X5_SRGB_BLOCK16: 102,
    TEX_FORMAT_RGBA_ASTC_8X6_UNORM_BLOCK16: 103,
    TEX_FORMAT_RGBA_ASTC_8X6_SRGB_BLOCK16: 104,
    TEX_FORMAT_RGBA_ASTC_8X8_UNORM_BLOCK16: 105,
    TEX_FORMAT_RGBA_ASTC_8X8_SRGB_BLOCK16: 106,
    TEX_FORMAT_RGBA_ASTC_10X5_UNORM_BLOCK16: 107,
    TEX_FORMAT_RGBA_ASTC_10X5_SRGB_BLOCK16: 108,
    TEX_FORMAT_RGBA_ASTC_10X6_UNORM_BLOCK16: 109,
    TEX_FORMAT_RGBA_ASTC_10X6_SRGB_BLOCK16: 110,
    TEX_FORMAT_RGBA_ASTC_10X8_UNORM_BLOCK16: 111,
    TEX_FORMAT_RGBA_ASTC_10X8_SRGB_BLOCK16: 112,
    TEX_FORMAT_RGBA_ASTC_10X10_UNORM_BLOCK16: 113,
    TEX_FORMAT_RGBA_ASTC_10X10_SRGB_BLOCK16: 114,
    TEX_FORMAT_RGBA_ASTC_12X10_UNORM_BLOCK16: 115,
    TEX_FORMAT_RGBA_ASTC_12X10_SRGB_BLOCK16: 116,
    TEX_FORMAT_RGBA_ASTC_12X12_UNORM_BLOCK16: 117,
    TEX_FORMAT_RGBA_ASTC_12X12_SRGB_BLOCK16: 118,
    TEX_FORMAT_NUM_FORMATS: 119
  };
  var COMPONENT_TYPE = {
    COMPONENT_TYPE_UNDEFINED: 0,
    COMPONENT_TYPE_FLOAT: 1,
    COMPONENT_TYPE_SNORM: 2,
    COMPONENT_TYPE_UNORM: 3,
    COMPONENT_TYPE_UNORM_SRGB: 4,
    COMPONENT_TYPE_SINT: 5,
    COMPONENT_TYPE_UINT: 6,
    COMPONENT_TYPE_DEPTH: 7,
    COMPONENT_TYPE_DEPTH_STENCIL: 8,
    COMPONENT_TYPE_COMPOUND: 9,
    COMPONENT_TYPE_COMPRESSED: 10
  };
  var TEXTURE_VIEW_TYPE = {
    TEXTURE_VIEW_UNDEFINED: 0,
    TEXTURE_VIEW_SHADER_RESOURCE: 1,
    TEXTURE_VIEW_RENDER_TARGET: 2,
    TEXTURE_VIEW_DEPTH_STENCIL: 3,
    TEXTURE_VIEW_UNORDERED_ACCESS: 4,
    TEXTURE_VIEW_NUM_VIEWS: 5
  };
  var BUFFER_VIEW_TYPE = {
    BUFFER_VIEW_UNDEFINED: 0,
    BUFFER_VIEW_SHADER_RESOURCE: 1,
    BUFFER_VIEW_UNORDERED_ACCESS: 2,
    BUFFER_VIEW_NUM_VIEWS: 3
  };
  var MAP_TYPE = {
    MAP_READ: 1,
    MAP_WRITE: 2,
    MAP_READ_WRITE: 3
  };
  var MAP_FLAGS = {
    MAP_FLAG_NONE: 0,
    MAP_FLAG_DISCARD: 1,
    MAP_FLAG_NO_OVERWRITE: 2
  };
  var TextureFormatAttribs = class {
    constructor(name, format, componentSize, numComponents, componentType, isTypeless, blockWidth, blockHeight) {
      this.name = name || "TEX_FORMAT_UNKNOWN";
      this.format = format || TEXTURE_FORMAT[this.name];
      this.component_size = componentSize || 0;
      this.num_components = numComponents || 0;
      this.component_type = componentType || COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED;
      this.is_typeless = isTypeless || false;
      this.block_width = blockWidth || 0;
      this.block_height = blockHeight || 0;
    }
  };
  var TextureFormatInfo = class extends TextureFormatAttribs {
    constructor({ name, format, componentSize, numComponents, componentType, isTypeless, blockWidth, blockHeight }) {
      super(name, format, componentSize, numComponents, componentType, isTypeless, blockWidth, blockHeight);
      this.supported = false;
      this.filterable = false;
      this.color_renderable = false;
      this.depth_renderable = false;
      this.texture1D_format = false;
      this.texture2D_format = false;
      this.texture3D_format = false;
      this.texture_cube_format = false;
      this.support_multisample = false;
    }
  };
  var BIND_FLAGS = {
    BIND_NONE: 0,
    BIND_VERTEX_BUFFER: 1,
    BIND_INDEX_BUFFER: 2,
    BIND_UNIFORM_BUFFER: 4,
    BIND_SHADER_RESOURCE: 8,
    BIND_STREAM_OUTPUT: 16,
    BIND_RENDER_TARGET: 32,
    BIND_DEPTH_STENCILL: 64,
    BIND_UNORDERED_ACCESS: 128,
    BIND_INDIRECT_DRAW_ARGS: 256,
    BIND_FLAG_LAST: 10
  };
  var USAGE = {
    USAGE_STATIC: 0,
    USAGE_DEFAULT: 1,
    USAGE_DYNAMIC: 2,
    USAGE_STAGING: 3
  };
  var CPU_ACCESS_FLAGS = {
    CPU_ACCESS_NONE: 0,
    CPU_ACCESS_READ: 1,
    CPU_ACCESS_WRITE: 2
  };
  var MISC_TEXTURE_FLAGS = {
    MISC_TEXTURE_FLAG_NONE: 0,
    MISC_TEXTURE_FLAG_GENERATE_MIPS: 1,
    MISC_TEXTURE_FLAG_ASYNC_READ: 2,
    MISC_TEXTURE_FLAG_RESOLVE: 4
  };
  var SwapChainDesc = class {
    constructor() {
      this.width = 0;
      this.height = 0;
      this.color_buffer_format = TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM_SRGB;
      this.depth_buffer_format = TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT;
      this.buffer_count = 2;
      this.default_depth_value = 1;
      this.default_stencil_value = 0;
      this.sample_count = 1;
    }
  };
  var RESOURCE_DIMENSION = {
    RESOURCE_DIM_UNDEFINED: 0,
    RESOURCE_DIM_BUFFER: 1,
    RESOURCE_DIM_TEX_1D: 2,
    RESOURCE_DIM_TEX_1D_ARRAY: 3,
    RESOURCE_DIM_TEX_2D: 4,
    RESOURCE_DIM_TEX_2D_ARRAY: 5,
    RESOURCE_DIM_TEX_3D: 6,
    RESOURCE_DIM_TEX_CUBE: 7,
    RESOURCE_DIM_TEX_CUBE_ARRAY: 8,
    RESOURCE_DIM_NUM_DIMENSIONS: 9
  };
  var Box = class {
    constructor(minX = 0, maxX = 0, minY = 0, maxY = 0, minZ = 0, maxZ = 1) {
      this.min_x = minX;
      this.max_x = maxX;
      this.min_y = minY;
      this.max_y = maxY;
      this.min_z = minZ;
      this.max_z = maxZ;
    }
  };
  var FILTER_TYPE = {
    FILTER_TYPE_UNKNOWN: 0,
    FILTER_TYPE_POINT: 1,
    FILTER_TYPE_LINEAR: 2,
    FILTER_TYPE_ANISOTROPIC: 3,
    FILTER_TYPE_COMPARISON_POINT: 4,
    FILTER_TYPE_COMPARISON_LINEAR: 5,
    FILTER_TYPE_COMPARISON_ANISOTROPIC: 6
  };
  var TEXTURE_ADDRESS_MODE = {
    TEXTURE_ADDRESS_UNKNOWN: 0,
    TEXTURE_ADDRESS_WRAP: 1,
    TEXTURE_ADDRESS_MIRROR: 2,
    TEXTURE_ADDRESS_CLAMP: 3,
    TEXTURE_ADDRESS_BORDER: 4,
    TEXTURE_ADDRESS_NUM_MODES: 5
  };
  var TARGET_BUFFER_FLAGS = {
    NONE: 0,
    COLOR0: 1,
    COLOR1: 2,
    COLOR2: 4,
    COLOR3: 8,
    COLOR4: 16,
    COLOR5: 32,
    COLOR6: 64,
    COLOR7: 128,
    COLOR: 1,
    COLOR_ALL: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128,
    DEPTH: 256,
    STENCIL: 512,
    COLOR_AND_DEPTH: 1 | 256,
    COLOR_AND_STENCIL: 1 | 512,
    DEPTH_AND_STENCIL: 256 | 512,
    COLOR0_DEPTH_AND_STENCIL: 1 | 256 | 512,
    ALL: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512
  };
  var VIEW_FORMATS = {};
  function initViewFormats(texFormat, SRVFmt, RTVFmt, DSVFmt, UAVFmt) {
    VIEW_FORMATS[texFormat] = {};
    VIEW_FORMATS[texFormat][TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE] = TEXTURE_FORMAT[`TEX_FORMAT_${SRVFmt}`];
    VIEW_FORMATS[texFormat][TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET] = TEXTURE_FORMAT[`TEX_FORMAT_${RTVFmt}`];
    VIEW_FORMATS[texFormat][TEXTURE_VIEW_TYPE.TEXTURE_VIEW_DEPTH_STENCIL] = TEXTURE_FORMAT[`TEX_FORMAT_${DSVFmt}`];
    VIEW_FORMATS[texFormat][TEXTURE_VIEW_TYPE.TEXTURE_VIEW_UNORDERED_ACCESS] = TEXTURE_FORMAT[`TEX_FORMAT_${UAVFmt}`];
  }
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN, "UNKNOWN", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA32_TYPELESS, "RGBA32_FLOAT", "RGBA32_FLOAT", "UNKNOWN", "RGBA32_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA32_FLOAT, "RGBA32_FLOAT", "RGBA32_FLOAT", "UNKNOWN", "RGBA32_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA32_UINT, "RGBA32_UINT", "RGBA32_UINT", "UNKNOWN", "RGBA32_UINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA32_SINT, "RGBA32_SINT", "RGBA32_SINT", "UNKNOWN", "RGBA32_SINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGB32_TYPELESS, "RGB32_FLOAT", "RGB32_FLOAT", "UNKNOWN", "RGB32_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGB32_FLOAT, "RGB32_FLOAT", "RGB32_FLOAT", "UNKNOWN", "RGB32_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGB32_UINT, "RGB32_UINT", "RGB32_UINT", "UNKNOWN", "RGB32_UINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGB32_SINT, "RGB32_SINT", "RGB32_SINT", "UNKNOWN", "RGB32_SINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_TYPELESS, "RGBA16_FLOAT", "RGBA16_FLOAT", "UNKNOWN", "RGBA16_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_FLOAT, "RGBA16_FLOAT", "RGBA16_FLOAT", "UNKNOWN", "RGBA16_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UNORM, "RGBA16_UNORM", "RGBA16_UNORM", "UNKNOWN", "RGBA16_UNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UINT, "RGBA16_UINT", "RGBA16_UINT", "UNKNOWN", "RGBA16_UINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SNORM, "RGBA16_SNORM", "RGBA16_SNORM", "UNKNOWN", "RGBA16_SNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SINT, "RGBA16_SINT", "RGBA16_SINT", "UNKNOWN", "RGBA16_SINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG32_TYPELESS, "RG32_FLOAT", "RG32_FLOAT", "UNKNOWN", "RG32_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG32_FLOAT, "RG32_FLOAT", "RG32_FLOAT", "UNKNOWN", "RG32_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG32_UINT, "RG32_UINT", "RG32_UINT", "UNKNOWN", "RG32_UINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG32_UINT, "RG32_UINT", "RG32_UINT", "UNKNOWN", "RG32_UINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R32G8X24_TYPELESS, "R32_FLOAT_X8X24_TYPELESS", "UNKNOWN", "D32_FLOAT_S8X24_UINT", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT_S8X24_UINT, "R32_FLOAT_X8X24_TYPELESS", "UNKNOWN", "D32_FLOAT_S8X24_UINT", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT_X8X24_TYPELESS, "R32_FLOAT_X8X24_TYPELESS", "UNKNOWN", "D32_FLOAT_S8X24_UINT", "R32_FLOAT_X8X24_TYPELESS");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_TYPELESS, "RGB10A2_UNORM", "RGB10A2_UNORM", "UNKNOWN", "RGB10A2_UNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_UNORM, "RGB10A2_UNORM", "RGB10A2_UNORM", "UNKNOWN", "RGB10A2_UNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_UINT, "RGB10A2_UINT", "RGB10A2_UINT", "UNKNOWN", "RGB10A2_UINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R11G11B10_FLOAT, "R11G11B10_FLOAT", "R11G11B10_FLOAT", "UNKNOWN", "R11G11B10_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_TYPELESS, "RGBA8_UNORM_SRGB", "RGBA8_UNORM_SRGB", "UNKNOWN", "RGBA8_UNORM_SRGB");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM, "RGBA8_UNORM", "RGBA8_UNORM", "UNKNOWN", "RGBA8_UNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM_SRGB, "RGBA8_UNORM_SRGB", "RGBA8_UNORM_SRGB", "UNKNOWN", "RGBA8_UNORM_SRGB");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UINT, "RGBA8_UINT", "RGBA8_UINT", "c", "RGBA8_UINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SNORM, "RGBA8_SNORM", "RGBA8_SNORM", "UNKNOWN", "RGBA8_SNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SINT, "RGBA8_SINT", "RGBA8_SINT", "UNKNOWN", "RGBA8_SINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG16_TYPELESS, "RG16_FLOAT", "RG16_FLOAT", "UNKNOWN", "RG16_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG16_FLOAT, "RG16_FLOAT", "RG16_FLOAT", "UNKNOWN", "RG16_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG16_UNORM, "RG16_UNORM", "RG16_UNORM", "UNKNOWN", "RG16_UNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG16_UINT, "RG16_UINT", "RG16_UINT", "UNKNOWN", "RG16_UINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG16_SNORM, "RG16_SNORM", "RG16_SNORM", "UNKNOWN", "RG16_SNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG16_SINT, "RG16_SINT", "RG16_SINT", "UNKNOWN", "RG16_SINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R32_TYPELESS, "R32_FLOAT", "R32_FLOAT", "D32_FLOAT", "R32_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT, "R32_FLOAT", "R32_FLOAT", "D32_FLOAT", "R32_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT, "R32_FLOAT", "R32_FLOAT", "D32_FLOAT", "R32_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R32_UINT, "R32_UINT", "R32_UINT", "UNKNOWN", "R32_UINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R32_SINT, "R32_SINT", "R32_SINT", "UNKNOWN", "R32_SINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R24G8_TYPELESS, "R24_UNORM_X8_TYPELESS", "UNKNOWN", "D24_UNORM_S8_UINT", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_D24_UNORM_S8_UINT, "R24_UNORM_X8_TYPELESS", "UNKNOWN", "D24_UNORM_S8_UINT", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R24_UNORM_X8_TYPELESS, "R24_UNORM_X8_TYPELESS", "UNKNOWN", "D24_UNORM_S8_UINT", "R24_UNORM_X8_TYPELESS");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG8_TYPELESS, "RG8_UNORM", "RG8_UNORM", "UNKNOWN", "RG8_UNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG8_UNORM, "RG8_UNORM", "RG8_UNORM", "UNKNOWN", "RG8_UNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG8_UINT, "RG8_UINT", "RG8_UINT", "UNKNOWN", "RG8_UINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG8_SNORM, "RG8_SNORM", "RG8_SNORM", "UNKNOWN", "RG8_SNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RG8_SINT, "RG8_SINT", "RG8_SINT", "UNKNOWN", "RG8_SINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R16_TYPELESS, "R16_UNORM", "R16_UNORM", "D16_UNORM", "R16_UNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R16_FLOAT, "R16_FLOAT", "R16_FLOAT", "UNKNOWN", "R16_FLOAT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_D16_UNORM, "R16_UNORM", "R16_UNORM", "D16_UNORM", "R16_UNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R16_UNORM, "R16_UNORM", "R16_UNORM", "D16_UNORM", "R16_UNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R16_UINT, "R16_UINT", "R16_UINT", "UNKNOWN", "R16_UINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R16_SNORM, "R16_SNORM", "R16_SNORM", "UNKNOWN", "R16_SNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R16_SINT, "R16_SINT", "R16_SINT", "UNKNOWN", "R16_SINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R8_TYPELESS, "R8_UNORM", "R8_UNORM", "UNKNOWN", "R8_UNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R8_UNORM, "R8_UNORM", "R8_UNORM", "UNKNOWN", "R8_UNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R8_UINT, "R8_UINT", "R8_UINT", "UNKNOWN", "R8_UINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM, "R8_SNORM", "R8_SNORM", "UNKNOWN", "R8_SNORM");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_R8_SINT, "R8_SINT", "R8_SINT", "UNKNOWN", "R8_SINT");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGB9E5_SHAREDEXP, "RGB9E5_SHAREDEXP", "RGB9E5_SHAREDEXP", "UNKNOWN", "RGB9E5_SHAREDEXP");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC1_TYPELESS, "BC1_UNORM_SRGB", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM, "BC1_UNORM", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM_SRGB, "BC1_UNORM_SRGB", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC2_TYPELESS, "BC2_UNORM_SRGB", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM, "BC2_UNORM", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM_SRGB, "BC2_UNORM_SRGB", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC3_TYPELESS, "BC3_UNORM_SRGB", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM, "BC3_UNORM", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM_SRGB, "BC3_UNORM_SRGB", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC4_TYPELESS, "BC4_UNORM", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC4_UNORM, "BC4_UNORM", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC4_SNORM, "BC4_SNORM", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC5_TYPELESS, "BC5_UNORM", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC5_UNORM, "BC5_UNORM", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC5_SNORM, "BC5_SNORM", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC6H_TYPELESS, "BC6H_UF16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC6H_UF16, "BC6H_UF16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC6H_SF16, "BC6H_SF16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC7_TYPELESS, "BC7_UNORM", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC7_UNORM, "BC7_UNORM", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_BC7_UNORM_SRGB, "BC7_UNORM_SRGB", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGB_ETC2_UNORM_BLOCK8, "RGB_ETC2_UNORM_BLOCK8", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGB_ETC2_SRGB_BLOCK8, "RGB_ETC2_SRGB_BLOCK8", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_UNORM_BLOCK8, "RGBA_ETC2_UNORM_BLOCK8", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_SRGB_BLOCK8, "RGBA_ETC2_SRGB_BLOCK8", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_UNORM_BLOCK16, "RGBA_ETC2_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_SRGB_BLOCK16, "RGBA_ETC2_SRGB_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_4X4_UNORM_BLOCK16, "RGBA_ASTC_4X4_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_4X4_SRGB_BLOCK16, "RGBA_ASTC_4X4_SRGB_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X4_UNORM_BLOCK16, "RGBA_ASTC_5X4_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X4_SRGB_BLOCK16, "RGBA_ASTC_5X4_SRGB_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X5_UNORM_BLOCK16, "RGBA_ASTC_5X5_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X5_SRGB_BLOCK16, "RGBA_ASTC_5X5_SRGB_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X5_UNORM_BLOCK16, "RGBA_ASTC_6X5_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X5_SRGB_BLOCK16, "RGBA_ASTC_6X5_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X6_UNORM_BLOCK16, "RGBA_ASTC_6X6_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X6_SRGB_BLOCK16, "RGBA_ASTC_6X6_SRGB_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X5_UNORM_BLOCK16, "RGBA_ASTC_8X5_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X5_SRGB_BLOCK16, "RGBA_ASTC_8X5_SRGB_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X6_UNORM_BLOCK16, "RGBA_ASTC_8X6_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X6_SRGB_BLOCK16, "RGBA_ASTC_8X6_SRGB_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X8_UNORM_BLOCK16, "RGBA_ASTC_8X8_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X8_SRGB_BLOCK16, "RGBA_ASTC_8X8_SRGB_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X5_UNORM_BLOCK16, "RGBA_ASTC_10X5_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X5_SRGB_BLOCK16, "RGBA_ASTC_10X5_SRGB_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X6_UNORM_BLOCK16, "RGBA_ASTC_10X6_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X6_SRGB_BLOCK16, "RGBA_ASTC_10X6_SRGB_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X8_UNORM_BLOCK16, "RGBA_ASTC_10X8_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X8_SRGB_BLOCK16, "RGBA_ASTC_10X8_SRGB_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X10_UNORM_BLOCK16, "RGBA_ASTC_10X10_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X10_SRGB_BLOCK16, "RGBA_ASTC_10X10_SRGB_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X10_UNORM_BLOCK16, "RGBA_ASTC_12X10_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X10_SRGB_BLOCK16, "RGBA_ASTC_12X10_SRGB_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X12_UNORM_BLOCK16, "RGBA_ASTC_12X12_UNORM_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  initViewFormats(TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X12_SRGB_BLOCK16, "RGBA_ASTC_12X12_SRGB_BLOCK16", "UNKNOWN", "UNKNOWN", "UNKNOWN");
  function GetViewFormat(textureFormat, viewType, bindFlags) {
    if (!(viewType > TEXTURE_VIEW_TYPE.TEXTURE_VIEW_UNDEFINED && viewType < TEXTURE_VIEW_TYPE.TEXTURE_VIEW_NUM_VIEWS)) {
      throw "unexpected texture view type";
    }
    if (!(textureFormat > TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN && textureFormat < TEXTURE_FORMAT.TEX_FORMAT_NUM_FORMATS)) {
      throw "unknown texture format";
    }
    return VIEW_FORMATS[textureFormat][viewType];
  }

  // src/render-backend/graphics/shader-desc.js
  var SHADER_TYPE = {
    SHADER_TYPE_UNKNOWN: 0,
    SHADER_TYPE_VERTEX: 1,
    SHADER_TYPE_PIXEL: 2,
    SHADER_TYPE_GEOMETRY: 4,
    SHADER_TYPE_HULL: 8,
    SHADER_TYPE_DOMAIN: 16,
    SHADER_TYPE_COMPUTE: 32
  };
  var SHADER_RESOURCE_VARIABLE_TYPE = {
    SHADER_RESOURCE_VARIABLE_TYPE_STATIC: 0,
    SHADER_RESOURCE_VARIABLE_TYPE_MUTABLE: 1,
    SHADER_RESOURCE_VARIABLE_TYPE_DYNAMIC: 2,
    SHADER_RESOURCE_VARIABLE_TYPE_NUM_TYPES: 3
  };

  // src/render-backend/graphics-engine/program.js
  var Program = class {
    constructor(renderDevice2, programDesc) {
      this.render_device = renderDevice2;
      this.desc = programDesc;
      this.num_shaders = 0;
      this.shaders = [];
      if (this.desc.p_cs) {
        if (this.desc.p_vs || this.desc.p_ps || this.desc.p_gs || this.desc.p_hs || this.desc.p_ds) {
          console.warn("compute shader provided, no other shader will take effect");
        }
        this.p_cs = this.desc.p_cs;
        this.shaders[0] = this.p_cs;
        this.num_shaders = 1;
        if (this.p_cs.GetDesc().shader_type != SHADER_TYPE.SHADER_TYPE_COMPUTE) {
          throw "not a shader of COMPUTE type";
        }
      } else {
        if (this.desc.p_vs) {
          this.p_vs = this.desc.p_vs;
          this.shaders[this.num_shaders++] = this.p_vs;
          if (this.p_vs.GetDesc().shader_type != SHADER_TYPE.SHADER_TYPE_VERTEX) {
            throw "not a shader of VERTEX type";
          }
        }
        if (this.desc.p_ps) {
          this.p_ps = this.desc.p_ps;
          this.shaders[this.num_shaders++] = this.p_ps;
          if (this.p_ps.GetDesc().shader_type != SHADER_TYPE.SHADER_TYPE_PIXEL) {
            throw "not a shader of PIXEL type";
          }
        }
        if (this.desc.p_gs) {
          this.p_gs = this.desc.p_gs;
          this.shaders[this.num_shaders++] = this.p_gs;
          if (this.p_gs.GetDesc().shader_type != SHADER_TYPE.SHADER_TYPE_GEOMETRY) {
            throw "not a shader of GEOMETRY type";
          }
        }
        if (this.desc.p_hs) {
          this.p_hs = this.desc.p_hs;
          this.shaders[this.num_shaders++] = this.p_hs;
          if (this.p_hs.GetDesc().shader_type != SHADER_TYPE.SHADER_TYPE_HULL) {
            throw "not a shader of HULL type";
          }
        }
        if (this.desc.p_ds) {
          this.p_ds = this.desc.p_ds;
          this.shaders[this.num_shaders++] = this.p_ds;
          if (this.p_ds.GetDesc().shader_type != SHADER_TYPE.SHADER_TYPE_DOMAIN) {
            throw "not a shader of DOMAIN type";
          }
        }
      }
    }
    GetDesc() {
      return this.desc;
    }
    GetNumShaders() {
      return this.num_shaders;
    }
    Release() {
      throw "need implement";
    }
    GetShader(index) {
      return this.shaders[index];
    }
    GetVS() {
      return this.p_vs;
    }
    GetPS() {
      return this.p_ps;
    }
    GetGS() {
      return this.p_gs;
    }
    GetHS() {
      return this.p_hs;
    }
    GetDS() {
      return this.p_ds;
    }
    GetCS() {
      return this.p_cs;
    }
    GetVSShaderReflection() {
      throw "implementation needed";
    }
    GetPSShaderReflection() {
      throw "implementation needed";
    }
    GetGSShaderReflection() {
      throw "implementation needed";
    }
    GetHSShaderReflection() {
      throw "implementation needed";
    }
    GetDSShaderReflection() {
      throw "implementation needed";
    }
    GetCSShaderReflection() {
      throw "implementation needed";
    }
  };

  // src/render-backend/graphics/device-caps.js
  var MAX_BUFFER_SLOTS = 32;
  var MAX_RENDER_TARGETS = 8;
  var MAX_VIEWPORTS = 16;
  var DEVICE_TYPE = {
    DEVICE_TYPE_UNDEFINED: 0,
    DEVICE_TYPE_OPENGLES: 1,
    DEVICE_TYPE_WEBGPU: 2
  };
  var SamplerCaps = class {
    constructor() {
      this.border_sampling_mode_supported = true;
      this.anisotropic_filtering_supported = true;
      this.lod_bias_supported = true;
    }
  };
  var TextureCaps = class {
    constructor() {
      this.texture1D_supported = true;
      this.texture1D_array_supported = true;
      this.texture2D_multisample_suppored = true;
      this.texture2D_multisample_array_suppored = true;
      this.texture2D_copy_supported = false;
      this.texture2D_load_store_supported = false;
      this.textureview_supported = true;
      this.texture_level_parameter_supported = false;
      this.cubemap_array_supported = false;
    }
  };
  var ResourceLimitCaps = class {
    constructor() {
      this.max_texture_size_1D = 0;
      this.max_texture_size_2D = 0;
      this.max_texture_size_3D = 0;
      this.max_texture_size_cube = 0;
      this.max_texture_array_layers = 0;
      this.max_msaa_sample_count = 0;
    }
  };
  var DeviceCaps = class {
    constructor() {
      this.dev_type = DEVICE_TYPE.DEVICE_TYPE_UNDEFINED;
      this.major_version = 0;
      this.minor_version = 0;
      this.separable_program_supported = false;
      this.indirect_rendering_supported = true;
      this.wireframe_fill_supported = false;
      this.multithread_resource_creation_supported = false;
      this.compute_shader_supported = true;
      this.geometry_shader_supported = true;
      this.tessellation_supported = true;
      this.depth_clamp_supported = true;
      this.shader_binary_supported = false;
      this.independent_blend_supported = true;
      this.reversedz_perspective = false;
      this.multisample_rendertexture_supported = false;
      this.sampler_caps = new SamplerCaps();
      this.texture_caps = new TextureCaps();
      this.limit_caps = new ResourceLimitCaps();
    }
    IsGLDevice() {
      return this.dev_type == DEVICE_TYPE.DEVICE_TYPE_OPENGLES;
    }
  };

  // src/render-backend/graphics/input-layout.js
  var INPUT_ELEMENT_FREQUENCY = {
    INPUT_ELEMENT_FREQUENCY_UNDEFINED: 0,
    INPUT_ELEMENT_FREQUENCY_PER_VERTEX: 1,
    INPUT_ELEMENT_FREQUENCY_PER_INSTANCE: 2,
    INPUT_ELEMENT_FREQUENCY_NUM_FREQUENCIES: 3
  };
  var LayoutElement = class {
    constructor(semanticIndex = 0, bufferSlot = 0, numComponents = 1, valueType = VALUE_TYPE2.VT_FLOAT32, isNormalized = false, relativeOffset = 0, stride = 0, frequency = INPUT_ELEMENT_FREQUENCY.INPUT_ELEMENT_FREQUENCY_PER_VERTEX, instanceDataStepRate = 0) {
      this.semantic_index = semanticIndex;
      this.buffer_slot = bufferSlot;
      this.num_components = numComponents;
      this.value_type = valueType;
      this.is_normalized = isNormalized;
      this.relative_offset = relativeOffset;
      this.stride = stride;
      this.frequency = frequency;
      this.instance_data_step_rate = instanceDataStepRate;
    }
  };
  var InputLayoutDesc = class {
    constructor() {
      this.layout_elements = [];
      this.num_elements = 0;
    }
  };

  // src/render-backend/graphics/pipelinestate-desc.js
  var FILL_MODE = {
    FILL_MODE_UNDEFINED: 0,
    FILL_MODE_WIREFRAME: 1,
    FILL_MODE_SOLID: 2,
    FILL_MODE_NUM_MODES: 3
  };
  var CULL_MODE = {
    CULL_MODE_UNDEFINED: 0,
    CULL_MODE_NONE: 1,
    CULL_MODE_FRONT: 2,
    CULL_MODE_BACK: 3,
    CULL_MODE_NUM_MODES: 4
  };
  var RasterizerStateDesc = class {
    constructor() {
      this.fill_mode = FILL_MODE.FILL_MODE_SOLID;
      this.cull_mode = CULL_MODE.CULL_MODE_BACK;
      this.front_counter_clock_wise = false;
      this.depth_clip_enable = true;
      this.scissor_enable = false;
      this.depth_bias = 0;
      this.slope_scaled_depth_bias = 0;
      this.depth_bias_clamp = 0;
    }
  };
  var BLEND_FACTOR = {
    BLEND_FACTOR_UNDEFINED: 0,
    BLEND_FACTOR_ZERO: 1,
    BLEND_FACTOR_ONE: 2,
    BLEND_FACTOR_SRC_COLOR: 3,
    BLEND_FACTOR_INV_SRC_COLOR: 4,
    BLEND_FACTOR_SRC_ALPHA: 5,
    BLEND_FACTOR_INV_SRC_ALPHA: 6,
    BLEND_FACTOR_DEST_ALPHA: 7,
    BLEND_FACTOR_INV_DEST_ALPHA: 8,
    BLEND_FACTOR_DEST_COLOR: 9,
    BLEND_FACTOR_INV_DEST_COLOR: 10,
    BLEND_FACTOR_SRC_ALPHA_SAT: 11,
    BLEND_FACTOR_BLEND_FACTOR: 12,
    BLEND_FACTOR_INV_BLEND_FACTOR: 13,
    BLEND_FACTOR_SRC1_COLOR: 14,
    BLEND_FACTOR_INV_SRC1_COLOR: 15,
    BLEND_FACTOR_SRC1_ALPHA: 16,
    BLEND_FACTOR_INV_SRC1_ALPHA: 17,
    BLEND_FACTOR_NUM_FACTORS: 18
  };
  var BLEND_OPERATION = {
    BLEND_OPERATION_UNDEFINED: 0,
    BLEND_OPERATION_ADD: 1,
    BLEND_OPERATION_SUBTRACT: 2,
    BLEND_OPERATION_REV_SUBTRACT: 3,
    BLEND_OPERATION_MIN: 4,
    BLEND_OPERATION_MAX: 5,
    BLEND_OPERATION_NUM_OPERATIONS: 6
  };
  var COLOR_MASK = {
    COLOR_MASK_NONE: 0,
    COLOR_MASK_RED: 1,
    COLOR_MASK_GREEN: 2,
    COLOR_MASK_BLUE: 4,
    COLOR_MASK_ALPHA: 8,
    COLOR_MASK_RGB: 7,
    COLOR_MASK_ALL: 15
  };
  var RenderTargetBlendDesc = class {
    constructor() {
      this.blend_enable = false;
      this.src_blend = BLEND_FACTOR.BLEND_FACTOR_ONE;
      this.dest_blend = BLEND_FACTOR.BLEND_FACTOR_ZERO;
      this.blend_op = BLEND_OPERATION.BLEND_OPERATION_ADD;
      this.src_blend_alpha = BLEND_FACTOR.BLEND_FACTOR_ONE;
      this.dest_blend_alpha = BLEND_FACTOR.BLEND_FACTOR_ZERO;
      this.blend_op_alpha = BLEND_OPERATION.BLEND_OPERATION_ADD;
      this.color_mask = COLOR_MASK.COLOR_MASK_ALL;
    }
  };
  var BlendStateDesc = class {
    constructor() {
      this.alpha_to_coverage_enable = false;
      this.independent_blend_enable = false;
      this.render_targets = [];
      for (let i = 0; i < MAX_RENDER_TARGETS; i++) {
        this.render_targets.push(new RenderTargetBlendDesc());
      }
    }
  };
  var STENCIL_OP = {
    STENCIL_OP_UNDEFINED: 0,
    STENCIL_OP_KEEP: 1,
    STENCIL_OP_ZERO: 2,
    STENCIL_OP_REPLACE: 3,
    STENCIL_OP_INCR_SAT: 4,
    STENCIL_OP_DECR_SAT: 5,
    STENCIL_OP_INVERT: 6,
    STENCIL_OP_INCR_WRAP: 7,
    STENCIL_OP_DECR_WRAP: 8,
    STENCIL_OP_NUM_OPS: 9
  };
  var StencilOpDesc = class {
    constructor() {
      this.stencil_fail_op = STENCIL_OP.STENCIL_OP_KEEP;
      this.stencil_depth_fail_op = STENCIL_OP.STENCIL_OP_KEEP;
      this.stencil_pass_op = STENCIL_OP.STENCIL_OP_KEEP;
      this.stencil_func = COMPARISON_FUNCTION.COMPARISON_FUNC_ALWAYS;
    }
  };
  var DepthStencilStateDesc = class {
    constructor() {
      this.depth_enable = true;
      this.depth_write_enable = true;
      this.depth_func = COMPARISON_FUNCTION.COMPARISON_FUNC_LESS;
      this.stencil_enable = false;
      this.stencil_read_mask = 255;
      this.stencil_write_mask = 255;
      this.front_face = new StencilOpDesc();
      this.back_face = new StencilOpDesc();
    }
  };
  var GraphicsPipelineDesc = class {
    constructor() {
      this.program = null;
      this.blend_state_desc = new BlendStateDesc();
      this.sample_mask = 4294967295;
      this.rasterizer_state_desc = new RasterizerStateDesc();
      this.depth_stencil_state_desc = new DepthStencilStateDesc();
      this.input_layout_desc = new InputLayoutDesc();
      this.enable_primitive_restart = false;
      this.primitive_topology = PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_TRIANGLE_LIST;
      this.num_viewports = 1;
      this.num_render_targets = 0;
      this.RTV_formats = [];
      this.DSV_format = TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN;
      this.nodeMask = 0;
    }
  };
  var ComputePipelineDesc = class {
    constructor() {
      this.program = null;
    }
  };
  var PipelineStateDesc = class {
    constructor(reversed) {
      this.is_compute_pipeline = false;
      this.graphics_pipeline_desc = new GraphicsPipelineDesc();
      this.compute_pipeline_desc = new ComputePipelineDesc();
      this.graphics_pipeline_desc.depth_stencil_state_desc.depth_func = reversed ? COMPARISON_FUNCTION.COMPARISON_FUNC_GREATER_EQUAL : COMPARISON_FUNCTION.COMPARISON_FUNC_LESS_EQUAL;
    }
  };

  // src/render-backend/graphics-engine/swapchain.js
  var SwapChain = class {
    constructor(renderDevice2, deviceContext, swapchainDesc) {
      this.render_device = renderDevice2;
      this.device_context = deviceContext;
      this.swap_chain_desc = swapchainDesc;
    }
    Release() {
      throw "need implement";
    }
    Present(syncInterval) {
      throw "implementation needed";
    }
    GetDesc() {
      return this.swap_chain_desc;
    }
    Resize(newWidth, newHeight) {
      if (newWidth != 0 && newHeight != 0 && this.swap_chain_desc.width != newWidth && this.swap_chain_desc.height != newHeight) {
        this.swap_chain_desc.width = newWidth;
        this.swap_chain_desc.height = newHeight;
        return true;
      }
      return false;
    }
    GetCurrentBackBufferRTV() {
      throw "implementation needed";
    }
    GetCurrentBackBufferDSV() {
      throw "implementation needed";
    }
    ReadPixels() {
      throw "implementation needed";
    }
  };

  // src/render-backend/graphics/buffer-desc.js
  var BUFFER_MODE = {
    BUFFER_MODE_UNDEFINED: 0,
    BUFFER_MODE_FORMATTED: 1,
    BUFFER_MODE_STRUCTURED: 2,
    BUFFER_MODE_RAW_VIEWS: 3,
    BUFFER_MODE_NUM_MODES: 4
  };
  var BufferDesc = class {
    constructor() {
      this.size = 0;
      this.bind_flags = BIND_FLAGS.BIND_NONE;
      this.usage = USAGE.USAGE_DEFAULT;
      this.cpu_access_flags = CPU_ACCESS_FLAGS.CPU_ACCESS_NONE;
      this.mode = BUFFER_MODE.BUFFER_MODE_UNDEFINED;
      this.element_stride = 0;
    }
  };
  var BufferData = class {
    constructor() {
      this.data = null;
      this.size = 0;
    }
  };

  // src/render-backend/graphics/buffer-helper.js
  function CreateDefaultVertexBuffer(renderDevice2, byteSize, data, gpuWriteable) {
    const bufferDesc2 = new BufferDesc();
    bufferDesc2.usage = USAGE.USAGE_DEFAULT;
    bufferDesc2.bind_flags = gpuWriteable ? BIND_FLAGS.BIND_VERTEX_BUFFER | BIND_FLAGS.BIND_UNORDERED_ACCESS : BIND_FLAGS.BIND_VERTEX_BUFFER;
    bufferDesc2.size = byteSize;
    const bufferData = new BufferData();
    bufferData.data = data;
    bufferData.size = byteSize;
    return renderDevice2.CreateBuffer(bufferDesc2, bufferData);
  }
  function CreateStaticVertexBuffer(renderDevice2, byteSize, data) {
    const bufferDesc2 = new BufferDesc();
    bufferDesc2.usage = USAGE.USAGE_STATIC;
    bufferDesc2.bind_flags = BIND_FLAGS.BIND_VERTEX_BUFFER;
    bufferDesc2.size = byteSize;
    const bufferData = new BufferData();
    bufferData.data = data;
    bufferData.size = byteSize;
    return renderDevice2.CreateBuffer(bufferDesc2, bufferData);
  }
  function CreateDynamicVertexBuffer(renderDevice2, byteSize, data, gpuWriteable) {
    const bufferDesc2 = new BufferDesc();
    bufferDesc2.usage = USAGE.USAGE_DYNAMIC;
    bufferDesc2.bind_flags = gpuWriteable ? BIND_FLAGS.BIND_VERTEX_BUFFER | BIND_FLAGS.BIND_UNORDERED_ACCESS : BIND_FLAGS.BIND_VERTEX_BUFFER;
    bufferDesc2.size = byteSize;
    const bufferData = new BufferData();
    bufferData.data = data;
    bufferData.size = byteSize;
    return renderDevice2.CreateBuffer(bufferDesc2, bufferData);
  }
  function CreateDefaultIndexBuffer(renderDevice2, byteSize, data, gpuWriteable) {
    const bufferDesc2 = new BufferDesc();
    bufferDesc2.usage = USAGE.USAGE_DEFAULT;
    bufferDesc2.bind_flags = gpuWriteable ? BIND_FLAGS.BIND_INDEX_BUFFER | BIND_FLAGS.BIND_UNORDERED_ACCESS : BIND_FLAGS.BIND_INDEX_BUFFER;
    bufferDesc2.size = byteSize;
    const bufferData = new BufferData();
    bufferData.data = data;
    bufferData.size = byteSize;
    return renderDevice2.CreateBuffer(bufferDesc2, bufferData);
  }
  function CreateStaticIndexBuffer(renderDevice2, byteSize, data) {
    const bufferDesc2 = new BufferDesc();
    bufferDesc2.usage = USAGE.USAGE_STATIC;
    bufferDesc2.bind_flags = BIND_FLAGS.BIND_INDEX_BUFFER;
    bufferDesc2.size = byteSize;
    const bufferData = new BufferData();
    bufferData.data = data;
    bufferData.size = byteSize;
    return renderDevice2.CreateBuffer(bufferDesc2, bufferData);
  }
  function CreateDynamicIndexBuffer(render_device, byteSize, data, gpuWriteable) {
    const bufferDesc2 = new BufferDesc();
    bufferDesc2.usage = USAGE.USAGE_DYNAMIC;
    bufferDesc2.bind_flags = gpuWriteable ? BIND_FLAGS.BIND_INDEX_BUFFER | BIND_FLAGS.BIND_UNORDERED_ACCESS : BIND_FLAGS.BIND_INDEX_BUFFER;
    bufferDesc2.size = byteSize;
    const bufferData = new BufferData();
    bufferData.data = data;
    bufferData.size = byteSize;
    return renderDevice.CreateBuffer(bufferDesc2, bufferData);
  }

  // src/render-backend/graphics-accessories/graphics-accessories.js
  function ComputeMipLevelsCount(width, height = 0, depth = 0) {
    width = Math.max(width, height, depth);
    if (width == 0) {
      return 0;
    }
    let mipLevels = 0;
    while (width >> mipLevels > 0) {
      mipLevels++;
    }
    return mipLevels;
  }
  var FmtAttribs = /* @__PURE__ */ new Map();
  var isInit = false;
  function GetTextureFormatAttribs(format) {
    if (!isInit) {
      isInit = true;
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA32_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_RGBA32_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_RGBA32_TYPELESS, 4, 4, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA32_FLOAT,
        new TextureFormatAttribs("TEX_FORMAT_RGBA32_FLOAT", TEXTURE_FORMAT.TEX_FORMAT_RGBA32_FLOAT, 4, 4, COMPONENT_TYPE.COMPONENT_TYPE_FLOAT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA32_UINT,
        new TextureFormatAttribs("TEX_FORMAT_RGBA32_UINT", TEXTURE_FORMAT.TEX_FORMAT_RGBA32_UINT, 4, 4, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA32_SINT,
        new TextureFormatAttribs("TEX_FORMAT_RGBA32_SINT", TEXTURE_FORMAT.TEX_FORMAT_RGBA32_SINT, 4, 4, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGB32_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_RGB32_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_RGB32_TYPELESS, 4, 3, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGB32_FLOAT,
        new TextureFormatAttribs("TEX_FORMAT_RGB32_FLOAT", TEXTURE_FORMAT.TEX_FORMAT_RGB32_FLOAT, 4, 3, COMPONENT_TYPE.COMPONENT_TYPE_FLOAT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGB32_UINT,
        new TextureFormatAttribs("TEX_FORMAT_RGB32_UINT", TEXTURE_FORMAT.TEX_FORMAT_RGB32_UINT, 4, 3, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGB32_SINT,
        new TextureFormatAttribs("TEX_FORMAT_RGB32_SINT", TEXTURE_FORMAT.TEX_FORMAT_RGB32_SINT, 4, 3, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA16_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_RGBA16_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_RGBA16_TYPELESS, 2, 4, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA16_FLOAT,
        new TextureFormatAttribs("TEX_FORMAT_RGBA16_FLOAT", TEXTURE_FORMAT.TEX_FORMAT_RGBA16_FLOAT, 2, 4, COMPONENT_TYPE.COMPONENT_TYPE_FLOAT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UNORM,
        new TextureFormatAttribs("TEX_FORMAT_RGBA16_UNORM", TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UNORM, 2, 4, COMPONENT_TYPE.COMPONENT_TYPE_UNORM, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UINT,
        new TextureFormatAttribs("TEX_FORMAT_RGBA16_UINT", TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UINT, 2, 4, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SNORM,
        new TextureFormatAttribs("TEX_FORMAT_RGBA16_SNORM", TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SNORM, 2, 4, COMPONENT_TYPE.COMPONENT_TYPE_SNORM, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SINT,
        new TextureFormatAttribs("TEX_FORMAT_RGBA16_SINT", TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SINT, 2, 4, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG32_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_RG32_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_RG32_TYPELESS, 4, 2, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG32_FLOAT,
        new TextureFormatAttribs("TEX_FORMAT_RG32_FLOAT", TEXTURE_FORMAT.TEX_FORMAT_RG32_FLOAT, 4, 2, COMPONENT_TYPE.COMPONENT_TYPE_FLOAT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG32_UINT,
        new TextureFormatAttribs("TEX_FORMAT_RG32_UINT", TEXTURE_FORMAT.TEX_FORMAT_RG32_UINT, 4, 2, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG32_SINT,
        new TextureFormatAttribs("TEX_FORMAT_RG32_SINT", TEXTURE_FORMAT.TEX_FORMAT_RG32_SINT, 4, 2, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R32G8X24_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_R32G8X24_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_R32G8X24_TYPELESS, 4, 2, COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL, true, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT_S8X24_UINT,
        new TextureFormatAttribs("TEX_FORMAT_D32_FLOAT_S8X24_UINT", TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT_S8X24_UINT, 4, 2, COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT_X8X24_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_R32_FLOAT_X8X24_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT_X8X24_TYPELESS, 4, 2, COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_RGB10A2_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_TYPELESS, 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPOUND, true, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_UNORM,
        new TextureFormatAttribs("TEX_FORMAT_RGB10A2_UNORM", TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_UNORM, 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPOUND, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_UINT,
        new TextureFormatAttribs("TEX_FORMAT_RGB10A2_UINT", TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_UINT, 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPOUND, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R11G11B10_FLOAT,
        new TextureFormatAttribs("TEX_FORMAT_R11G11B10_FLOAT", TEXTURE_FORMAT.TEX_FORMAT_R11G11B10_FLOAT, 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPOUND, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA8_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_RGBA8_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_RGBA8_TYPELESS, 1, 4, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM,
        new TextureFormatAttribs("TEX_FORMAT_RGBA8_UNORM", TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM, 1, 4, COMPONENT_TYPE.COMPONENT_TYPE_UNORM, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM_SRGB,
        new TextureFormatAttribs("TEX_FORMAT_RGBA8_UNORM_SRGB", TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM_SRGB, 1, 4, COMPONENT_TYPE.COMPONENT_TYPE_UNORM_SRGB, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UINT,
        new TextureFormatAttribs("TEX_FORMAT_RGBA8_UINT", TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UINT, 1, 4, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SNORM,
        new TextureFormatAttribs("TEX_FORMAT_RGBA8_SNORM", TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SNORM, 1, 4, COMPONENT_TYPE.COMPONENT_TYPE_SNORM, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SINT,
        new TextureFormatAttribs("TEX_FORMAT_RGBA8_SINT", TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SINT, 1, 4, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG16_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_RG16_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_RG16_TYPELESS, 2, 2, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG16_FLOAT,
        new TextureFormatAttribs("TEX_FORMAT_RG16_FLOAT", TEXTURE_FORMAT.TEX_FORMAT_RG16_FLOAT, 2, 2, COMPONENT_TYPE.COMPONENT_TYPE_FLOAT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG16_UNORM,
        new TextureFormatAttribs("TEX_FORMAT_RG16_UNORM", TEXTURE_FORMAT.TEX_FORMAT_RG16_UNORM, 2, 2, COMPONENT_TYPE.COMPONENT_TYPE_UNORM, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG16_UINT,
        new TextureFormatAttribs("TEX_FORMAT_RG16_UINT", TEXTURE_FORMAT.TEX_FORMAT_RG16_UINT, 2, 2, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG16_SNORM,
        new TextureFormatAttribs("TEX_FORMAT_RG16_SNORM", TEXTURE_FORMAT.TEX_FORMAT_RG16_SNORM, 2, 2, COMPONENT_TYPE.COMPONENT_TYPE_SNORM, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG16_SINT,
        new TextureFormatAttribs("TEX_FORMAT_RG16_SINT", TEXTURE_FORMAT.TEX_FORMAT_RG16_SINT, 2, 2, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R32_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_R32_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_R32_TYPELESS, 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT,
        new TextureFormatAttribs("TEX_FORMAT_D32_FLOAT", TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT, 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_DEPTH, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT,
        new TextureFormatAttribs("TEX_FORMAT_R32_FLOAT", TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT, 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_FLOAT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R32_UINT,
        new TextureFormatAttribs("TEX_FORMAT_R32_UINT", TEXTURE_FORMAT.TEX_FORMAT_R32_UINT, 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R32_SINT,
        new TextureFormatAttribs("TEX_FORMAT_R32_SINT", TEXTURE_FORMAT.TEX_FORMAT_R32_SINT, 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R24G8_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_R24G8_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_R24G8_TYPELESS, 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL, true, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_D24_UNORM_S8_UINT,
        new TextureFormatAttribs("TEX_FORMAT_RGB10A2_UNORM", TEXTURE_FORMAT.TEX_FORMAT_D24_UNORM_S8_UINT, 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R24_UNORM_X8_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_R24_UNORM_X8_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_R24_UNORM_X8_TYPELESS, 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG8_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_RG8_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_RG8_TYPELESS, 1, 2, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG8_UNORM,
        new TextureFormatAttribs("TEX_FORMAT_RG8_UNORM", TEXTURE_FORMAT.TEX_FORMAT_RG8_UNORM, 1, 2, COMPONENT_TYPE.COMPONENT_TYPE_UNORM, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG8_UINT,
        new TextureFormatAttribs("TEX_FORMAT_RG8_UINT", TEXTURE_FORMAT.TEX_FORMAT_RG8_UINT, 1, 2, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG8_SNORM,
        new TextureFormatAttribs("TEX_FORMAT_RG8_SNORM", TEXTURE_FORMAT.TEX_FORMAT_RG8_SNORM, 1, 2, COMPONENT_TYPE.COMPONENT_TYPE_SNORM, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RG8_SINT,
        new TextureFormatAttribs("TEX_FORMAT_RG8_SINT", TEXTURE_FORMAT.TEX_FORMAT_RG8_SINT, 1, 2, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R16_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_R16_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_R16_TYPELESS, 2, 1, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R16_FLOAT,
        new TextureFormatAttribs("TEX_FORMAT_R16_FLOAT", TEXTURE_FORMAT.TEX_FORMAT_R16_FLOAT, 2, 1, COMPONENT_TYPE.COMPONENT_TYPE_FLOAT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_D16_UNORM,
        new TextureFormatAttribs("TEX_FORMAT_D16_UNORM", TEXTURE_FORMAT.TEX_FORMAT_D16_UNORM, 2, 1, COMPONENT_TYPE.COMPONENT_TYPE_UNORM, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R16_UNORM,
        new TextureFormatAttribs("TEX_FORMAT_R16_UNORM", TEXTURE_FORMAT.TEX_FORMAT_R16_UNORM, 2, 1, COMPONENT_TYPE.COMPONENT_TYPE_UNORM, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R16_UINT,
        new TextureFormatAttribs("TEX_FORMAT_R16_UINT", TEXTURE_FORMAT.TEX_FORMAT_R16_UINT, 2, 1, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R16_SNORM,
        new TextureFormatAttribs("TEX_FORMAT_R16_SNORM", TEXTURE_FORMAT.TEX_FORMAT_R16_SNORM, 2, 1, COMPONENT_TYPE.COMPONENT_TYPE_SNORM, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R16_SINT,
        new TextureFormatAttribs("TEX_FORMAT_R16_SINT", TEXTURE_FORMAT.TEX_FORMAT_R16_SINT, 2, 1, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R8_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_R8_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_R8_TYPELESS, 1, 1, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R8_UNORM,
        new TextureFormatAttribs("TEX_FORMAT_R8_UNORM", TEXTURE_FORMAT.TEX_FORMAT_R8_UNORM, 1, 1, COMPONENT_TYPE.COMPONENT_TYPE_UNORM, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R8_UINT,
        new TextureFormatAttribs("TEX_FORMAT_R8_UINT", TEXTURE_FORMAT.TEX_FORMAT_R8_UINT, 1, 1, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM,
        new TextureFormatAttribs("TEX_FORMAT_R8_SNORM", TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM, 1, 1, COMPONENT_TYPE.COMPONENT_TYPE_SNORM, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_R8_SINT,
        new TextureFormatAttribs("TEX_FORMAT_R8_SINT", TEXTURE_FORMAT.TEX_FORMAT_R8_SINT, 1, 1, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGB9E5_SHAREDEXP,
        new TextureFormatAttribs("TEX_FORMAT_RGB9E5_SHAREDEXP", TEXTURE_FORMAT.TEX_FORMAT_RGB9E5_SHAREDEXP, 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPOUND, false, 1, 1)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC1_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_BC1_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_BC1_TYPELESS, 8, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, true, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM,
        new TextureFormatAttribs("TEX_FORMAT_BC1_UNORM", TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM, 8, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM_SRGB,
        new TextureFormatAttribs("TEX_FORMAT_BC1_UNORM_SRGB", TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM_SRGB, 8, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC2_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_BC2_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_BC2_TYPELESS, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, true, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM,
        new TextureFormatAttribs("TEX_FORMAT_BC2_UNORM", TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM_SRGB,
        new TextureFormatAttribs("TEX_FORMAT_BC2_UNORM_SRGB", TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM_SRGB, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC3_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_BC3_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_BC3_TYPELESS, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, true, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM,
        new TextureFormatAttribs("TEX_FORMAT_BC3_UNORM", TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM_SRGB,
        new TextureFormatAttribs("TEX_FORMAT_BC3_UNORM_SRGB", TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM_SRGB, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC4_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_BC4_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_BC4_TYPELESS, 8, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, true, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC4_UNORM,
        new TextureFormatAttribs("TEX_FORMAT_BC4_UNORM", TEXTURE_FORMAT.TEX_FORMAT_BC4_UNORM, 8, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC4_SNORM,
        new TextureFormatAttribs("TEX_FORMAT_BC4_SNORM", TEXTURE_FORMAT.TEX_FORMAT_BC4_SNORM, 8, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC5_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_BC5_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_BC5_TYPELESS, 16, 2, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, true, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC5_UNORM,
        new TextureFormatAttribs("TEX_FORMAT_BC5_UNORM", TEXTURE_FORMAT.TEX_FORMAT_BC5_UNORM, 16, 2, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC5_SNORM,
        new TextureFormatAttribs("TEX_FORMAT_BC5_SNORM", TEXTURE_FORMAT.TEX_FORMAT_BC5_SNORM, 16, 2, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC6H_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_BC6H_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_BC6H_TYPELESS, 16, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, true, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC6H_UF16,
        new TextureFormatAttribs("TEX_FORMAT_BC6H_UF16", TEXTURE_FORMAT.TEX_FORMAT_BC6H_UF16, 16, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC6H_SF16,
        new TextureFormatAttribs("TEX_FORMAT_BC6H_SF16", TEXTURE_FORMAT.TEX_FORMAT_BC6H_SF16, 16, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC7_TYPELESS,
        new TextureFormatAttribs("TEX_FORMAT_BC7_TYPELESS", TEXTURE_FORMAT.TEX_FORMAT_BC7_TYPELESS, 16, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, true, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC7_UNORM,
        new TextureFormatAttribs("TEX_FORMAT_BC7_UNORM", TEXTURE_FORMAT.TEX_FORMAT_BC7_UNORM, 16, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_BC7_UNORM_SRGB,
        new TextureFormatAttribs("TEX_FORMAT_BC7_UNORM_SRGB", TEXTURE_FORMAT.TEX_FORMAT_BC7_UNORM_SRGB, 16, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGB_ETC2_UNORM_BLOCK8,
        new TextureFormatAttribs("TEX_FORMAT_RGB_ETC2_UNORM_BLOCK8", TEXTURE_FORMAT.TEX_FORMAT_RGB_ETC2_UNORM_BLOCK8, 8, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGB_ETC2_SRGB_BLOCK8,
        new TextureFormatAttribs("TEX_FORMAT_RGB_ETC2_SRGB_BLOCK8", TEXTURE_FORMAT.TEX_FORMAT_RGB_ETC2_SRGB_BLOCK8, 8, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_UNORM_BLOCK8,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ETC2_UNORM_BLOCK8", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_UNORM_BLOCK8, 8, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_SRGB_BLOCK8,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ETC2_SRGB_BLOCK8", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_SRGB_BLOCK8, 8, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ETC2_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ETC2_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_4X4_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_4X4_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_4X4_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_4X4_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_4X4_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_4X4_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X4_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_5X4_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X4_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 5, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X4_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_5X4_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X4_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 5, 4)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X5_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_5X5_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X5_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 5, 5)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X5_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_5X5_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X5_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 5, 5)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X5_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_5X5_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X5_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 5, 5)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X5_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_5X5_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X5_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 5, 5)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X5_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_6X5_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X5_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 6, 5)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X5_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_6X5_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X5_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 6, 5)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X6_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_6X6_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X6_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 6, 6)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X6_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_6X6_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X6_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 6, 6)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X5_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_8X5_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X5_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 8, 5)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X5_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_8X5_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X5_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 8, 5)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X6_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_8X6_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X6_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 8, 6)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X6_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_8X6_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X6_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 8, 6)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X8_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_8X8_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X8_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 8, 8)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X8_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_8X8_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X8_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 8, 8)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X5_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_10X5_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X5_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 10, 5)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X5_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_10X5_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X5_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 10, 5)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X6_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_10X6_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X6_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 10, 6)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X6_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_10X6_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X6_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 10, 6)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X8_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_10X8_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X8_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 10, 8)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X8_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_10X8_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X8_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 10, 8)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X10_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_10X10_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X10_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 10, 10)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X10_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_10X10_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X10_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 10, 10)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X10_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_12X10_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X10_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 12, 10)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X10_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_12X10_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X10_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 12, 10)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X12_UNORM_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_12X12_UNORM_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X12_UNORM_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 12, 12)
      );
      FmtAttribs.set(
        TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X12_SRGB_BLOCK16,
        new TextureFormatAttribs("TEX_FORMAT_RGBA_ASTC_12X12_SRGB_BLOCK16", TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X12_SRGB_BLOCK16, 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 12, 12)
      );
    }
    if (format >= TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN && format < TEXTURE_FORMAT.TEX_FORMAT_NUM_FORMATS) {
      return FmtAttribs.get(format);
    } else {
      return new TextureFormatAttribs();
    }
  }
  function GetValueSize(inputElementType) {
    switch (inputElementType) {
      case VALUE_TYPE2.VT_UINT8:
        return 1;
      case VALUE_TYPE2.VT_INT8:
        return 1;
      case VALUE_TYPE2.VT_UINT16:
        return 2;
      case VALUE_TYPE2.VT_INT16:
        return 2;
      case VALUE_TYPE2.VT_UINT32:
        return 4;
      case VALUE_TYPE2.VT_INT32:
        return 4;
      case VALUE_TYPE2.VT_FLOAT16:
        return 2;
      case VALUE_TYPE2.VT_FLOAT32:
        return 4;
    }
  }

  // src/render-backend/graphics-engine/render-device.js
  var EngineCreationAttribs = class {
    constructor() {
      this.custom_device_caps = new DeviceCaps();
    }
  };
  var RenderDevice = class {
    constructor(customDeviceCaps, numDeferredContexts) {
      this.device_caps = customDeviceCaps;
      this.texture_format_infos = [];
      this.texture_format_init_flags = [];
      const filterable_formats = /* @__PURE__ */ new Set();
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RGBA32_FLOAT);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_FLOAT);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RG32_FLOAT);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT_X8X24_TYPELESS);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_R11G11B10_FLOAT);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM_SRGB);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RG16_FLOAT);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RG16_UNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RG16_SNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_R24_UNORM_X8_TYPELESS);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RG8_UNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RG8_SNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_R16_FLOAT);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_R16_UNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_R16_SNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_R8_UNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RGB9E5_SHAREDEXP);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM_SRGB);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM_SRGB);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM_SRGB);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_BC4_SNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_BC4_UNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_BC5_SNORM);
      filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_BC5_UNORM);
      for (let key in TEXTURE_FORMAT) {
        if (TEXTURE_FORMAT[key] > TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN && TEXTURE_FORMAT[key] < TEXTURE_FORMAT.TEX_FORMAT_NUM_FORMATS) {
          const textureFormatInfo = new TextureFormatInfo(GetTextureFormatAttribs(TEXTURE_FORMAT[key]));
          if (filterable_formats.has(key)) {
            textureFormatInfo.filterable = true;
          }
          this.texture_format_infos[TEXTURE_FORMAT[key]] = textureFormatInfo;
          this.texture_format_init_flags[TEXTURE_FORMAT[key]] = false;
        }
      }
      this.immediate_context = null;
    }
    GetDeviceCaps() {
      return this.device_caps;
    }
    GetTextureFormatInfo(textureFormat) {
      if (textureFormat <= TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN || textureFormat >= TEXTURE_FORMAT.TEX_FORMAT_NUM_FORMATS) {
        throw "texture format out of range";
      }
      const textureFormatInfo = this.texture_format_infos[textureFormat];
      if (textureFormat.format != textureFormat) {
        throw "texture format check fail";
      }
      if (!this.texture_format_init_flags[textureFormat]) {
        if (textureFormatInfo.supported) {
          this.TestTextureFormat(textureFormat);
          this.texture_format_init_flags[textureFormat] = true;
        }
      }
      return textureFormatInfo;
    }
    TestTextureFormat(textureFormat) {
      throw "implementation needed";
    }
    SetImmediateContext(context) {
      if (this.immediate_context) {
        throw "immediate context has already been set";
      }
      this.immediate_context = context;
    }
    GetImmediateContext() {
      return this.immediate_context;
    }
    InitDeviceLimits() {
      throw "implementation needed";
    }
    CreateBuffer(bufferDesc2, bufferData) {
      throw "implementation needed";
    }
    CreateShader(creationAttribs) {
      throw "implementation needed";
    }
    CreateProgram(programDesc) {
      throw "implementation needed";
    }
    CreateTexture(textureDesc, textureData) {
      throw "implementation needed";
    }
    CreateSampler(samplerDesc) {
      throw "implementation needed";
    }
    CreatePipelineState(pipelineStateDesc) {
      throw "implementation needed";
    }
  };

  // src/render-backend/graphics/bufferview-desc.js
  var BufferFormat = class {
    constructor() {
      this.value_type = VALUE_TYPE.VT_UNDEFINED;
      this.num_components = 0;
      this.is_normalized = true;
    }
  };
  var BufferViewDesc = class {
    constructor() {
      this.view_type = BUFFER_VIEW_TYPE.BUFFER_VIEW_UNDEFINED;
      this.format = new BufferFormat();
      this.byte_offset = 0;
      this.byte_width = 0;
    }
  };

  // src/render-backend/graphics-engine/buffer.js
  function CorrectBufferViewDesc(bufferViewDesc, bufferDesc2) {
    if (bufferViewDesc.byte_width == 0) {
      bufferViewDesc.byte_width = bufferDesc2.size;
    }
    if (bufferViewDesc.byte_width + bufferViewDesc.byte_offset > bufferDesc2.size) {
      throw `bufferview range is out of buffer bounary`;
    }
    if (bufferDesc2.bind_flags & BIND_FLAGS.BIND_SHADER_RESOURCE || bufferDesc2.bind_flags & BIND_FLAGS.BIND_UNORDERED_ACCESS) {
      if (bufferDesc2.element_stride == 0) {
        throw "buffer element stride is zero";
      }
      if (bufferViewDesc.byte_offset % bufferDesc2.element_stride != 0) {
        throw "bufferview byte offset is not multiple of buffer element stride";
      }
      if (bufferViewDesc.byte_width % bufferDesc2.element_stride != 0) {
        throw "bufferview byte width is not multiple of buffer element stride";
      }
    }
  }
  var Buffer = class {
    constructor(renderDevice2, bufferDesc2) {
      const allowedBindFlags = BIND_FLAGS.BIND_VERTEX_BUFFER | BIND_FLAGS.BIND_UNIFORM_BUFFER | BIND_FLAGS.BIND_INDEX_BUFFER | BIND_FLAGS.BIND_SHADER_RESOURCE | BIND_FLAGS.BIND_UNORDERED_ACCESS | BIND_FLAGS.BIND_INDIRECT_DRAW_ARGS | BIND_FLAGS.BIND_STREAM_OUTPUT;
      if (bufferDesc2.bind_flags & ~allowedBindFlags) {
        throw "Incorrect bind flags specified";
      }
      if (bufferDesc2.bind_flags & BIND_FLAGS.BIND_UNORDERED_ACCESS || bufferDesc2.bind_flags & BIND_FLAGS.BIND_SHADER_RESOURCE) {
        if (bufferDesc2.mode <= BUFFER_MODE.BUFFER_MODE_UNDEFINED || bufferDesc2.mode >= BUFFER_MODE.BUFFER_MODE_NUM_MODES) {
          throw "Buffer mode is incorrect";
        }
        if (bufferDesc2.mode == BUFFER_MODE.BUFFER_MODE_STRUCTURED || bufferDesc2.mode == BUFFER_MODE.BUFFER_MODE_FORMATTED) {
          if (bufferDesc2.element_stride != 0) {
            throw "Element stride cannot be zero for structured buffer";
          }
        }
      }
      if (bufferDesc2.bind_flags & BIND_FLAGS.BIND_UNIFORM_BUFFER && bufferDesc2.size % (4 * 4)) {
        const align_size = 4 * 4;
        const new_size = Math.floor((bufferDesc2.size + align_size - 1) / align_size) * align_size;
        console.warn("align uniform buffer to float4");
        bufferDesc2.size = new_size;
      }
      if (bufferDesc2.bind_flags & BIND_FLAGS.BIND_UNIFORM_BUFFER && bufferDesc2.size > 6400) {
        console.warn("uniform buffer size is greater than 6400, will be error on ios safari");
      }
      this.render_device = renderDevice2;
      this.desc = bufferDesc2;
      this.default_SRV = null;
      this.default_UAV = null;
      this.created_buffer_views = /* @__PURE__ */ new Map();
    }
    GetDesc() {
      return this.desc;
    }
    Release() {
      for (let [key, view] of this.created_buffer_views) {
        view.Release();
      }
    }
    UpdateData(deviceContext, offset, size, data) {
      if (this.desc.usage != USAGE.USAGE_DEFAULT) {
        throw "only default usage buffers can be updated with UpdateBuffer";
      }
      if (offset >= this.desc.size) {
        throw "offset exceeds the buffer size";
      }
      if (offset + size > this.desc.size) {
        throw "update range is not valid";
      }
    }
    CopyData(deviceContext, srcBuffer, srcOffset, dstOffset, size) {
      if (dstOffset + size > this.desc.size) {
        throw "destination range is not valid";
      }
      if (srcOffset + size > srcBuffer.GetDesc().size) {
        throw "source range is nnont valid";
      }
    }
    Map(deviceContext, mapType, mapFlags, mappedData) {
      switch (mapType) {
        case MAP_TYPE.MAP_READ:
          if (this.desc.cpu_access_flags != CPU_ACCESS_FLAGS.CPU_ACCESS_READ) {
            throw "buffer being mapped for reading not created with CPU_ACCESS_READ flag";
          }
          if (mapFlags & MAP_FLAGS.MAP_FLAG_DISCARD) {
            console.warn("MAP_FLAG_DISCARD is not valid when mapping buffer for reading");
          }
          break;
        case MAP_TYPE.MAP_WRITE:
          if (this.desc.usage != USAGE.USAGE_DYNAMIC) {
            throw "only buffer with usage USAGE_DYNAMIC can be mapped for writing";
          }
          if (this.desc.cpu_access_flags != CPU_ACCESS_FLAGS.CPU_ACCESS_WRITE) {
            throw "buffer being mapped for writing was not created with CPU_ACCESS_WRITE flag";
          }
          break;
        case MAP_TYPE.MAP_READ_WRITE:
          if (this.desc.cpu_access_flags != CPU_ACCESS_FLAGS.CPU_ACCESS_READ) {
            throw "buffer being mapped for reading not created with CPU_ACCESS_READ flag";
          }
          if (this.desc.cpu_access_flags != CPU_ACCESS_FLAGS.CPU_ACCESS_WRITE) {
            throw "buffer being mapped for writing was not created with CPU_ACCESS_WRITE flag";
          }
          break;
        default:
          throw "unknown map type";
      }
      if (this.desc.usage == USAGE.USAGE_DYNAMIC) {
        if (!(mapFlags & MAP_FLAGS.MAP_FLAG_DISCARD) || mapType != MAP_TYPE.MAP_WRITE) {
          throw "dynamic buffers can only be mapped for writing with discard flag";
        }
      }
      if ((mapFlags & MAP_FLAGS.MAP_FLAG_DISCARD) != 0) {
        if (this.desc.usage != USAGE.USAGE_DYNAMIC) {
          console.warn("only dynamic and staging buffers can be mapped with discard flag");
        }
        if (mapType != MAP_TYPE.MAP_WRITE) {
          console.warn("MAP_FLAG_DISCARD is only valid when mapping buffer for writing");
        }
      }
    }
    Unmap(deviceContext, mapType, mapFlags) {
      throw "implementation needed";
    }
    CreateViewInternal(bufferViewDesc) {
      throw "implementation needed";
    }
    CreateView(viewDesc) {
      let view = this.created_buffer_views.get(viewDesc);
      if (!view) {
        view = this.CreateViewInternal(viewDesc);
        this.created_buffer_views.set(viewDesc, view);
      }
      return view;
    }
    CreateDefaultViews() {
      if (this.desc.bind_flags & BIND_FLAGS.BIND_SHADER_RESOURCE) {
        const viewDesc = new BufferViewDesc();
        viewDesc.view_type = BUFFER_VIEW_TYPE.BUFFER_VIEW_SHADER_RESOURCE;
        this.default_SRV = this.CreateViewInternal(viewDesc);
        this.created_buffer_views.set(viewDesc, this.default_SRV);
      }
      if (this.desc.bind_flags & BIND_FLAGS.BIND_UNORDERED_ACCESS) {
        const viewDesc = new BufferViewDesc();
        viewDesc.view_type = BUFFER_VIEW_TYPE.BUFFER_VIEW_UNORDERED_ACCESS;
        this.default_UAV = this.CreateViewInternal(viewDesc);
        this.created_buffer_views.set(viewDesc, this.default_UAV);
      }
    }
    GetDefaultView(view_type) {
      switch (view_type) {
        case BUFFER_VIEW_TYPE.BUFFER_VIEW_SHADER_RESOURCE:
          return this.default_SRV;
        case BUFFER_VIEW_TYPE.BUFFER_VIEW_SHADER_RESOURCE:
          return this.default_UAV;
        default:
          throw "Unknown view type";
      }
    }
  };

  // src/render-backend/graphics-engine/bufferview.js
  var BufferView = class {
    constructor(renderDevice2, viewDesc, buffer) {
      this.render_device = renderDevice2;
      this.desc = viewDesc;
      this.buffer = buffer;
    }
    GetDesc() {
      return this.desc;
    }
    GetBuffer() {
      return this.buffer;
    }
    Release() {
      throw "need implement";
    }
  };

  // src/render-backend/graphics-engine-webgl/bufferview-gl.js
  var BufferViewGL = class extends BufferView {
    constructor(renderDevice2, deviceContext, viewDesc, buffer) {
      super(renderDevice2, viewDesc, buffer);
    }
    Release() {
    }
  };

  // src/render-backend/graphics-engine-webgl/gl.js
  var canvas = document.createElement("canvas");
  var gl = canvas.getContext("webgl2");
  function CompareFuncToGLCompare(func) {
    switch (func) {
      case COMPARISON_FUNCTION.COMPARISON_FUNC_NEVER:
        return gl.NEVER;
      case COMPARISON_FUNCTION.COMPARISON_FUNC_LESS:
        return gl.LESS;
      case COMPARISON_FUNCTION.COMPARISON_FUNC_EQUAL:
        return gl.EQUAL;
      case COMPARISON_FUNCTION.COMPARISON_FUNC_LESS_EQUAL:
        return gl.LEQUAL;
      case COMPARISON_FUNCTION.COMPARISON_FUNC_GREATER:
        return gl.GREATER;
      case COMPARISON_FUNCTION.COMPARISON_FUNC_GREATER_EQUAL:
        return gl.GEQUAL;
      case COMPARISON_FUNCTION.COMPARISON_FUNC_NOT_EQUAL:
        return gl.NOTEQUAL;
      case COMPARISON_FUNCTION.COMPARISON_FUNC_ALWAYS:
        return gl.ALWAYS;
      default:
        console.warn("unknown comparison func");
        return gl.ALWAYS;
    }
  }
  var GL_STENCIL_OPS = [];
  GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_KEEP] = gl.KEEP;
  GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_ZERO] = gl.ZERO;
  GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_REPLACE] = gl.REPLACE;
  GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_INCR_SAT] = gl.INCR;
  GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_DECR_SAT] = gl.DECR;
  GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_INVERT] = gl.INVERT;
  GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_INCR_WRAP] = gl.INCR_WRAP;
  GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_DECR_WRAP] = gl.DECR_WRAP;
  function StencilOpToGLStencilOp(stencilOp) {
    if (stencilOp > STENCIL_OP.STENCIL_OP_UNDEFINED && stencilOp < STENCIL_OP.STENCIL_OP_NUM_OPS) {
      const gl_stencil_op = GL_STENCIL_OPS[stencilOp];
      return gl_stencil_op;
    } else {
      throw `stencil operation is out of range`;
    }
  }
  var GL_BLEND = [];
  GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_ZERO] = gl.ZERO;
  GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_ONE] = gl.ONE;
  GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_SRC_COLOR] = gl.SRC_COLOR;
  GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_INV_SRC_COLOR] = gl.ONE_MINUS_SRC_COLOR;
  GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_SRC_ALPHA] = gl.SRC_ALPHA;
  GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_INV_SRC_ALPHA] = gl.ONE_MINUS_SRC_ALPHA;
  GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_DEST_COLOR] = gl.DST_COLOR;
  GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_INV_DEST_COLOR] = gl.ONE_MINUS_DST_COLOR;
  GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_DEST_ALPHA] = gl.DST_ALPHA;
  GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_INV_DEST_ALPHA] = gl.ONE_MINUS_DST_ALPHA;
  GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_SRC_ALPHA_SAT] = gl.SRC_ALPHA_SATURATE;
  GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_BLEND_FACTOR] = gl.CONSTANT_COLOR;
  GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_INV_BLEND_FACTOR] = gl.ONE_MINUS_CONSTANT_COLOR;
  function BlendFactorToGLBlend(blendFactor) {
    if (blendFactor > BLEND_FACTOR.BLEND_FACTOR_UNDEFINED && blendFactor < BLEND_FACTOR.BLEND_FACTOR_NUM_FACTORS) {
      return GL_BLEND[blendFactor];
    } else {
      throw "Incorrect blend factor";
    }
  }
  var GL_BLEND_OP = [];
  GL_BLEND_OP[BLEND_OPERATION.BLEND_OPERATION_ADD] = gl.FUNC_ADD;
  GL_BLEND_OP[BLEND_OPERATION.BLEND_OPERATION_SUBTRACT] = gl.FUNC_SUBTRACT;
  GL_BLEND_OP[BLEND_OPERATION.BLEND_OPERATION_REV_SUBTRACT] = gl.FUNC_REVERSE_SUBTRACT;
  GL_BLEND_OP[BLEND_OPERATION.BLEND_OPERATION_MIN] = gl.MIN;
  GL_BLEND_OP[BLEND_OPERATION.BLEND_OPERATION_MAX] = gl.MAX;
  function BlendOperation2GLBlendOp(blendOp) {
    if (blendOp > BLEND_OPERATION.BLEND_OPERATION_UNDEFINED && blendOp < BLEND_OPERATION.BLEND_OPERATION_NUM_OPERATIONS) {
      return GL_BLEND_OP[blendOp];
    } else {
      throw "Incorrect blend operation";
    }
  }
  var Memory = new ArrayBuffer(16 * 1024 * 1024);
  var HEAP8 = new Int8Array(Memory);
  var HEAPU8 = new Uint8Array(Memory);
  var HEAP16 = new Int16Array(Memory);
  var HEAPU16 = new Uint16Array(Memory);
  var HEAPF32 = new Float32Array(Memory);

  // src/render-backend/graphics-engine-webgl/buffer-gl.js
  function UsageToGLUsage(usage) {
    switch (usage) {
      case USAGE.USAGE_STATIC:
        return gl.STATIC_DRAW;
        return 35044;
      case USAGE.USAGE_DEFAULT:
        return gl.DYNAMIC_DRAW;
        return 35048;
      case USAGE.USAGE_DYNAMIC:
        return gl.STREAM_DRAW;
        return 35040;
      case USAGE.USAGE_STAGING:
        return gl.DYNAMIC_READ;
        return 35049;
    }
  }
  function GetBufferBindTarget(bufferDesc2) {
    let target = gl.ARRAY_BUFFER;
    if (bufferDesc2.bind_flags == BIND_FLAGS.BIND_VERTEX_BUFFER) {
      target = gl.ARRAY_BUFFER;
    } else if (bufferDesc2.bind_flags == BIND_FLAGS.BIND_INDEX_BUFFER) {
      target = gl.ELEMENT_ARRAY_BUFFER;
    } else if (bufferDesc2.bind_flags == BIND_FLAGS.BIND_UNIFORM_BUFFER) {
      target = gl.UNIFORM_BUFFER;
    } else if (bufferDesc2.bind_flags == BIND_FLAGS.BIND_INDIRECT_DRAW_ARGS) {
      throw "indirect draw are not supported";
    } else if (bufferDesc2.usage == USAGE.USAGE_STAGING && bufferDesc2.cpu_access_flags == CPU_ACCESS_FLAGS.CPU_ACCESS_WRITE) {
      target = gl.PIXEL_UNPACK_BUFFER;
      target = 35052;
    }
    return target;
  }
  var BufferGL = class extends Buffer {
    constructor(renderDevice2, bufferDesc2, bufferData, glHandle = null) {
      super(renderDevice2, bufferDesc2);
      this.map_target = 0;
      this.gl_usage_hint = UsageToGLUsage(bufferDesc2.usage);
      this.gl_buffer = gl.createBuffer();
      if (bufferDesc2.usage == USAGE.USAGE_STATIC && !bufferData.data) {
        throw "Static buffer must be initialized with data at creation time";
      }
      const target = GetBufferBindTarget(bufferDesc2);
      gl.bindBuffer(target, this.gl_buffer);
      if (!bufferData.data && bufferData.size < bufferDesc2.size) {
        throw "data is not null and data size is not consistent with buffer size";
      }
      let dataSize = bufferDesc2.size;
      let data = null;
      if (bufferData.data && bufferData.size >= bufferDesc2.size) {
        data = bufferData.data;
        dataSize = bufferData.size;
      }
      if (data && dataSize) {
        gl.bufferData(target, data, this.gl_usage_hint, 0, dataSize);
      } else {
        gl.bufferData(target, dataSize, this.gl_usage_hint);
      }
      gl.bindBuffer(target, 0);
    }
    GetGLBuffer() {
      return this.gl_buffer;
    }
    Release() {
      super.Release();
      this.render_device.OnDestroyBuffer(this);
      gl.deleteBuffer(this.gl_buffer);
    }
    UpdateData(deviceContext, offset, size, data) {
      super.UpdateData(deviceContext, offset, size, data);
      const target = GetBufferBindTarget(bufferDesc);
      gl.bindBuffer(target, this.gl_buffer);
      if (size) {
        gl.bufferSubData(target, offset, size, data);
      }
      gl.bindBuffer(target, 0);
    }
    CopyData(deviceContext, srcBuffer, srcOffset, dstOffset, size) {
      super.CopyData(deviceContext, srcBuffer, srcOffset, dstOffset, size);
      gl.bindBuffer(gl.COPY_WRITE_BUFFER, this.gl_buffer);
      gl.bindBuffer(gl.COPY_READ_BUFFER, srcBuffer.gl_buffer);
      gl.copyBufferSubData(gl.COPY_READ_BUFFER, gl.COPY_WRITE_BUFFER, srcOffset, dstOffset, size);
      gl.bindBuffer(gl.COPY_WRITE_BUFFER, 0);
      gl.bindBuffer(gl.COPY_READ_BUFFER, 0);
    }
    Map(deviceContext, mapType, mapFlags, mappedData) {
      super.Map(deviceContext, mapType, mapFlags, mappedData);
      throw "not suppoerted in WebGL";
    }
    Unmap(deviceContext, mapType, mapFlags) {
      throw "not suppoerted in WebGL";
    }
    BufferMemoryBarrier(requiredBarriers, glContextState) {
    }
    CreateViewInternal(bufferViewDesc) {
      CorrectBufferViewDesc(bufferViewDesc, this.desc);
      const renderDevice2 = this.render_device;
      const deviceContext = renderDevice2.GetImmediateContext();
      return new BufferViewGL(renderDevice2, deviceContext, bufferViewDesc, this);
    }
  };

  // src/render-backend/graphics-engine-webgl/gl-context.js
  var CURRENT_CONTEXT = null;
  function MakeContextCurrent(ctx) {
    CURRENT_CONTEXT = ctx;
  }
  function GetCurrentContext() {
    return CURRENT_CONTEXT;
  }
  var CANVAS = null;
  function SetCanvas(canvas2) {
    CANVAS = canvas2;
  }
  function GetCanvas() {
    return CANVAS;
  }
  var GLContext = class {
    constructor(engineAttribs, deviceCaps2) {
      this.context_creation_type = engineAttribs.context_creation_type;
      this.device_type = engineAttribs.device_type;
      this.InitContext(engineAttribs, deviceCaps2);
      this.CheckFeatures(engineAttribs, deviceCaps2);
    }
    GetCurrentNativeGLContext() {
      return GetCurrentContext();
    }
    InitContext(engineGLAttribs, deviceCaps2) {
      if (engineGLAttribs.context_creation_type == CONTEXT_CREATION_TYPE.ATTACH) {
      } else if (engineGLAttribs.context_creation_type == CONTEXT_CREATION_TYPE.CREATE) {
        this.CreateContext(engineGLAttribs, deviceCaps2);
      }
    }
    CheckFeatures(engineGLAttribs, deviceCaps2) {
      const version = this.context.getParameter(this.context.VERSION);
      const renderer = this.context.getParameter(this.context.RENDERER);
      const majorVersion = 3;
      const minorVersion = 0;
      console.info(`${engineGLAttribs.context_creation_type == CONTEXT_CREATION_TYPE.CREATE ? "Initialize WebGL context" : "Attach WebGL context"}, ${majorVersion}.${minorVersion}, ${version}, ${renderer}`);
      deviceCaps2.device_type = engineGLAttribs.device_type;
      deviceCaps2.major_version = majorVersion;
      deviceCaps2.minor_version = minorVersion;
      const isGLES310orAbove = majorVersion >= 4 || majorVersion == 3 && minorVersion >= 1;
      deviceCaps2.separable_program_supported = isGLES310orAbove;
      deviceCaps2.indirect_rendering_supported = isGLES310orAbove;
      const samplerCaps = deviceCaps2.sampler_caps;
      samplerCaps.border_sampling_mode_supported = false;
      samplerCaps.anisotropic_filtering_supported = false;
      samplerCaps.lod_bias_supported = false;
      const textureCaps = deviceCaps2.texture_caps;
      textureCaps.texture1D_supported = false;
      textureCaps.texture1D_array_supported = false;
      textureCaps.texture2D_multisample_suppored = isGLES310orAbove;
      textureCaps.texture2D_multisample_array_suppored = false;
      textureCaps.textureview_supported = false;
      textureCaps.texture_level_parameter_supported = isGLES310orAbove;
      textureCaps.cubemap_array_supporte = false;
      deviceCaps2.multithread_resource_creation_supported = false;
      deviceCaps2.depth_clamp_supported = false;
      deviceCaps2.shader_binary_supported = false;
    }
    CreateContext(engineGLAttribs, deviceCaps2) {
      const GLContextAttributes = {
        alpha: true,
        antialias: false,
        depth: true,
        failIfMajorPerformanceCaveat: false,
        powerPreference: "default",
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        stencil: false,
        desynchronized: false
      };
      const canvas2 = document.getElementById("canvas");
      SetCanvas(canvas2);
      this.context = canvas2.getContext("webgl2", GLContextAttributes);
      MakeContextCurrent(this.context);
    }
    AttachContext(engineGLAttribs, deviceCaps2) {
      this.context = GetCurrentContext();
    }
    SwapBuffers(syncInterval) {
    }
  };

  // src/render-backend/graphics-engine/pipelinestate.js
  var PipelineState = class {
    constructor(renderDevice2, pipelineStateDesc) {
      this.render_device = renderDevice2;
      this.desc = pipelineStateDesc;
      this.strides = [];
      this.buffer_slots_used = 0;
      for (let i = 0; i < MAX_BUFFER_SLOTS; i++) {
        this.strides[i] = 0;
      }
      let bAutoCalcLayout = true;
      let bDefineAllStride = true;
      for (let elem = 0; elem < this.desc.input_layout_desc.layout_elements.length; elem++) {
        const inputElem = this.desc.input_layout_desc.layout_elements[elem];
        bAutoCalcLayout &= inputElem.relative_offset == 0;
        bDefineAllStride &= inputElem.stride != 0;
      }
      if (!bDefineAllStride) {
        throw "stride should not be 0";
      }
      const tightStrides = [];
      for (let elem = 0; elem < this.desc.input_layout_desc.layout_elements.length; elem++) {
        const inputElem = this.desc.input_layout_desc.layout_elements[elem];
        if (inputElem.value_type >= VALUE_TYPE2.VT_FLOAT16) {
          inputElem.is_normalized = false;
        }
        const bufferSlot = inputElem.buffer_slot;
        if (bufferSlot > this.strides.length) {
          throw "Buffer slot exceeds the limit";
        }
        this.buffer_slots_used = Math.max(this.buffer_slots_used, bufferSlot + 1);
        if (inputElem.relative_offset < tightStrides[bufferSlot]) {
          if (inputElem.relative_offset == 0) {
            inputElem.relative_offset = tightStrides[bufferSlot];
          } else {
            throw "layout element overlapping";
          }
        }
        if (this.strides[bufferSlot] != 0) {
          if (this.strides[bufferSlot] != inputElem.stride) {
            console.warn("inconsistent strides specified for buffer slot");
          }
          this.strides[bufferSlot] = inputElem.stride;
        }
        tightStrides[bufferSlot] += GetValueSize(inputElem.value_type) * inputElem.num_components;
      }
      for (let elem = 0; elem < this.desc.input_layout_desc.layout_elements.length; elem++) {
        const inputElem = this.desc.input_layout_desc.layout_elements[elem];
        const bufferSlot = inputElem.buffer_slot;
        if (this.strides[bufferSlot] < tightStrides[bufferSlot]) {
          throw `stride(${bufferSlot}) explicitly specified is smaller than the total size of elements`;
        }
        if (this.strides[bufferSlot] != inputElem.stride) {
          throw "inconsistent stride between input elements in the same buffer slot";
        }
      }
      if (this.desc.is_compute_pipeline) {
        const computePipelineDesc = this.desc.compute_pipeline_desc;
        this.program = computePipelineDesc.program;
        if (!this.program || !this.program.GetCS()) {
          throw "compute shader not provided";
        }
      } else {
        const graphicsPipelineDesc = this.desc.graphics_pipeline_desc;
        this.program = graphicsPipelineDesc.program;
        if (!this.program || this.program.GetCS()) {
          throw "graphics shader not provided";
        }
      }
    }
    GetDesc() {
      return this.desc;
    }
    GetProgram() {
      return this.program;
    }
    GetBufferStrides() {
      return this.strides;
    }
    Release() {
      throw "need implement";
    }
    CreateShaderResourceBinding() {
      throw "implementation needed";
    }
    GetNumBufferSlotUsed() {
      return this.buffer_slots_used;
    }
  };

  // src/render-backend/graphics-engine-webgl/app-gl-state.js
  var AppGLState = class {
    constructor(renderDevice2) {
      this.is_OpenGLES = renderDevice2.GetDeviceCaps().dev_type == DEVICE_TYPE.DEVICE_TYPE_OPENGLES;
      this.unpack_row_length = 0;
      this.draw_fbo = null;
      this.read_fbo = null;
      this.vao = null;
      this.vbo = null;
      this.context_ubo = null;
      this.bind_points_ubo = [];
      this.MAX_UBO_BINDING_NUM = 24;
      this.active_texture = null;
      this.texture_binding_2D = null;
      this.texture_binding_2D_array = null;
      this.program = null;
      this.viewport = null;
      this.polygon_offset_factor = null;
      this.polygon_offset_units = null;
      this.depth_mask = false;
      this.depth_func = null;
      this.cull_face = null;
      this.cull_face_mode = null;
      this.front_face = null;
      this.scissor_test = null;
      this.depth_test = false;
      this.stencil_test = false;
      this.sample_coverage = null;
      this.sample_alpha_to_coverage = null;
      this.blend = null;
      this.blend_src_rgb = null;
      this.blend_src_alpha = null;
      this.blend_dst_rgb = null;
      this.blend_dst_alpha = null;
      this.blend_equation_rgb = null;
      this.blend_equation_alpha = null;
      this.blend_color = null;
      this.color_write_mask = null;
      this.clear_color = null;
      this.MAX_SAMPLER_TEXTURE_NUM = 8;
      this.bind_sampler = [];
      this.bind_texture_2D = [];
    }
    Save() {
      this.unpack_row_length = gl.getParameter(gl.UNPACK_ROW_LENGTH);
      this.draw_fbo = gl.getParameter(gl.DRAW_FRAMEBUFFER_BINDING);
      this.read_fbo = gl.getParameter(gl.READ_FRAMEBUFFER_BINDING);
      this.vao = gl.getParameter(gl.VERTEX_ARRAY_BINDING);
      this.vbo = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
      this.context_ubo = gl.getParameter(gl.UNIFORM_BUFFER_BINDING);
      if (this.is_OpenGLES) {
        this.bind_points_ubo[0] = this.context_ubo;
      }
      this.active_texture = gl.getParameter(gl.ACTIVE_TEXTURE);
      this.texture_binding_2D = gl.getParameter(gl.TEXTURE_BINDING_2D);
      this.texture_binding_2D_array = gl.getParameter(gl.TEXTURE_BINDING_2D_ARRAY);
      this.program = gl.getParameter(gl.CURRENT_PROGRAM);
      this.viewport = gl.getParameter(gl.VIEWPORT);
      this.polygon_offset_factor = gl.getParameter(gl.POLYGON_OFFSET_FACTOR);
      this.polygon_offset_units = gl.getParameter(gl.POLYGON_OFFSET_UNITS);
      this.depth_mask = gl.getParameter(gl.DEPTH_WRITEMASK);
      this.depth_func = gl.getParameter(gl.DEPTH_FUNC);
      this.cull_face = gl.getParameter(gl.CULL_FACE);
      this.cull_face_mode = gl.getParameter(gl.CULL_FACE_MODE);
      this.front_face = gl.getParameter(gl.FRONT_FACE);
      this.scissor_test = gl.getParameter(gl.SCISSOR_TEST);
      this.depth_test = gl.getParameter(gl.DEPTH_TEST);
      this.stencil_test = gl.getParameter(gl.STENCIL_TEST);
      this.sample_coverage = gl.getParameter(gl.SAMPLE_COVERAGE);
      this.sample_alpha_to_coverage = gl.getParameter(gl.SAMPLE_ALPHA_TO_COVERAGE);
      this.blend = gl.getParameter(gl.BLEND);
      this.blend_src_rgb = gl.getParameter(gl.BLEND_SRC_RGB);
      this.blend_src_alpha = gl.getParameter(gl.BLEND_SRC_ALPHA);
      this.blend_dst_rgb = gl.getParameter(gl.BLEND_DST_RGB);
      this.blend_dst_alpha = gl.getParameter(gl.BLEND_DST_ALPHA);
      this.blend_equation_rgb = gl.getParameter(gl.BLEND_EQUATION_RGB);
      this.blend_equation_alpha = gl.getParameter(gl.BLEND_EQUATION_ALPHA);
      this.blend_color = gl.getParameter(gl.BLEND_COLOR);
      this.color_write_mask = gl.getParameter(gl.COLOR_WRITEMASK);
      this.clear_color = gl.getParameter(gl.COLOR_CLEAR_VALUE);
      for (let i = 0; i < this.MAX_SAMPLER_TEXTURE_NUM; i++) {
        gl.activeTexture(gl.TEXTURE0 + i);
        this.bind_sampler[i] = gl.getParameter(gl.SAMPLER_BINDING);
        this.bind_texture_2D[i] = gl.getParameter(gl.TEXTURE_BINDING_2D);
      }
      gl.activeTexture(this.active_texture);
    }
    Restore() {
      for (let i = 0; i < this.MAX_SAMPLER_TEXTURE_NUM; i++) {
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindSampler(i, this.bind_sampler[i]);
        gl.bindTexture(gl.TEXTURE_2D, this.bind_texture_2D[i]);
      }
      gl.pixelStorei(gl.UNPACK_ROW_LENGTH, this.unpack_row_length);
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.draw_fbo);
      gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.read_fbo);
      gl.bindVertexArray(this.vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
      gl.bindBuffer(gl.UNIFORM_BUFFER, this.context_ubo);
      for (let i = 0; i < this.MAX_UBO_BINDING_NUM; i++) {
        gl.bindBufferBase(gl.UNIFORM_BUFFER, i, this.bind_points_ubo[i]);
      }
      gl.activeTexture(this.active_texture);
      gl.bindTexture(gl.TEXTURE_2D, this.texture_binding_2D);
      gl.bindTexture(gl.TEXTURE_BINDING_2D_ARRAY, this.texture_binding_2D_array);
      gl.useProgram(this.program);
      gl.viewport(this.viewport[0], this.viewport[1], this.viewport[2], this.viewport[3]);
      gl.polygonOffset(this.polygon_offset_factor, this.polygon_offset_units);
      this.EnableState(this.cull_face, gl.CULL_FACE);
      gl.cullFace(this.cull_face_mode);
      gl.frontFace(this.front_face);
      this.EnableState(this.scissor_test, gl.SCISSOR_TEST);
      this.EnableState(this.depth_test, gl.DEPTH_TEST);
      this.EnableState(this.stencil_test, gl.STENCIL_TEST);
      this.EnableState(this.sample_coverage, gl.SAMPLE_COVERAGE);
      this.EnableState(this.sample_alpha_to_coverage, gl.SAMPLE_ALPHA_TO_COVERAGE);
      gl.depthMask(this.depth_mask);
      gl.depthFunc(this.depth_func);
      gl.blendFuncSeparate(this.blend_src_rgb, this.blend_dst_rgb, this.blend_src_alpha, this.blend_dst_alpha);
      gl.blendEquationSeparate(this.blend_equation_rgb, this.blend_equation_alpha);
      gl.blendColor(this.blend_color[0], this.blend_color[1], this.blend_color[2], this.blend_color[3]);
      gl.colorMask(this.color_write_mask[0], this.color_write_mask[1], this.color_write_mask[2], this.color_write_mask[3]);
      gl.clearColor(this.clear_color[0], this.clear_color[1], this.clear_color[2], this.clear_color[3]);
    }
    EnableState(isEnable, cap) {
      if (isEnable) {
        gl.enable(cap);
      } else {
        gl.disable(cap);
      }
    }
  };

  // src/render-backend/graphics-engine-webgl/gl-context-state.js
  var ContextCaps = class {
    constructor() {
      this.fill_mode_selection_supported = true;
      this.reservedz_perspertive = true;
      this.depth_clamp_supported = true;
      this.primitive_restart = true;
      this.max_combined_texture_units = 0;
      this.max_draw_buffers = 0;
    }
  };
  var StencilOpState = class {
    constructor() {
      this.func = gl.ALWAYS;
      this.stencil_fail_op = gl.KEEP;
      this.stencil_depth_fail_op = gl.KEEP;
      this.stencil_pass_op = gl.KEEP;
    }
  };
  var DepthStencilGLState = class {
    constructor() {
      this.depth_enable_state = true;
      this.depth_writes_enable_state = true;
      this.depth_cmp_func = gl.ALWAYS;
      this.stencil_test_enable_state = false;
      this.stencil_read_mask = 65535;
      this.stencil_write_mask = 65535;
      this.stencil_op_states = [];
      for (let i = 0; i <= 1; i++) {
        this.stencil_op_states[i] = new StencilOpState();
      }
    }
  };
  var RasterizerGLState = class {
    constructor() {
      this.cull_mode = CULL_MODE.CULL_MODE_BACK;
      this.front_counter_clock_wise = true;
      this.depth_bias = 0;
      this.slope_scaled_depth_bias = 0;
      this.depth_clamp_enable = true;
      this.scissor_test_enable = true;
    }
  };
  var GLContextState = class {
    gl_prog = null;
    vao = null;
    fbo = null;
    render_buffer = null;
    DS_state = null;
    RS_state = null;
    color_write_mask = [255, 255, 255, 255, 255, 255, 255, 255];
    independent_write_mask = false;
    active_texture = -1;
    num_patch_vertices = -1;
    primitive_restart = false;
    constructor(renderDevice2) {
      this.render_device = renderDevice2;
      this.caps = new ContextCaps();
      const deviceCaps2 = this.render_device.GetDeviceCaps();
      this.caps.fill_mode_selection_supported = deviceCaps2.wireframe_fill_supported;
      this.caps.reservedz_perspertive = deviceCaps2.reversedz_perspective;
      this.caps.depth_clamp_supported = deviceCaps2.depth_clamp_supported;
      this.caps.primitive_restart = false;
      this.caps.max_combined_texture_units = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
      if (this.caps.max_combined_texture_units <= 0) {
        throw "MAX_COMBINED_TEXTURE_IMAGE_UNITS is 0";
      }
      this.caps.max_draw_buffers = gl.getParameter(gl.MAX_DRAW_BUFFERS);
      if (this.caps.max_draw_buffers <= 0) {
        throw "MAX_DRAW_BUFFERS is 0";
      }
      this.bound_textures = [];
      this.bound_textures_capacity = this.caps.max_combined_texture_units;
      this.bound_samplers = [];
      this.bound_samplers_capacity = 32;
      this.bound_images = [];
      this.bound_images_capacity = 32;
    }
    GetContextCaps() {
      return this.caps;
    }
    SetCurrentGLState(renderDevice2) {
      const appGLState = new AppGLState(renderDevice2);
      appGLState.Save();
      this.Invalidate();
      const depthStencil = new DepthStencilGLState();
      depthStencil.depth_enable_state = appGLState.depth_test;
      depthStencil.depth_writes_enable_state = appGLState.depth_mask;
      depthStencil.depth_cmp_func = appGLState.depth_func;
      depthStencil.stencil_test_enable_state = appGLState.stencil_test;
      depthStencil.stencil_read_mask = 65535;
      depthStencil.stencil_write_mask = 65535;
      this.SetDepthStencilState(depthStencil, 0);
      const rasterizerState = new RasterizerGLState();
      rasterizerState.cull_mode = appGLState.cull_face ? appGLState.cull_face_mode == gl.FRONT ? CULL_MODE.CULL_MODE_FRONT : CULL_MODE.CULL_MODE_BACK : CULL_MODE.CULL_MODE_NONE;
      rasterizerState.front_counter_clock_wise = appGLState.front_face == gl.CCW ? true : false;
      rasterizerState.depth_bias = appGLState.polygon_offset_units;
      rasterizerState.slope_scaled_depth_bias = appGLState.polygon_offset_factor;
      rasterizerState.depth_clamp_enable = false;
      rasterizerState.scissor_test_enable = false;
      this.SetRasterizerState(rasterizerState);
    }
    Invalidate() {
      gl.useProgram(null);
      gl.bindVertexArray(null);
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
      gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
      this.gl_prog = null;
      this.vao = null;
      this.fbo = null;
      this.bound_textures = [];
      this.bound_samplers = [];
      this.bound_images = [];
      this.SetDepthStencilState(new DepthStencilGLState(), 0);
      this.SetRasterizerState(new RasterizerGLState());
      for (let i = 0; i < this.color_write_mask.length; i++) {
        this.color_write_mask[i] = 255;
      }
      this.independent_write_mask = false;
      this.active_texture = -1;
      this.num_patch_vertices = -1;
    }
    SetDepthStencilState(depthStencilState, stencilRef) {
      if (this.DS_state != depthStencilState) {
        if (depthStencilState.depth_enable_state) {
          gl.enable(gl.DEPTH_TEST);
        } else {
          gl.disable(gl.DEPTH_TEST);
        }
        gl.depthMask(depthStencilState.depth_writes_enable_state);
        gl.depthFunc(depthStencilState.depth_cmp_func);
        if (depthStencilState.stencil_test_enable_state) {
          gl.enable(gl.STENCIL_TEST);
          gl.stencilMask(depthStencilState.stencil_write_mask);
          for (let i = 0; i < 2; i++) {
            const face = i == 0 ? gl.FRONT : gl.BACK;
            const stencilState = depthStencilState.stencil_op_states[i];
            gl.stencilFuncSeparate(face, stencilState.func, stencilRef, depthStencilState.stencil_read_mask);
            gl.stencilOpSeparate(face, stencilState.stencil_fail_op, stencilState.stencil_depth_fail_op, stencilState.stencil_pass_op);
          }
        } else {
          gl.disable(gl.STENCIL_TEST);
        }
        this.DS_state = depthStencilState;
      }
    }
    SetRasterizerState(rasterizerState) {
      if (this.RS_state != rasterizerState) {
        if (rasterizerState.cull_mode == CULL_MODE.CULL_MODE_NONE) {
          gl.disable(gl.CULL_FACE);
        } else {
          gl.enable(gl.CULL_FACE);
          gl.cullFace(rasterizerState.cullFace == CULL_MODE.CULL_MODE_BACK ? gl.BACK : gl.FRONT);
        }
        const frontFace = rasterizerState.front_counter_clock_wise ? gl.CCW : gl.CW;
        gl.frontFace(frontFace);
        if (rasterizerState.depth_bias != 0 || rasterizerState.slope_scaled_depth_bias != 0) {
          gl.enable(gl.POLYGON_OFFSET_FILL);
        } else {
          gl.disable(gl.POLYGON_OFFSET_FILL);
        }
        gl.polygonOffset(rasterizerState.slope_scaled_depth_bias, rasterizerState.depth_bias);
        if (this.caps.depth_clamp_supported) {
        }
        if (rasterizerState.scissor_test_enable) {
          gl.enable(gl.SCISSOR_TEST);
        } else {
          gl.disable(gl.SCISSOR_TEST);
        }
        this.RS_state = rasterizerState;
      }
    }
    SetProgram(glProgram) {
      if (this.gl_prog != glProgram) {
        gl.useProgram(glProgram);
        this.gl_prog = glProgram;
      }
    }
    BindVAO(vao) {
      if (this.vao != vao) {
        gl.bindVertexArray(vao);
        this.vao = vao;
      }
    }
    UnbindVAO() {
      gl.bindVertexArray(null);
      this.vao = null;
    }
    BindFBO(fbo) {
      if (this.fbo != fbo) {
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, fbo);
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, fbo);
        this.fbo = fbo;
      }
    }
    SetActiveTexture(index) {
      if (index < 0) {
        index += this.caps.max_combined_texture_units;
      }
      if (index < 0 || index >= this.caps.max_combined_texture_units) {
        throw "Texture unit is out of range";
      }
      if (this.active_texture != index) {
        gl.activeTexture(gl.TEXTURE0 + index);
        this.active_texture = index;
      }
      return index;
    }
    BindTexture(index, bindTarget, texture) {
      index = this.SetActiveTexture(index);
      if (this.bound_textures[index] != texture) {
        gl.bindTexture(bindTarget, texture);
        this.bound_textures[index] = texture;
      }
    }
    BindRenderBuffer(renderBuffer) {
      if (this.render_buffer != renderBuffer) {
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
        this.render_buffer = renderBuffer;
      }
    }
    GetRenderBuffer() {
      return this.render_buffer;
    }
    BindSampler(index, sampler) {
      if (this.bound_samplers[index] != sampler) {
        gl.bindSampler(index, sampler);
        this.bound_samplers[index] = sampler;
      }
    }
    BindImage() {
      throw "image texture is not supported";
    }
    EnsureMemoryBarrier() {
      throw "image texture is not supported";
    }
    SetStencilRef(glFace, ref) {
      const faceStencilOp = this.DS_state.stencil_op_states[glFace == gl.FRONT ? 0 : 1];
      gl.stencilFuncSeparate(glFace, faceStencilOp.func, ref, faceStencilOp.stencil_read_mask);
    }
    SetBlendFactors(blendFactors) {
      gl.blendColor(blendFactors[0], blendFactors[1], blendFactors[2], blendFactors[3]);
    }
    GetDepthWriteEnable() {
      return this.DS_state.depth_writes_enable_state;
    }
    GetScissorTestEnable() {
      return this.RS_state.scissor_test_enable;
    }
    SetColorWriteMask(renderTargetIndex, writeMask, isIndependent) {
      if (!isIndependent) {
        renderTargetIndex = 0;
      }
      if (this.color_write_mask[renderTargetIndex] != writeMask || this.independent_write_mask != isIndependent) {
        if (isIndependent) {
          if (this.render_device.GetDeviceCaps().independent_blend_supported) {
            this.color_write_mask[renderTargetIndex] = writeMask;
          } else {
            console.error("independent color mask not supported");
          }
        } else {
          gl.colorMask(
            writeMask & COLOR_MASK.COLOR_MASK_RED ? true : false,
            writeMask & COLOR_MASK.COLOR_MASK_GREEN ? true : false,
            writeMask & COLOR_MASK.COLOR_MASK_BLUE ? true : false,
            writeMask & COLOR_MASK.COLOR_MASK_ALPHA ? true : false
          );
          for (let i = 0; i < this.color_write_mask.length; i++) {
            this.color_write_mask[i] = writeMask;
          }
        }
        this.independent_write_mask = isIndependent;
      }
      gl.colorMask();
    }
    GetColorWriteMask(renderTargetIndex) {
      if (!this.independent_write_mask) {
        renderTargetIndex = 0;
      }
      return {
        write_mask: this.color_write_mask[renderTargetIndex],
        is_independent: this.independent_write_mask
      };
    }
    SetBlendState(blendStateDesc, sampleMask) {
      if (sampleMask != 4294967295) {
        throw "sample mask is not supported in WebGL";
      }
      let enableBlend = false;
      if (blendStateDesc.independent_blend_enable) {
        for (let i = 0; i < MAX_RENDER_TARGETS; i++) {
          const renderTarget = blendStateDesc.render_targets[i];
          if (renderTarget.blend_enable) {
            enableBlend = true;
          }
          if (i < this.caps.max_draw_buffers) {
            this.SetColorWriteMask(i, renderTarget.color_mask, true);
          } else if (renderTarget.color_mask != new RenderTargetBlendDesc().color_mask) {
            throw `render target write mask is specified for buffer ${i}, but this device only support ${this.caps.max_draw_buffers} buffer`;
          }
        }
      } else {
        const renderTarget0 = blendStateDesc.render_targets[0];
        enableBlend = renderTarget0.blend_enable;
        this.SetColorWriteMask(0, renderTarget0.color_mask, false);
      }
      if (enableBlend) {
        gl.enable(gl.BLEND);
        if (blendStateDesc.alpha_to_coverage_enable) {
          gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
        } else {
          gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
        }
        if (blendStateDesc.independent_blend_enable) {
          if (this.render_device.GetDeviceCaps().independent_blend_supported) {
          } else {
            console.error("not support indepedent blend");
          }
        } else {
          const renderTarget0 = blendStateDesc.render_targets[0];
          const srcFactorRGB = BlendFactorToGLBlend(renderTarget0.src_blend);
          const dstFactorRBG = BlendFactorToGLBlend(renderTarget0.dest_blend);
          const srcFactorAlpha = BlendFactorToGLBlend(renderTarget0.src_blend_alpha);
          const dstFactorAlpha = BlendFactorToGLBlend(renderTarget0.dest_blend_alpha);
          gl.blendFuncSeparate(srcFactorRGB, dstFactorRBG, srcFactorAlpha, dstFactorAlpha);
          const modeRGB = BlendOperation2GLBlendOp(renderTarget0.blend_op);
          const modeAlpha = BlendOperation2GLBlendOp(renderTarget0.blend_op_alpha);
          gl.blendEquationSeparate(modeRGB, modeAlpha);
        }
      } else {
        gl.disable(gl.BLEND);
      }
    }
    SetPrimitiveRestart(enablePrimitiveRestart) {
      if (this.caps.primitive_restart && this.primitive_restart != enablePrimitiveRestart) {
        this.primitive_restart = enablePrimitiveRestart;
        if (enablePrimitiveRestart) {
        } else {
        }
      }
    }
    SetNumPatchVertices(numVertices) {
      throw "not supported";
    }
  };
  GLContextState.GetDepthStencilState = function(depthStencilStateDesc) {
    const gl_state = new DepthStencilGLState();
    gl_state.depth_enable_state = depthStencilStateDesc.depth_enable;
    gl_state.depth_writes_enable_state = depthStencilStateDesc.depth_write_enable;
    gl_state.depth_cmp_func = CompareFuncToGLCompare(depthStencilStateDesc.depth_func);
    gl_state.stencil_test_enable_state = depthStencilStateDesc.stencil_enable;
    gl_state.stencil_read_mask = depthStencilStateDesc.stencil_read_mask;
    gl_state.stencil_write_mask = depthStencilStateDesc.stencil_write_mask;
    const stencilConvert = (stencilOpDesc) => {
      const stencilOpState = new StencilOpState();
      stencilOpState.func = CompareFuncToGLCompare(stencilOpDesc.stencil_func);
      stencilOpState.stencil_fail_op = StencilOpToGLStencilOp(stencilOpDesc.stencil_fail_op);
      stencilOpState.stencil_depth_fail_op = StencilOpToGLStencilOp(stencilOpDesc.stencil_depth_fail_op);
      stencilOpState.stencil_pass_op = StencilOpToGLStencilOp(stencilOpDesc.stencil_pass_op);
      return stencilOpState;
    };
    gl_state.stencil_op_states[0] = stencilConvert(depthStencilStateDesc.front_face);
    gl_state.stencil_op_states[1] = stencilConvert(depthStencilStateDesc.back_face);
    return gl_state;
  };
  GLContextState.GetRasterizerState = function(rasterizerStateDesc) {
    const gl_state = new RasterizerGLState();
    gl_state.cull_mode = rasterizerStateDesc.cull_mode;
    gl_state.depth_bias = rasterizerStateDesc.depth_bias;
    gl_state.slope_scaled_depth_bias = rasterizerStateDesc.slope_scaled_depth_bias;
    gl_state.depth_clamp_enable = rasterizerStateDesc.depth_clip_enable;
    gl_state.scissor_test_enable = rasterizerStateDesc.scissor_enable;
    return gl_state;
  };

  // src/render-backend/graphics/program-desc.js
  var ElementReflection = class {
    constructor(name, offset) {
      this.name = name;
      this.offset = offset;
    }
    GetElementOffset() {
      return this.offset;
    }
    GetElementName() {
      return this.name;
    }
  };
  var CBufferReflection = class {
    constructor() {
      this.CBuffer_name = "";
      this.CBuffer_size = 0;
      this.elements = [];
    }
    GetCBufferSize() {
      return this.CBuffer_size;
    }
    GetCBufferName() {
      return this.CBuffer_name;
    }
    GetElementNum() {
      return this.elements.length;
    }
    GetElement(index) {
      return this.elements[index];
    }
  };
  var ShaderReflection = class {
    constructor() {
      this.texture2D_ref = [];
      this.CBuffer_ref = [];
    }
    GetTexture2DNum() {
      return this.texture2D_ref.length;
    }
    GetTexture2DName(index) {
      return this.texture2D_ref[index];
    }
    GetCBufferNum() {
      return this.CBuffer_ref.length;
    }
    GetCBuffer(index) {
      return this.CBuffer_ref[index];
    }
  };

  // src/render-backend/graphics-engine/shader.js
  var ShaderVariable = class {
    Set(object) {
      throw "implementation needed";
    }
    SetArray(objectArray, firstElement, numElements) {
      throw "implementation needed";
    }
    SetFloatArray(floatArray, count) {
      throw "implementation needed";
    }
    SetIntArray(intArray, count) {
      throw "implementation needed";
    }
    SetUintArray(uintArray, count) {
      throw "implementation needed";
    }
  };
  var DummyShaderVariable = class extends ShaderVariable {
    Set(object) {
    }
    SetArray(objectArray, firstElement, numElements) {
    }
    SetFloatArray(floatArray, count) {
    }
    SetIntArray(intArray, count) {
    }
    SetUintArray(uintArray, count) {
    }
  };
  function GetShaderVariableType(defaultVariableType, variableDescs, numVars, compFunc) {
    for (let i = 0; i < numVars; i++) {
      const currVarDesc = variableDescs[i];
      if (compFunc(currVarDesc.name)) {
        return currVarDesc.type;
      }
      return defaultVariableType;
    }
  }
  function GetShaderVariableTypeByName(name, defaultVariableType, variableDescs, numVars) {
    return GetShaderVariableType(defaultVariableType, variableDescs, numVars, function(name2) {
      return name2 == name2;
    });
  }
  var Shader = class {
    constructor(renderDevice2, shaderDesc) {
      this.render_device = renderDevice2;
      this.desc = shaderDesc;
      this.variables_desc = [];
      for (let i = 0; i < this.desc.variable_desc.length; i++) {
        this.variables_desc.push(this.desc.variable_desc[i]);
        if (!this.variables_desc[i].name) {
          throw "variable name not provided";
        }
      }
      this.static_samplers_desc = [];
      for (let i = 0; i < this.desc.static_sampler_desc.length; i++) {
        this.static_samplers_desc.push(this.desc.static_sampler_desc[i]);
        if (this.static_samplers_desc[i].sampler_name) {
          throw "sampler name nnot provided";
        }
      }
      this.shader_reflection = new ShaderReflection();
    }
    GetDesc() {
      return this.desc;
    }
    GetShaderReflection() {
      return this.shader_reflection;
    }
    GetShaderVariable(name) {
      throw "need implement";
    }
    Release() {
      throw "need implement";
    }
  };

  // src/render-backend/graphics-engine/shader-reource-binding.js
  var ShaderResourceBinding = class {
    constructor(pipelineState) {
      this.pipelinestate = pipelineState;
    }
    GetPipielineState() {
      return this.pipelinestate;
    }
    GetVariable(shaderType, name) {
      throw "implementation needed";
    }
    Release() {
      throw "need implement";
    }
  };

  // src/render-backend/graphics-engine-webgl/gl-program-resources.js
  var GLProgramVariable = class {
    constructor(name, size, varType) {
      this.name = name;
      this.resources = [];
      this.scale_uniform = null;
      this.array_size = size;
      this.var_type = varType;
    }
  };
  var UniformBufferInfo = class extends GLProgramVariable {
    constructor(name, size, varType, index) {
      super(name, size, varType);
      this.index = index;
    }
  };
  var SamplerInfo = class extends GLProgramVariable {
    constructor(name, size, varType, location, type, staticSampler) {
      super(name, size, varType);
      this.location = location;
      this.type = type;
      this.static_sampler = staticSampler;
    }
  };
  var GlobalScaleUniform = class {
    constructor(location, size, dataType) {
      this.uniform_location = location;
      this.scale_size = size;
      this.data_type = dataType;
    }
  };
  function GetUniformType(glDataType) {
    switch (glDataType) {
      case gl.FLOAT:
        return UNIFORM_TYPE.FLOAT;
      case gl.FLOAT_VEC2:
        return UNIFORM_TYPE.FLOAT2;
      case gl.FLOAT_VEC3:
        return UNIFORM_TYPE.FLOAT3;
      case gl.FLOAT_VEC4:
        return UNIFORM_TYPE.FLOAT4;
      case gl.FLOAT_MAT2:
        return UNIFORM_TYPE.MAT2X2;
      case gl.FLOAT_MAT3:
        return UNIFORM_TYPE.MAT3X3;
      case gl.FLOAT_MAT4:
        return UNIFORM_TYPE.MAT4X4;
      case gl.FLOAT_MAT2x3:
        return UNIFORM_TYPE.MAT2X3;
      case gl.FLOAT_MAT2x4:
        return UNIFORM_TYPE.MAT2X3;
      case gl.FLOAT_MAT3x2:
        return UNIFORM_TYPE.MAT3X2;
      case gl.FLOAT_MAT3x4:
        return UNIFORM_TYPE.MAT3X4;
      case gl.FLOAT_MAT4x2:
        return UNIFORM_TYPE.MAT4X2;
      case gl.FLOAT_MAT4x3:
        return UNIFORM_TYPE.MAT4X3;
      case gl.INT:
        return UNIFORM_TYPE.INT;
      case gl.INT_VEC2:
        return UNIFORM_TYPE.INT2;
      case gl.INT_VEC3:
        return UNIFORM_TYPE.INT3;
      case gl.INT_VEC4:
        return UNIFORM_TYPE.INT4;
      case gl.UNSIGNED_INT:
        return UNIFORM_TYPE.UINT;
      case gl.UNSIGNED_INT_VEC2:
        return UNIFORM_TYPE.UINT2;
      case gl.UNSIGNED_INT_VEC3:
        return UNIFORM_TYPE.UINT3;
      case gl.UNSIGNED_INT_VEC4:
        return UNIFORM_TYPE.UINT4;
      default: {
        console.warn("cannot recognize scale uniform type, return float as defualt");
        return UNIFORM_TYPE.FLOAT;
      }
    }
  }
  var ScaleUniformInfo = class extends GLProgramVariable {
    constructor(name, size, varType, uniformLocation, scaleSize, dataType) {
      super(name, size, varType);
      this.uniform_location = uniformLocation;
      this.scale_size = scaleSize;
      this.data_type = dataType;
      let typeSize = 0;
      const bytesInFloat = 4;
      const bytesInInt32 = 4;
      switch (this.data_type) {
        case UNIFORM_TYPE.FLOAT:
          typeSize = bytesInFloat * 1;
          break;
        case UNIFORM_TYPE.FLOAT2:
          typeSize = bytesInFloat * 2;
          break;
        case UNIFORM_TYPE.FLOAT3:
          typeSize = bytesInFloat * 3;
          break;
        case UNIFORM_TYPE.FLOAT4:
          typeSize = bytesInFloat * 4;
          break;
        case UNIFORM_TYPE.MAT2X2:
          typeSize = bytesInFloat * 4;
          break;
        case UNIFORM_TYPE.MAT3X3:
          typeSize = bytesInFloat * 9;
          break;
        case UNIFORM_TYPE.MAT4X4:
          typeSize = bytesInFloat * 16;
          break;
        case UNIFORM_TYPE.MAT2X3:
        case UNIFORM_TYPE.MAT3X2:
          typeSize = bytesInFloat * 6;
          break;
        case UNIFORM_TYPE.MAT2X4:
        case UNIFORM_TYPE.MAT4X2:
          typeSize = bytesInFloat * 8;
          break;
        case UNIFORM_TYPE.MAT3X4:
        case UNIFORM_TYPE.MAT4X3:
          typeSize = bytesInFloat * 12;
          break;
        case UNIFORM_TYPE.INT:
          typeSize = bytesInInt32 * 1;
          break;
        case UNIFORM_TYPE.INT2:
          typeSize = bytesInInt32 * 2;
          break;
        case UNIFORM_TYPE.INT3:
          typeSize = bytesInInt32 * 3;
          break;
        case UNIFORM_TYPE.INT4:
          typeSize = bytesInInt32 * 4;
          break;
        case UNIFORM_TYPE.UINT:
          typeSize = bytesInInt32 * 1;
          break;
        case UNIFORM_TYPE.UINT2:
          typeSize = bytesInInt32 * 2;
          break;
        case UNIFORM_TYPE.UINT3:
          typeSize = bytesInInt32 * 3;
          break;
        case UNIFORM_TYPE.UINT4:
          typeSize = bytesInInt32 * 4;
          break;
        default:
          typeSize = 0;
          break;
      }
      this.scale_uniform = new ArrayBuffer(typeSize);
    }
  };
  var GLShaderVariable = class extends ShaderVariable {
    constructor(programVar) {
      super();
      this.program_var = programVar;
    }
    Set(object) {
      this.program_var.resources[0] = object;
    }
    SetArray(objectArray, firstElement, numElements) {
      for (let i = 0; i < numElements; i++) {
        this.program_var[firstElement + i] = objectArray[i];
      }
    }
    SetFloatArray(floatArray, count) {
      this.program_var.scale_uniform = floatArray.buffer;
    }
    SetIntArray(intArray, count) {
      this.program_var.scale_uniform = intArray.buffer;
    }
    SetUintArray(uintArray, count) {
      this.program_var.scale_uniform = uintArray.buffer;
    }
  };
  var GLProgramResources = class {
    constructor() {
      this.uniform_blocks = [];
      this.samplers = [];
      this.scale_uniform_info = [];
      this.variable_map = /* @__PURE__ */ new Map();
    }
    GetUniformBlocks() {
      return this.uniform_blocks;
    }
    GetSamplers() {
      return this.samplers;
    }
    GetScaleUniforms() {
      return this.scale_uniform_info;
    }
    LoadUniforms(renderDevice2, glProgram, defaultVariableType, variableDescs, staticSamplers) {
      let result = new ShaderReflection();
      if (glProgram = null) {
        throw "GL program is null";
      }
      let numActiveUniforms = 0;
      numActiveUniforms = gl.getProgramParameter(glProgram, gl.ACTIVE_UNIFORMS);
      let numActiveUniformBlocks = 0;
      numActiveUniformBlocks = gl.getProgramParameter(glProgram, gl.ACTIVE_UNIFORM_BLOCKS);
      const globalScaleUniform = /* @__PURE__ */ new Map();
      for (let i = 0; i < numActiveUniforms; i++) {
        const info = gl.getActiveUniform(glProgram, i);
        const dataType = info.type;
        const size = info.size;
        const name = info.name;
        if (dataType == gl.SAMPLER_2D || dataType == gl.SAMPLER_CUBE) {
          result.texture2D_ref.push(name);
        }
        switch (dataType) {
          case gl.FLOAT:
          case gl.FLOAT_VEC2:
          case gl.FLOAT_VEC3:
          case gl.FLOAT_VEC4:
          case gl.FLOAT_MAT2:
          case gl.FLOAT_MAT3:
          case gl.FLOAT_MAT4:
          case gl.FLOAT_MAT2x3:
          case gl.FLOAT_MAT2x4:
          case gl.FLOAT_MAT3x2:
          case gl.FLOAT_MAT3x4:
          case gl.FLOAT_MAT4x2:
          case gl.FLOAT_MAT4x3:
          case gl.INT:
          case gl.INT_VEC2:
          case gl.INT_VEC3:
          case gl.INT_VEC4:
          case gl.UNSIGNED_INT:
          case gl.UNSIGNED_INT_VEC2:
          case gl.UNSIGNED_INT_VEC3:
          case gl.UNSIGNED_INT_VEC4: {
            const uniformLocation = gl.getUniformLocation(glProgram, name);
            globalScaleUniform.set(name, new GlobalScaleUniform(uniformLocation, size, GetUniformType(dataType)));
            break;
          }
          case gl.BOOL:
          case gl.BOOL_VEC2:
          case gl.BOOL_VEC3:
          case gl.BOOL_VEC4: {
            console.error("OpenGL shader cannot use bool uniform value, please use float instead");
          }
          case gl.SAMPLER_2D:
          case gl.SAMPLER_3D:
          case gl.SAMPLER_CUBE:
          case gl.SAMPLER_2D_SHADOW:
          case gl.SAMPLER_2D_ARRAY:
          case gl.SAMPLER_2D_ARRAY_SHADOW:
          case gl.SAMPLER_CUBE_SHADOW:
          case gl.INT_SAMPLER_2D:
          case gl.INT_SAMPLER_3D:
          case gl.INT_SAMPLER_CUBE:
          case gl.INT_SAMPLER_2D_ARRAY:
          case gl.UNSIGNED_INT_SAMPLER_2D:
          case gl.UNSIGNED_INT_SAMPLER_3D:
          case gl.UNSIGNED_INT_SAMPLER_CUBE:
          case gl.UNSIGNED_INT_SAMPLER_2D_ARRAY: {
            const uniformLocation = gl.getUniformLocation(glProgram, name);
            const varType = GetShaderVariableTypeByName(name, SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_DYNAMIC, variableDescs, variableDescs.length);
            let staticSampler = null;
            for (let i2 = 0; i2 < staticSamplers.length; i2++) {
              if (name == staticSamplers[i2].sampler_name) {
                staticSampler = renderDevice2.CreateSampler(staticSamplers[i2].desc);
                break;
              }
            }
            this.samplers.push(new SamplerInfo(name, size, varType, uniformLocation, dataType, staticSampler));
            break;
          }
          default:
            break;
        }
      }
      for (let i = 0; i < numActiveUniformBlocks; i++) {
        const cbReflection = new CBufferReflection();
        result.CBuffer_ref.push(cbReflection);
        const name = gl.getActiveUniformBlockName(glProgram, i);
        const uniformBlockIndex = gl.getUniformBlockIndex(glProgram, name);
        const uboSize = gl.getActiveUniformBlockParameter(glProgram, uniformBlockIndex, gl.UNIFORM_BLOCK_DATA_SIZE);
        cbReflection.CBuffer_size = uboSize;
        cbReflection.CBuffer_name = name;
        const arraySize = 1;
        const varType = GetShaderVariableTypeByName(name, defaultVariableType, variableDescs, variableDescs.length);
        this.uniform_blocks.push(new UniformBufferInfo(name, arraySize, varType, uniformBlockIndex));
        const uniforms = gl.getActiveUniformBlockParameter(glProgram, uniformBlockIndex, gl.UNIFORM_BLOCK_ACTIVE_UNIFORMS);
        const uniformIndices = gl.getActiveUniformBlockParameter(glProgram, uniformBlockIndex, gl.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES);
        const uniformOffsets = gl.getActiveUniforms(glProgram, uniformIndices, gl.UNIFORM_OFFSET);
        for (let j = 0; j < uniforms; j++) {
          const info = gl.getActiveUniform(glProgram, i);
          const name2 = info.name;
          globalScaleUniform.delete(name2);
          cbReflection.elements.push(new ElementReflection(name2, uniformOffsets[i]));
        }
      }
      for (let [key, value] of globalScaleUniform) {
        this.scale_uniform_info.push(new ScaleUniformInfo(
          key,
          0,
          SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_DYNAMIC,
          value.uniform_location,
          value.scale_size,
          value.data_type
        ));
      }
      return result;
    }
    Clone(srcResources2, varTypes) {
      for (let info of srcResources2.uniform_blocks) {
        if (varTypes.indexOf(info.var_type) != -1) {
          this.uniform_blocks.push(new UniformBufferInfo(info.name, info.array_size, info.var_type, info.index));
        }
      }
      for (let info of srcResources2.samplers) {
        if (varTypes.indexOf(info.var_type) != -1) {
          this.samplers.push(new SamplerInfo(info.name, info.array_size, info.var_type, info.location, info.type, info.static_sampler));
        }
      }
      for (let info of srcResources2.scale_uniform_info) {
        if (varTypes.indexOf(info.var_type) != -1) {
          this.scale_uniform_info.puush(new ScaleUniformInfo(info.name, info.array_size, info.var_type, info.uniform_location, info.scale_size, info.data_type));
        }
      }
      InitVariables();
    }
    InitVariables() {
      for (let info of srcResources.uniform_blocks) {
        this.variable_map.set(info.name, new GLShaderVariable(info));
      }
      for (let info of srcResources.samplers) {
        this.variable_map.set(info.name, new GLShaderVariable(info));
      }
      for (let info of srcResources.scale_uniform_info) {
        this.variable_map.set(info.name, new GLShaderVariable(info));
      }
    }
    GetShaderVariable(name) {
      if (this.variable_map.has(name)) {
        return this.variable_map.get(name);
      }
      return null;
    }
  };

  // src/render-backend/graphics-engine-webgl/shader-resource-binding-gl.js
  var ShaderResourceBindingGL = class extends ShaderResourceBinding {
    constructor(pipelineState) {
      super(pipelineState);
      this.dynamic_program_resources = new GLProgramResources();
      const varTypes = [
        SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_DYNAMIC,
        SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_MUTABLE
      ];
      this.dynamic_program_resources.Clone(this.pipelinestate.GetProgram().GetGLProgram().GetAllResources(), varTypes);
    }
    Release() {
    }
    GetProgramResources(shaderType, pipelineState) {
      return this.dynamic_program_resources;
    }
    GetVariable(shaderType, name) {
      const shaderVariable = this.dynamic_program_resources.GetShaderVariable(name);
      if (!shaderVariable) {
        return new DummyShaderVariable();
      }
      return shaderVariable;
    }
  };

  // src/render-backend/graphics-engine-webgl/pipeline-state-gl.js
  var PipelineStateGL = class extends PipelineState {
    constructor(renderDevice2, pipelineStateDesc) {
      super(renderDevice2, pipelineStateDesc);
      const deviceCaps2 = this.render_device.GetDeviceCaps();
      if (deviceCaps2.dev_type == DEVICE_TYPE.DEVICE_TYPE_UNDEFINED) {
        throw "device caps are not initialized";
      }
      this.LinkGLProgram(deviceCaps2.separable_program_supported);
      this.ds_state = GLContextState.GetDepthStencilState(pipelineStateDesc.graphics_pipeline_desc.depth_stencil_state_desc);
      this.ra_state = GLContextState.GetRasterizerState(pipelineStateDesc.graphics_pipeline_desc.rasterizer_state_desc);
    }
    GetDepthStencilState() {
      return this.ds_state;
    }
    GetRasterizerState() {
      return this.ra_state;
    }
    Release() {
      this.render_device.OnDestroyPSO(this);
    }
    LinkGLProgram(isProgramPipelineSupported) {
      if (isProgramPipelineSupported) {
        console.error("program pipeline not supported in WebGL");
      } else {
      }
    }
    CreateShaderResourceBinding() {
      return new ShaderResourceBindingGL(this);
    }
  };

  // src/render-backend/graphics-engine-webgl/gl-program.js
  var GLProgram = class {
    constructor() {
      this.all_resources = new GLProgramResources();
      this.const_resources = new GLProgramResources();
      this.shader_reflection = null;
      this.native_handle = gl.createProgram();
      this.valid = true;
    }
    GetAllResources() {
      return this.all_resources;
    }
    GetConstantResources() {
      return this.const_resources;
    }
    GetShaderReflection() {
      return this.shader_reflection;
    }
    InitResources(renderDevice2, defaultVarType, variableDescs, staticSamplers) {
      const glProgram = this.native_handle;
      this.shader_reflection = this.all_resources.LoadUniforms(renderDevice2, glProgram, defaultVarType, variableDescs, staticSamplers);
      const filterVarTypes = [SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_STATIC];
      this.const_resources.Clone(this.all_resources, filterVarTypes);
    }
    Release() {
      if (this.valid) {
        gl.deleteProgram(this.native_handle);
        this.valid = false;
      }
    }
  };

  // src/render-backend/graphics-engine-webgl/program-gl.js
  var ProgramGL = class extends Program {
    constructor(renderDevice2, programDesc) {
      super(renderDevice2, programDesc);
      this.gl_program = null;
      this.checked_link_status = false;
      const deviceCaps2 = this.render_device.GetDeviceCaps();
      if (deviceCaps2.dev_type == DEVICE_TYPE.DEVICE_TYPE_UNDEFINED) {
        throw "device caps is not initialzed";
      }
      this.separable_program_supported = deviceCaps2.eparable_program_supported;
      this.shader_binary_supported = deviceCaps2.shader_binary_supported;
      if (!this.separable_program_supported) {
        if (!this.shader_binary_supported) {
          this.LinkProgram();
        } else {
          console.warn("shader binary not supported in WebGL");
        }
      }
    }
    GetGLProgram() {
      return this.gl_program;
    }
    Release() {
      this.gl_program.Release();
    }
    LinkProgram() {
      this.gl_program = new GLProgram();
      for (let i = 0; i < this.num_shaders; i++) {
        const currShader = this.GetShader(i);
        currShader.CompileShader();
        gl.attachShader(this.gl_program.native_handle, currShader);
      }
      gl.linkProgram(this.gl_program.native_handle);
    }
    LinkFailed() {
      const info = gl.getProgramInfoLog();
      console.error("failed to link program");
      console.error(info);
      this.gl_program.Release();
    }
    CheckLinkStateAndReflection() {
      if (!this.checked_link_status) {
        this.checked_link_status = true;
        for (let i = 0; i < this.num_shaders; i++) {
          const currShader = this.shaders[i];
          currShader.CheckCompileStateAndReflection();
        }
        const isLinked = gl.getProgramParameter(this.gl_program.native_handle, gl.LINK_STATUS);
        if (!isLinked) {
          this.LinkFailed();
          return;
        }
        const mergedVarTypesArray = [];
        const mergedStaticSamplersArray = [];
        let defaultVarType = SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_STATIC;
        for (let i = 0; i < this.num_shaders; i++) {
          const currShader = this.GetShader(i);
          const shaderDesc = currShader.GetDesc();
          if (i == 0) {
            defaultVarType = shaderDesc.default_variable_type;
            for (let v = 0; v < shaderDesc.variable_desc.length; v++) {
              mergedVarTypesArray.push(shaderDesc.variable_desc[v]);
            }
            for (let s = 0; s < shaderDesc.static_sampler_desc.length; s++) {
              mergedStaticSamplersArray.push(shaderDesc.static_sampler_desc[s]);
            }
          } else {
            if (defaultVarType != shaderDesc.default_variable_type) {
              console.error("inconsistent default variable types for shaders in one program");
            }
          }
        }
        this.gl_program.InitResources(this.render_device, defaultVarType, mergedVarTypesArray, mergedStaticSamplersArray);
      }
    }
    GetVSShaderReflection() {
      CheckLinkStateAndReflection();
      if (!this.p_vs) {
        return null;
      }
      if (this.separable_program_supported) {
        return this.p_vs.GetShaderReflection();
      }
      return this.gl_program.GetShaderReflection();
    }
    GetPSShaderReflection() {
      CheckLinkStateAndReflection();
      if (!this.p_ps) {
        return null;
      }
      if (this.separable_program_supported) {
        return this.p_ps.GetShaderReflection();
      }
      return this.gl_program.GetShaderReflection();
    }
    GetGSShaderReflection() {
      CheckLinkStateAndReflection();
      if (!this.p_gs) {
        return null;
      }
      if (this.separable_program_supported) {
        return this.p_gs.GetShaderReflection();
      }
      return this.gl_program.GetShaderReflection();
    }
    GetHSShaderReflection() {
      CheckLinkStateAndReflection();
      if (!this.p_hs) {
        return null;
      }
      if (this.separable_program_supported) {
        return this.p_hs.GetShaderReflection();
      }
      return this.gl_program.GetShaderReflection();
    }
    GetDSShaderReflection() {
      CheckLinkStateAndReflection();
      if (!this.p_ds) {
        return null;
      }
      if (this.separable_program_supported) {
        return this.p_ds.GetShaderReflection();
      }
      return this.gl_program.GetShaderReflection();
    }
    GetCSShaderReflection() {
      CheckLinkStateAndReflection();
      if (!this.p_cs) {
        return null;
      }
      if (this.separable_program_supported) {
        return this.p_cs.GetShaderReflection();
      }
      return this.gl_program.GetShaderReflection();
    }
  };

  // src/render-backend/graphics-engine/sampler.js
  var Sampler = class {
    constructor(renderDevice2, samplerDesc) {
      this.render_device = renderDevice2;
      this.desc = samplerDesc;
    }
    Release() {
      throw "need implement";
    }
  };

  // src/render-backend/graphics-engine-webgl/sampler-gl.js
  function AddressModeToGLAddressMode(mode) {
    switch (mode) {
      case TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_WRAP:
        return gl.REPEAT;
      case TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_MIRROR:
        return gl.MIRRORED_REPEAT;
      case TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_CLAMP:
        return gl.CLAMP_TO_EDGE;
      case TEXTURE_ADDRESS_MODE.TEXTURE_ADDRESS_BORDER:
      default:
        console.warn("unknown texture address mode");
        return gl.CLAMP_TO_EDGE;
    }
  }
  var SamplerGL = class extends Sampler {
    constructor(renderDevice2, samplerDesc) {
      super(renderDevice2, samplerDesc);
      this.gl_sampler = gl.createSampler();
      const samCaps = this.render_device.GetDeviceCaps().sampler_caps;
      let minAnisotropic = false;
      let minComparison = false;
      let magAnisotropic = false;
      let magComparison = false;
      let glMinFilter;
      let glMagFilter;
      let glMipFilter;
      switch (this.desc.min_filter) {
        case FILTER_TYPE.FILTER_TYPE_POINT:
          minAnisotropic = false;
          minComparison = false;
          glMinFilter = gl.NEAREST;
          break;
        case FILTER_TYPE.FILTER_TYPE_LINEAR:
          minAnisotropic = false;
          minComparison = false;
          glMinFilter = gl.LINEAR;
          break;
        case FILTER_TYPE.FILTER_TYPE_ANISOTROPIC:
          minAnisotropic = true;
          minComparison = false;
          glMinFilter = gl.LINEAR;
          break;
        case FILTER_TYPE.FILTER_TYPE_COMPARISON_POINT:
          minAnisotropic = false;
          minComparison = true;
          glMinFilter = gl.NEAREST;
          break;
        case FILTER_TYPE.FILTER_TYPE_COMPARISON_LINEAR:
          minAnisotropic = false;
          minComparison = true;
          glMinFilter = gl.LINEAR;
          break;
        case FILTER_TYPE.FILTER_TYPE_COMPARISON_ANISOTROPIC:
          minAnisotropic = true;
          minComparison = true;
          glMinFilter = gl.LINEAR;
          break;
        default:
          throw "unknown filter type";
      }
      switch (this.desc.mag_filter) {
        case FILTER_TYPE.FILTER_TYPE_POINT:
          magAnisotropic = false;
          magComparison = false;
          glMagFilter = gl.NEAREST;
          break;
        case FILTER_TYPE.FILTER_TYPE_LINEAR:
          magAnisotropic = false;
          magComparison = false;
          glMagFilter = gl.LINEAR;
          break;
        case FILTER_TYPE.FILTER_TYPE_ANISOTROPIC:
          magAnisotropic = true;
          magComparison = false;
          glMagFilter = gl.LINEAR;
          break;
        case FILTER_TYPE.FILTER_TYPE_COMPARISON_POINT:
          magAnisotropic = false;
          magComparison = true;
          glMagFilter = gl.NEAREST;
          break;
        case FILTER_TYPE.FILTER_TYPE_COMPARISON_LINEAR:
          magAnisotropic = false;
          magComparison = true;
          glMagFilter = gl.LINEAR;
          break;
        case FILTER_TYPE.FILTER_TYPE_COMPARISON_ANISOTROPIC:
          magAnisotropic = true;
          magComparison = true;
          glMagFilter = gl.LINEAR;
          break;
        default:
          throw "unknown filter type";
      }
      switch (this.desc.mip_filter) {
        case FILTER_TYPE.FILTER_TYPE_UNKNOWN:
          glMipFilter = 0;
          break;
        case FILTER_TYPE.FILTER_TYPE_POINT:
          glMipFilter = gl.NEAREST;
          break;
        case FILTER_TYPE.FILTER_TYPE_LINEAR:
          glMipFilter = gl.LINEAR;
          break;
        default:
          throw "unknown mip mode";
      }
      if (minAnisotropic != magAnisotropic) {
        throw "incosistent anisotropy filter setting";
      }
      if (minComparison != magComparison) {
        throw "incosistent comprison filter setting";
      }
      gl.samplerParameteri(this.gl_sampler, gl.TEXTURE_MAG_FILTER, glMagFilter);
      let glMinMipFilter = 0;
      if (this.desc.mip_filter == FILTER_TYPE.FILTER_TYPE_UNKNOWN) {
        glMinMipFilter = glMinFilter;
      } else {
        if (glMinFilter == gl.NEAREST && glMipFilter == gl.NEAREST) {
          glMinMipFilter = gl.NEAREST_MIPMAP_NEAREST;
        } else if (glMinFilter == gl.LINEAR && glMipFilter == gl.NEAREST) {
          glMinMipFilter = gl.LINEAR_MIPMAP_NEAREST;
        } else if (glMinFilter == gl.NEAREST && glMipFilter == gl.LINEAR) {
          glMinMipFilter = gl.NEAREST_MIPMAP_LINEAR;
        } else if (glMinFilter == gl.LINEAR && glMipFilter == gl.LINEAR) {
          glMinMipFilter = gl.LINEAR_MIPMAP_LINEAR;
        } else {
          throw "unknown min/mip filter combination";
        }
      }
      gl.samplerParameteri(this.gl_sampler, gl.TEXTURE_MIN_FILTER, glMinMipFilter);
      gl.samplerParameteri(this.gl_sampler, gl.TEXTURE_WRAP_S, AddressModeToGLAddressMode(this.desc.address_u));
      gl.samplerParameteri(this.gl_sampler, gl.TEXTURE_WRAP_T, AddressModeToGLAddressMode(this.desc.address_v));
      gl.samplerParameteri(this.gl_sampler, gl.TEXTURE_WRAP_R, AddressModeToGLAddressMode(this.desc.address_w));
      if (samCaps.anisotropic_filtering_supported) {
      }
      gl.samplerParameteri(this.gl_sampler, gl.TEXTURE_COMPARE_MODE, minComparison ? gl.COMPARE_REF_TO_TEXTURE : gl.NONE);
      gl.samplerParameteri(this.gl_sampler, gl.TEXTURE_COMPARE_FUNC, CompareFuncToGLCompare(this.desc.comparison_func));
      gl.samplerParameterf(this.gl_sampler, gl.TEXTURE_MAX_LOD, this.desc.max_LOD);
      gl.samplerParameterf(this.gl_sampler, gl.TEXTURE_MIN_LOD, this.desc.min_LOD);
    }
    GetGLSampler() {
      return this.gl_sampler;
    }
    Release() {
      gl.deleteSampler(this.gl_sampler);
    }
  };

  // src/render-backend/graphics-engine-webgl/shader-gl.js
  function GetGLShaderType(shaderType) {
    switch (shaderType) {
      case SHADER_TYPE.SHADER_TYPE_VERTEX:
        return gl.VERTEX_SHADER;
      case SHADER_TYPE.SHADER_TYPE_PIXEL:
        return gl.FRAGMENT_SHADER;
      default:
        throw "shader type not supported";
    }
  }
  var ShaderGL = class extends Shader {
    constructor(renderDevice2, shaderCreationAttribs) {
      super(renderDevice2, shaderCreationAttribs.shader_desc);
      this.gl_program = null;
      this.gl_shader = null;
      this.gl_source = shaderCreationAttribs.source;
      this.is_shader_compiled = false;
      this.has_checked_compiled_status = false;
    }
    Release() {
      if (this.gl_program) {
        gl.deleteProgram(this.gl_program);
      }
      if (this.gl_shader) {
        gl.deleteShader(this.gl_shader);
      }
    }
    CompileShader() {
      if (!this.is_shader_compiled) {
        this.is_shader_compiled = true;
        const glShaderType = GetGLShaderType(this.desc.shader_type);
        const shader = gl.createShader(glShaderType);
        gl.shaderSource(shader, this.gl_source);
        gl.compileShader(shader);
        const deviceCaps2 = this.render_device.GetDeviceCaps();
        if (deviceCaps2.shader_binary_supported) {
        } else {
          this.gl_shader = shader;
        }
        if (deviceCaps2.shader_binary_supported) {
        }
      }
    }
    CheckCompileStateAndReflection() {
      if (this.has_checked_compiled_status || !this.gl_shader) {
        return;
      }
      this.has_checked_compiled_status = true;
      const compiled = gl.getShaderParameter(this.gl_shader, gl.COMPILE_STATUS);
      console.error("Failed to compile shader file:");
      if (!compiled) {
        const info = gl.getShaderInfoLog(this.gl_shader);
        console.error(info);
      }
    }
    GetShaderReflection() {
      if (!this.gl_program) {
        throw "Shader variable queries are currently suppored for separable programs only";
      }
    }
  };

  // src/render-backend/graphics/textureview-desc.js
  var UAV_ACCESS_FLAG = {
    UAV_ACCESS_UNSPECIFIED: 0,
    UAV_ACCESS_FLAG_READ: 1,
    UAV_ACCESS_FLAG_WRITE: 2,
    UAV_ACCESS_FLAG_READ_WRITE: 3
  };
  var TextureViewDesc = class {
    constructor() {
      this.view_type = TEXTURE_VIEW_TYPE.TEXTURE_VIEW_UNDEFINED;
      this.texture_dim = RESOURCE_DIMENSION.RESOURCE_DIM_UNDEFINED;
      this.format = TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN;
      this.most_detailed_mip = 0;
      this.num_mip_levels = 0;
      this.first_array_or_depth_slice = 0;
      this.num_array_or_depth_slice = 0;
      this.access_flags = UAV_ACCESS_FLAG.UAV_ACCESS_UNSPECIFIED;
    }
  };

  // src/render-backend/graphics-engine/texture.js
  var Texture = class {
    constructor(renderDevice2, textureDesc) {
      this.render_device = renderDevice2;
      this.desc = textureDesc;
      if (this.desc.mip_levels == 0) {
        if (this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D || this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY || this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE || this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY) {
          this.desc.mip_levels = ComputeMipLevelsCount(this.desc.width, this.desc.height);
        } else if (this.desc == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
          this.desc.mip_levels = ComputeMipLevelsCount(this.desc.width, this.desc.height, this.desc.array_size_or_depth);
        } else {
          throw "Unknown texture type";
        }
      }
      this.ValidateTextureDesc(this.desc);
      this.created_texture_views = /* @__PURE__ */ new Map();
      this.default_SRV = null;
      this.default_RTV = null;
      this.default_DSV = null;
      this.default_UAV = null;
      this.resolved = false;
    }
    GetDesc() {
      return this.desc;
    }
    Release() {
      for (let [key, view] of this.created_texture_views) {
        view.Release();
      }
    }
    GetResolveFlag() {
      return this.resolved;
    }
    SetResolveFlag(resolved) {
      this.resolved = resolved;
    }
    CreateViewInternal(viewDesc) {
      throw "implementation needed";
    }
    CorrectTextureViewDesc(viewDesc) {
      if (!(viewDesc.view_type > TEXTURE_VIEW_TYPE.TEXTURE_VIEW_UNDEFINED && viewDesc.view_type < TEXTURE_VIEW_TYPE.TEXTURE_VIEW_NUM_VIEWS)) {
        console.error("texture view type is not specified");
      }
      if (viewDesc.most_detailed_mip + viewDesc.num_mip_levels > this.desc.mip_levels) {
        console.error("most detailed mip and number of mip levels in the view specify more levels than target texture");
      }
      if (viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN) {
        viewDesc.format = GetViewFormat(this.desc.format, viewDesc.view_type, this.desc.bind_flags);
      }
      if (viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_UNDEFINED) {
        if (this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE || this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY) {
          switch (viewDesc.view_type) {
            case TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE:
              viewDesc.texture_dim = this.desc.type;
              break;
            case TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET:
            case TEXTURE_VIEW_TYPE.TEXTURE_VIEW_DEPTH_STENCIL:
            case TEXTURE_VIEW_TYPE.TEXTURE_VIEW_UNORDERED_ACCESS:
              viewDesc.texture_dim = RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY;
              break;
            default:
              throw "unexpected view type";
          }
        } else {
          viewDesc.texture_dim = this.desc.type;
        }
      }
      switch (this.desc.type) {
        case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D:
          if (viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY) {
            console.error("incorrect texture view type for Texture 2D, only Texture 2D view is allowed");
          }
          break;
        case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY:
          if (viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY) {
            console.error("incorrect texture view type for Textuure 2D array, only Texture 2D view or Texture 2D array view are allowed");
          }
          break;
        case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D:
          if (viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
            console.error("incorrect texture view type for Texture 3D, only Texture 3D view is allowed");
          }
          break;
        case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE:
          if (viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE) {
            if (viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D) {
              console.error("incorrect texture SRV type for Texture cube, only Texture2D/Texture2D array/Texture cube view are allowed");
            }
          } else {
            if (viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D) {
              console.error("incorrect texture non-SRV type for Texture cube, only Texture2D/Texture2D array view are allowed");
            }
          }
        case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY:
          if (viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE) {
            if (viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D) {
              console.error("incorrect texture SRV for Texture cube array, only Texture2D/Texture2D array/Texture cube/Texture cube array are allowed");
            }
          } else {
            if (viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY && viewDesc.texture_dim != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D) {
              console.error("incorrect texture non-SRV type for Texture cube array, only Texture2D/Texture2D array view are allowed");
            }
          }
        default:
          throw "unexpected texture type";
      }
      if (viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE) {
        if (viewDesc.view_type != TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE) {
          throw "unexpected texture view type, SRV is expected";
        }
        if (viewDesc.num_array_or_depth_slice != 6 && viewDesc.num_array_or_depth_slice != 0) {
          console.error("texture cube SRV is expected to have 6 array slices");
        }
        if (viewDesc.first_array_or_depth_slice != 0) {
          console.error("first slice must be 0 for non-array texture cube SRV");
        }
      }
      if (viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY) {
        if (viewDesc.view_type != TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE) {
          throw "unexpected texture view type, SRV is expected";
        }
        if (viewDesc.num_array_or_depth_slice % 6 != 0) {
          console.error("number of slices in texture cube array SRV is expected to be multiple of 6");
        }
      }
      if (viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D) {
        if (viewDesc.first_array_or_depth_slice != 0) {
          console.error("first slice must be 0 for non-array texture 1D/2D views");
        }
        if (viewDesc.num_array_or_depth_slice > 1) {
          console.error("number of slices in view must be 1(or 0) for non-array texture 1D/2D views");
        }
      } else if (viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY || viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE || viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY) {
        if (viewDesc.first_array_or_depth_slice + viewDesc.num_array_or_depth_slice > this.desc.array_size_or_depth) {
          console.error("first slice and number of slices in the view specify more slices than target texture has");
        }
      } else if (viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
        const mipDepth = this.desc.array_size_or_depth >> viewDesc.most_detailed_mip;
        if (viewDesc.first_array_or_depth_slice + viewDesc.num_array_or_depth_slice > mipDepth) {
          console.error("first depth and number of depth in the view specify more depth than target 3D mip level texture has");
        }
      } else {
        throw "unexpected texture view dimension";
      }
      if (viewDesc.num_mip_levels == 0) {
        if (viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE) {
          viewDesc.num_mip_levels = this.desc.mip_levels - viewDesc.most_detailed_mip;
        } else {
          viewDesc.num_mip_levels = 1;
        }
      }
      if (viewDesc.num_array_or_depth_slice == 0) {
        if (viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY || viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE || viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY) {
          viewDesc.num_array_or_depth_slice = this.desc.array_size_or_depth - viewDesc.first_array_or_depth_slice;
        } else if (viewDesc.texture_dim == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
          const mipDepth = this.desc.array_size_or_depth >> viewDesc.most_detailed_mip;
          viewDesc.num_array_or_depth_slice = mipDepth - viewDesc.first_array_or_depth_slice;
        } else {
          viewDesc.num_array_or_depth_slice = 1;
        }
      }
      if (viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET && (viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM || viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_RG8_SNORM || viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SNORM || viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_R16_SNORM || viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_RG16_SNORM || viewDesc.format == TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SNORM)) {
        console.warn("There might be an issue in OpenGL driver on NVidia hardware: when rendering to SNORM textures, all negative values are clamped to zero. Use UNORM format instead");
      }
    }
    CreateView(viewDesc) {
      let view = this.created_texture_views.get(viewDesc);
      if (!view) {
        view = this.CreateViewInternal(viewDesc);
        this.created_texture_views.set(viewDesc, view);
      }
      return view;
    }
    CreateDefaultViews() {
      const texFmtAttribs = GetTextureFormatAttribs(this.desc.format);
      if (texFmtAttribs.component_type == COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED) {
        return;
      }
      if (this.desc.bind_flags & BIND_FLAGS.BIND_SHADER_RESOURCE) {
        const viewDesc = new TextureViewDesc();
        viewDesc.view_type = TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE;
        this.default_SRV = this.CreateViewInternal(viewDesc);
        this.created_texture_views.set(viewDesc, this.default_SRV);
      }
      if (this.desc.bind_flags & BIND_FLAGS.BIND_RENDER_TARGET) {
        const viewDesc = new TextureViewDesc();
        viewDesc.view_type = TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET;
        this.default_RTV = this.CreateViewInternal(viewDesc);
        this.created_texture_views.set(viewDesc, this.default_RTV);
      }
      if (this.desc.bind_flags & BIND_FLAGS.BIND_DEPTH_STENCILL) {
        const viewDesc = new TextureViewDesc();
        viewDesc.view_type = TEXTURE_VIEW_TYPE.TEXTURE_VIEW_DEPTH_STENCIL;
        this.default_DSV = this.CreateViewInternal(viewDesc);
        this.created_texture_views.set(viewDesc, this.default_DSV);
      }
      if (this.desc.bind_flags & BIND_FLAGS.BIND_UNORDERED_ACCESS) {
        const viewDesc = new TextureViewDesc();
        viewDesc.view_type = TEXTURE_VIEW_TYPE.TEXTURE_VIEW_UNORDERED_ACCESS;
        this.default_UAV = this.CreateViewInternal(viewDesc);
        this.created_texture_views.set(viewDesc, this.default_UAV);
      }
    }
    GetDefaultView(view_type) {
      switch (view_type) {
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
    UpdateData(deviceContext, mipLevel, slice, dstBox2, subResData) {
      this.ValidateUpdateDataParams(this.desc, mipLevel, slice, dstBox2, subResData);
    }
    CopyData(deviceContext, srcTexture, srcMipLevel, srcSlice, srcBox, dstMipLevel, dstSlice, dstX, dstY, dstZ) {
      this.ValidateCopyDataParams(srcTexture.GetDesc(), srcMipLevel, srcSlice, srcBox, this.desc, dstMipLevel, dstSlice, dstBox);
    }
    ReadPixels(deviceContext, pixels) {
      throw "need implement";
    }
    ValidateTextureDesc(desc) {
      if (desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_UNDEFINED) {
        console.error("Texture Resource dimension is undefined");
      }
      if (!(desc.type >= RESOURCE_DIMENSION.RESOURCE_DIM_TEX_1D && desc.type < RESOURCE_DIMENSION.RESOURCE_DIM_NUM_DIMENSIONS)) {
        console.error("Texture Unexpected resource dimension");
      }
      if (desc.width == 0) {
        console.error("Texture width cannot be zero");
      }
      if (desc.height == 0) {
        console.error("Texture height cannot be zero");
      }
      if (desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D && desc.array_size_or_depth == 0) {
        console.error("3D texture depth cannot be zero");
      }
      if (desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D && desc.array_size_or_depth != 1) {
        console.error("Texture 2D must have one array slice");
      }
      if (desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE || desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY) {
        if (desc.width != desc.height) {
          console.error("For cube map textures, width must match height");
        }
        if (desc.array_size_or_depth < 6) {
          console.error("Texture cube/cube array must have at least 6 slices");
        }
      }
      let maxDim = 0;
      if (desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D || desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY || desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE || desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY) {
        maxDim = Math.max(desc.width, desc.height);
      } else if (desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
        maxDim = Math.max(desc.width, desc.height, desc.array_size_or_depth);
      }
      if (maxDim >= 1 << desc.mip_levels) {
        console.error("Incorrect number of Mip levels");
      }
      if (desc.sample_count > 1) {
        if (!(desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D || desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY)) {
          console.error("Only Texture 2D/Texture 2D Array can be multisampled");
        }
        if (desc.mip_levels != 1) {
          console.error("Multisampled textures must have one mip level");
        }
        if (desc.bind_flags == BIND_FLAGS.BIND_UNORDERED_ACCESS) {
          console.error("UAVs are not allowed for multisampled resources");
        }
      }
      if (desc.bind_flags == BIND_FLAGS.BIND_RENDER_TARGET && (desc.format == TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SNORM || desc.format == TEXTURE_FORMAT.TEX_FORMAT_RG8_SNORM || desc.format == TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM || desc.format == TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SNORM || desc.format == TEXTURE_FORMAT.TEX_FORMAT_RG16_SNORM || desc.format == TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM)) {
        console.warn("There might be an issue in OpenGL driver on NVidia hardware: when rendering to SNORM textures, all negative values are clamped to zero");
      }
    }
    ValidateUpdateDataParams(textureDesc, mipLevel, slice, dstBox2, subResData) {
      if (!(subResData.data ^ subResData.srcBuffer)) {
        throw "Either CPU memory or GPU buffer must be provided, exclusively";
      }
      this.ValidateTextureRegion(textureDesc, mipLevel, slice, dstBox2);
    }
    ValidateCopyDataParams(srcTextureDesc, srcMipLevel, srcSlice, srcBox, dstTextureDesc, dstMipLevel, dstSlice, dstX, dstY, dstZ) {
      if (!srcBox) {
        srcBox = new Box();
        srcBox.max_x = Math.max(srcTextureDesc.width >> srcMipLevel, 1);
        srcBox.max_y = Math.max(srcTextureDesc.height >> srcMipLevel, 1);
        if (srcTextureDesc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
          srcBox.max_z = Math.max(srcTextureDesc.array_size_or_depth >> srcMipLevel, 1);
        }
      }
      this.ValidateTextureRegion(srcTextureDesc, srcMipLevel, srcSlice, srcBox);
      const dstBox2 = new Box();
      dstBox2.min_x = dstX;
      dstBox2.max_x = dstBox2.min_x + (srcBox.max_x - srcBox.min_x);
      dstBox2.min_y = dstY;
      dstBox2.max_y = dstBox2.min_y + (srcBox.max_y - srcBox.min_y);
      dstBox2.min_z = dstZ;
      dstBox2.max_z = dstBox2.min_z + (srcBox.max_z - srcBox.min_z);
      this.ValidateTextureRegion(dstTextureDesc, dstMipLevel, dstSlice, dstBox2);
    }
    ValidateTextureRegion(textureDesc, mipLevel, slice, box) {
      if (mipLevel >= textureDesc.mip_levels) {
        throw `mipLevel ${mipLevel} is out of allowed range [0, ${textureDesc.mip_levels - 1}]`;
      }
      if (box.min_x >= box.max_z) {
        throw "Incorrect X range";
      }
      if (box.min_y >= box.max_y) {
        throw "Incorrect Y range";
      }
      if (box.min_z >= box.max_z) {
        throw "Incorrect Z range";
      }
      if (textureDesc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY || textureDesc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE || textureDesc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY) {
        if (slice >= textureDesc.array_size_or_depth) {
          throw `depth or array slice is out of range [0, ${textureDesc.array_size_or_depth}]`;
        }
      } else {
        if (slice != 0) {
          throw "depth or array slice must be 0 for non-array textures";
        }
      }
      const mipWidth = Math.max(textureDesc.width >> mipLevel, 1);
      if (mipWidth < box.max_x) {
        throw `Regin max X coordinate is out of range [0, ${mipWidth}]`;
      }
      if (textureDesc == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
        const mipDepth = Math.max(textureDesc.array_size_or_depth >> mipLevel, 1);
        if (mipDepth < box.max_z) {
          throw `Regin max Z coordinate is out of range [0, ${mipDepth}]`;
        }
      }
    }
  };

  // src/render-backend/graphics-engine/textureview.js
  var TextureView = class {
    constructor(renderDevice2, viewDesc, texture) {
      this.render_device = renderDevice2;
      this.desc = viewDesc;
      this.texture = texture;
      this.sampler = null;
    }
    GetDesc() {
      return this.desc;
    }
    GetSampler() {
      return this.sampler;
    }
    GetTexture() {
      return this.texture;
    }
    Release() {
      throw "need implement";
    }
    SetSampler(sampler) {
      this.sampler = sampler;
    }
    GenerateMips(deviceContext) {
      throw "need implement";
    }
  };

  // src/render-backend/graphics-engine-webgl/textureview-gl.js
  var TextureViewGL = class extends TextureView {
    constructor(renderDevice2, viewDesc, texture, createGLViewTex) {
      super(renderDevice2, viewDesc, texture);
      if (createGLViewTex) {
        this.view_gl_texture = gl.createTexture();
      }
      this.view_texture_bind_target = void 0;
    }
    GetTexture() {
      if (this.view_gl_texture) {
        return this.view_gl_texture;
      } else {
        return this.texture.GetGLTexture();
      }
    }
    GetBindTarget() {
      if (this.view_texture_bind_target) {
        return this.view_texture_bind_target;
      } else {
        return this.GetTexture().GetBindTarget();
      }
    }
    Release() {
    }
    SetBindTarget(bindTarget) {
      this.view_texture_bind_target = bindTarget;
    }
    GenerateMips(deviceContext) {
      const contextState = deviceContext.GetContextState;
      const bindTarget = this.GetBindTarget();
      contextState.BindTexture(-1, bindTarget, this.GetTexture());
      gl.generateMipmap(bindTarget);
      contextState.BindTexture(-1, bindTarget, null);
    }
  };

  // src/render-backend/graphics-engine-webgl/texture-gl.js
  var FORMAT_GL_INTERNAL_FORMAT_MAP = {};
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
  FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UINT] = gl.RGBA16UI;
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
  FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RG8_SINT] = gl.RG8I;
  FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_TYPELESS] = gl.R16F;
  FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_FLOAT] = gl.R16F;
  FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_D16_UNORM] = gl.DEPTH_COMPONENT16;
  FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_UINT] = gl.R16UI;
  FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R16_SINT] = gl.R16I;
  FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_TYPELESS] = gl.R8;
  FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_UNORM] = gl.R8;
  FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_UINT] = gl.R8UI;
  FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM] = gl.R8_SNORM;
  FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_R8_SINT] = gl.R8I;
  FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB9E5_SHAREDEXP] = gl.RGB9_E5;
  var s3tc = gl.getExtension("WEBGL_compressed_texture_s3tc");
  if (s3tc) {
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC1_TYPELESS] = s3tc.COMPRESSED_RGB_S3TC_DXT1_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM] = s3tc.COMPRESSED_RGB_S3TC_DXT1_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC2_TYPELESS] = s3tc.COMPRESSED_RGBA_S3TC_DXT3_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM] = s3tc.COMPRESSED_RGBA_S3TC_DXT3_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC3_TYPELESS] = s3tc.COMPRESSED_RGBA_S3TC_DXT5_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM] = s3tc.COMPRESSED_RGBA_S3TC_DXT5_EXT;
  }
  var rgtc = gl.getExtension("EXT_texture_compression_rgtc");
  if (rgtc) {
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC4_TYPELESS] = rgtc.COMPRESSED_RED_RGTC1_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC4_UNORM] = rgtc.COMPRESSED_RED_RGTC1_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC4_SNORM] = rgtc.COMPRESSED_SIGNED_RED_RGTC1_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC5_TYPELESS] = rgtc.COMPRESSED_RED_GREEN_RGTC2_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC5_UNORM] = rgtc.COMPRESSED_RED_GREEN_RGTC2_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC5_SNORM] = rgtc.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
  }
  var bptc = gl.getExtension("EXT_texture_compression_bptc");
  if (bptc) {
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC6H_TYPELESS] = bptc.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC6H_UF16] = bptc.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC6H_SF16] = bptc.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC7_TYPELESS] = bptc.COMPRESSED_RGBA_BPTC_UNORM_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC7_UNORM] = bptc.COMPRESSED_RGBA_BPTC_UNORM_EXT;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_BC7_UNORM_SRGB] = bptc.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT;
  }
  var etc = gl.getExtension("WEBGL_compressed_texture_etc");
  if (etc) {
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB_ETC2_UNORM_BLOCK8] = etc.COMPRESSED_RGB8_ETC2;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGB_ETC2_SRGB_BLOCK8] = etc.COMPRESSED_SRGB8_ETC2;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_UNORM_BLOCK8] = etc.COMPRESSED_RGBA8_ETC2_EAC;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_SRGB_BLOCK8] = etc.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;
  }
  var astc = gl.getExtension("WEBGL_compressed_texture_astc");
  if (astc) {
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_4X4_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_4x4_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_4X4_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X4_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_5x4_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X4_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X4_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_5x4_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X4_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X5_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_5x5_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X5_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X5_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_6x5_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X5_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X6_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_6x6_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X6_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X5_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_8x5_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X5_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X6_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_8x6_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X6_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X8_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_8x8_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X8_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X5_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_10x5_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X5_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X6_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_10x6_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X6_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X8_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_10x8_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X8_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X10_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_10x10_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X10_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X10_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_12x10_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X10_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X12_UNORM_BLOCK16] = astc.COMPRESSED_RGBA_ASTC_12x12_KHR;
    FORMAT_GL_INTERNAL_FORMAT_MAP[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X12_SRGB_BLOCK16] = astc.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;
  }
  var NativePixelAttribs = class {
    constructor(pixelFormat = 0, dataType = 0, isCompressed = false) {
      this.pixel_format = pixelFormat;
      this.data_type = dataType;
      this.is_compressed = isCompressed;
    }
  };
  var FORMAT_TO_GL_PIXEL_FORMAT = [];
  FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN] = new NativePixelAttribs();
  FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_TYPELESS] = new NativePixelAttribs(gl.RGBA, gl.FLOAT);
  FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_FLOAT] = new NativePixelAttribs(gl.RGBA, gl.FLOAT);
  FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_UINT] = new NativePixelAttribs(gl.RGBA_INTEGER, gl.UNSIGNED_INT);
  FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_SINT] = new NativePixelAttribs(gl.RGBA_INTEGER, gl.INT);
  FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGB32_TYPELESS] = new NativePixelAttribs(gl.RGB, gl.FLOAT);
  FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGB32_FLOAT] = new NativePixelAttribs(gl.RGB, gl.FLOAT);
  FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGB32_UINT] = new NativePixelAttribs(gl.RGB_INTEGER, gl.UNSIGNED_INT);
  FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGB32_SINT] = new NativePixelAttribs(gl.RGB_INTEGER, gl.INT);
  FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_TYPELESS] = new NativePixelAttribs(gl.RGBA, gl.HALF_FLOAT);
  FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_FLOAT] = new NativePixelAttribs(gl.RGBA, gl.HALF_FLOAT);
  FORMAT_TO_GL_PIXEL_FORMAT[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UNORM] = new NativePixelAttribs(gl.RGBA, gl.UNSIGNED_SHORT);
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
    if (format > TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN && format < TEXTURE_FORMAT.TEX_FORMAT_NUM_FORMATS) {
      return FORMAT_TO_GL_PIXEL_FORMAT[format];
    } else {
      throw "texture format is out of expected range";
    }
  }
  function CorrectGLTexFormat(glTexFormat, bindFlags) {
    if (bindFlags & BIND_FLAGS.BIND_DEPTH_STENCILL) {
      if (glTexFormat == gl.R32F) {
        glTexFormat = gl.DEPTH_COMPONENT32F;
      }
    }
    return glTexFormat;
  }
  function TexFormatToGLInternalTexFormat(textureFormat, bindFlags = 0) {
    if (textureFormat >= TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN && textureFormat < TEXTURE_FORMAT.TEX_FORMAT_NUM_FORMATS) {
      let glFormat = FORMAT_GL_INTERNAL_FORMAT_MAP[textureFormat];
      if (bindFlags) {
        glFormat = CorrectGLTexFormat(glFormat, bindFlags);
      }
      return glFormat;
    } else {
      throw "Texture format is out of range";
    }
  }
  function GetCurrentBindTexture(bindTarget) {
    let currentTexture = null;
    switch (bindTarget) {
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
  var CubeMapFaces = [
    gl.TEXTURE_CUBE_MAP_POSITIVE_X,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
    gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
    gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
  ];
  var TextureGL = class extends Texture {
    constructor(renderDevice2, textureDesc, textureData) {
      super(renderDevice2, textureDesc);
      const deviceContext = this.render_device.GetImmediateContext();
      this.gl_texture = null;
      this.gl_renderbuffer = null;
      this.resolved_texture = null;
      this.gl_tex_format = TexFormatToGLInternalTexFormat(this.desc.format, this.desc.bind_flags);
      this.bind_target = gl.TEXTURE_2D;
      this.PBOs = [];
      this.current_PBO = null;
      this.fences = [];
      if (this.desc.sample_count <= 1) {
        this.gl_texture = gl.createTexture();
      }
      if (!this.gl_tex_format) {
        throw "unsupported texture format";
      }
      if (this.desc.usage == USAGE.USAGE_STATIC && !textureData.sub_resources.length) {
        throw "static texture must be initialized with data at creation time";
      }
      const currentRenderBuffer = gl.getParameter(gl.RENDERBUFFER_BINDING);
      if (this.desc.sample_count > 1) {
        if (this.desc.type != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D) {
          throw "only 2D textures support multisamples";
        }
        if (this.desc.bind_flags & BIND_FLAGS.BIND_DEPTH_STENCILL) {
          this.gl_renderbuffer = gl.createRenderbuffer();
          gl.bindRenderbuffer(gl.RENDERBUFFER, this.gl_renderbuffer);
          gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.desc.sample_count, this.gl_tex_format, this.desc.width, this.desc.height);
        } else {
          const caps = this.render_device.GetDeviceCaps();
          if (caps.multisample_rendertexture_supported) {
          } else {
            this.gl_renderbuffer = gl.createRenderbuffer();
            gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.desc.sample_count, this.gl_tex_format, this.desc.width, this.desc.height);
            if (this.desc.misc_flag & MISC_TEXTURE_FLAGS.MISC_TEXTURE_FLAG_RESOLVE) {
              const desc = Object.create(this.desc);
              desc.misc_flag &= ~MISC_TEXTURE_FLAGS.MISC_TEXTURE_FLAG_RESOLVE;
              desc.sample_count = 1;
              this.resolved_texture = new TextureGL(renderDevice2, deviceContext, desc, textureData).gl_texture;
            }
          }
        }
      } else {
        switch (this.desc.type) {
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
              for (let i = 0; i < this.desc.mip_levels; i++) {
                if (transferAttribs.is_compressed) {
                  if ((width % 4 == 0 || width == Math.max(width >> i, 1)) && (height % 4 == 0 || height == Math.max(height >> 1, i))) {
                    const blockByteInRow = Math.floor((width + formatAttribs.block_width - 1) / formatAttribs.block_width) * formatAttribs.component_size;
                    gl.compressedTexImage2D(this.bind_target, i, this.gl_tex_format, width, height, 0, Math.floor((height + formatAttribs.block_height - 1) / formatAttribs.block_height) * blockByteInRow, 0);
                  } else {
                    throw "compressed texture update region must be 4 pixel align";
                  }
                } else {
                  gl.texImage2D(this.bind_target, i, this.gl_tex_format, width, height, 0, transferAttribs.pixel_format, transferAttribs.data_type, null);
                }
                width = Math.max(1, width >> 1);
                height = Math.max(1, height >> 1);
              }
              this.SetDefaultGLParameters();
              if (textureData.sub_resources.length) {
                if (this.desc.mip_levels == textureData.sub_resources.length) {
                  for (let i = 0; i < this.desc.mip_levels; i++) {
                    const dstBox2 = new Box(0, Math.max(this.desc.width >> i, 1), 0, Math.max(this.desc.height >> i, 1));
                    this.UpdateData(deviceContext, i, 0, dstBox2, textureData.sub_resources[i]);
                  }
                } else {
                  throw "incorrect number of sub_resources";
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
              for (let i = 0; i < this.desc.mip_levels; i++) {
                if (transferAttribs.is_compressed) {
                  if ((width % 4 == 0 || width == Math.max(width >> i, 1)) && (height % 4 == 0 || height == Math.max(height >> 1, i))) {
                    const blockByteInRow = Math.floor((width + formatAttribs.block_width - 1) / formatAttribs.block_width) * formatAttribs.component_size;
                    gl.compressedTexImage3D(this.bind_target, i, this.gl_tex_format, width, height, this.desc.array_size_or_depth, 0, Math.floor((height + formatAttribs.block_height - 1) / formatAttribs.block_height) * blockByteInRow * this.desc.array_size_or_depth, 0);
                  } else {
                    throw "compressed texture update region must be 4 pixel align";
                  }
                } else {
                  gl.texImage3D(this.bind_target, i, this.gl_tex_format, width, height, this.desc.array_size_or_depth, 0, transferAttribs.pixel_format, transferAttribs.data_type, null);
                }
                width = Math.max(1, width >> 1);
                height = Math.max(1, height >> 1);
              }
              this.SetDefaultGLParameters();
              if (textureData.sub_resources.length) {
                if (this.desc.mip_levels * this.desc.array_size_or_depth == textureData.sub_resources.length) {
                  for (let i = 0; i < this.desc.array_size_or_depth; i++) {
                    for (let j = 0; j < this.desc.mip_levels; j++) {
                      const dstBox2 = new Box(0, Math.max(this.desc.width >> j, 1), 0, Math.max(this.desc.height >> j, 1));
                      this.UpdateData(deviceContext, j, i, dstBox2, textureData.sub_resources[j * i + j]);
                    }
                  }
                } else {
                  throw "incorrect number of sub_resources";
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
              let width = this.desc.width;
              let height = this.desc.height;
              let depth = this.desc.array_size_or_depth;
              gl.texParameteri(this.bind_target, gl.TEXTURE_MAX_LEVEL, this.desc.mip_levels - 1);
              for (let i = 0; i < this.desc.mip_levels; i++) {
                gl.texImage3D(this.bind_target, i, this.gl_tex_format, width, height, depth, 0, transferAttribs.pixel_format, transferAttribs.data_type, 0);
                width = Math.max(1, width >> 1);
                height = Math.max(1, height >> 1);
                depth = Math.max(1, depth >> 1);
              }
              this.SetDefaultGLParameters();
              if (textureData.sub_resources.length) {
                if (this.desc.mip_levels == textureData.sub_resources.length) {
                  for (let i = 0; i < this.desc.mip_levels; i++) {
                    const dstBox2 = new Box(0, Math.max(this.desc.width >> i, 1), 0, Math.max(this.desc.height >> i, 1), 0, Math.max(this.desc.depth >> i, 1));
                    this.UpdateData(deviceContext, i, 0, dstBox2, textureData.sub_resources[i]);
                  }
                } else {
                  throw "incorrect number of sub_resources";
                }
              }
              gl.bindTexture(this.bind_target, currentTexture);
            }
            break;
          case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE:
            {
              this.bind_target = gl.TEXTURE_CUBE_MAP;
              const currentTexture = GetCurrentBindTexture(this.bind_target);
              if (this.desc.array_size_or_depth != 6) {
                throw "cubemap texture is expected to have 6 slices";
              }
              gl.bindTexture(this.bind_target, this.gl_texture);
              const transferAttribs = FORMAT_TO_GL_PIXEL_FORMAT[this.desc.format];
              const formatAttribs = GetTextureFormatAttribs(this.desc.format);
              let width = this.desc.width;
              let height = this.desc.height;
              gl.texParameteri(this.bind_target, gl.TEXTURE_MAX_LEVEL, this.desc.mip_levels - 1);
              for (let i = 0; i < this.desc.mip_levels; i++) {
                for (let face = 0; face < 6; face++) {
                  if (transferAttribs.is_compressed) {
                    if ((width % 4 == 0 || width == Math.max(width >> i, 1)) && (height % 4 == 0 || height == Math.max(height >> 1, i))) {
                      const blockByteInRow = Math.floor((width + formatAttribs.block_width - 1) / formatAttribs.block_width) * formatAttribs.component_size;
                      gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, i, this.gl_tex_format, width, height, 0, Math.floor((height + formatAttribs.block_height - 1) / formatAttribs.block_height) * blockByteInRow, 0);
                    } else {
                      throw "compressed texture update region must be 4 pixel align";
                    }
                  } else {
                    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, i, this.gl_tex_format, width, height, 0, transferAttribs.pixel_format, transferAttribs.data_type, null);
                  }
                }
                width = Math.max(1, width >> 1);
                height = Math.max(1, height >> 1);
              }
              this.SetDefaultGLParameters();
              if (textureData.sub_resources.length) {
                if (this.desc.mip_levels * this.desc.array_size_or_depth == textureData.sub_resources.length) {
                  for (let i = 0; i < this.desc.array_size_or_depth; i++) {
                    for (let j = 0; j < this.desc.mip_levels; j++) {
                      const dstBox2 = new Box(0, Math.max(this.desc.width >> j, 1), 0, Math.max(this.desc.height >> j, 1));
                      this.UpdateData(deviceContext, j, i, dstBox2, textureData.sub_resources[j * i + j]);
                    }
                  }
                } else {
                  throw "incorrect number of sub_resources";
                }
              }
              gl.bindTexture(this.bind_target, currentTexture);
            }
            break;
          default:
            break;
        }
      }
      gl.bindRenderbuffer(gl.RENDERBUFFER, currentRenderBuffer);
    }
    GetGLTexture() {
      return this.gl_texture;
    }
    GetBindTarget() {
      return this.bind_target;
    }
    GetGLTexFormat() {
      return this.gl_tex_format;
    }
    Release() {
      if (this.gl_texture) {
        gl.deleteTexture(this.gl_texture);
      }
      if (this.gl_renderbuffer) {
        gl.deleteRenderbuffer(this.gl_renderbuffer);
      }
      if (this.resolved_texture) {
        gl.deleteTexture(this.resolved_texture);
      }
    }
    SetDefaultGLParameters() {
      gl.texParameteri(this.bind_target, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(this.bind_target, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }
    CreateViewInternal(viewDesc) {
      viewDesc = this.CorrectTextureViewDesc(viewDesc);
      const viewGLFormat = CorrectGLTexFormat(FORMAT_GL_INTERNAL_FORMAT_MAP[viewDesc.format], this.desc.bind_flags);
      if (viewGLFormat == 0) {
        throw "unsupported texture format";
      }
      let view;
      if (viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE) {
        const isFullTextureView = viewDesc.texture_dim == this.desc.type && viewDesc.format == GetViewFormat(this.desc.format, viewDesc.view_type, this.desc.bind_flags) && viewDesc.most_detailed_mip == 0 && viewDesc.num_mip_levels == this.desc.mip_levels && viewDesc.first_array_or_depth_slice == 0 && viewDesc.num_array_or_depth_slice == this.desc.array_size_or_depth;
        view = new TextureViewGL(
          this.render_device,
          viewDesc,
          this.desc.misc_flag & MISC_TEXTURE_FLAGS.MISC_TEXTURE_FLAG_RESOLVE && !this.render_device.GetDeviceCaps().multisample_rendertexture_supported ? this.resolved_texture : this,
          !isFullTextureView
        );
        if (!isFullTextureView) {
          let glViewTarget = 0;
          switch (viewDesc.texture_dim) {
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
            default:
              throw "unexpected texture view type";
          }
          view.SetBindTarget(glViewTarget);
        }
      } else if (viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_UNORDERED_ACCESS) {
        if (!(viewDesc.num_array_or_depth_slice == 1 || this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D && viewDesc.num_array_or_depth_slice == Math.max(viewDesc.most_detailed_mip, 1) || viewDesc.num_array_or_depth_slice == this.desc.array_size_or_depth)) {
          throw "only single array/depth slice or the whole texture can be bound as UAV";
        }
        if (viewDesc.access_flag == 0) {
          throw "at least one access flag must be specified";
        }
        view = new TextureViewGL(this.render_device, viewDesc, this, false);
      } else if (viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET) {
        if (viewDesc.um_mip_levels != 1) {
          throw "only single mipmap can be bound as RTV";
        }
        view = new TextureViewGL(this.render_device, viewDesc, this, false);
      } else if (viewDesc.view_type == TEXTURE_VIEW_TYPE.TEXTURE_VIEW_DEPTH_STENCIL) {
        if (viewDesc.um_mip_levels != 1) {
          throw "only single mipmap can be bound as DSV";
        }
        view = new TextureViewGL(this.render_device, viewDesc, this, false);
      }
      return view;
    }
    UpdateData(deviceContext, mipLevel, slice, dstBox2, subResData) {
      super.UpdateData(deviceContext, mipLevel, slice, dstBox2, subResData);
      const currentTexture = GetCurrentBindTexture(this.bind_target);
      switch (this.desc.type) {
        case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D:
          {
            gl.bindTexture(this.bind_target, this.gl_texture);
            let unpackBuffer = null;
            if (subResData.src_buffer) {
              unpackBuffer = subResData.src_buffer.GetGLBuffer();
            }
            gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, unpackBuffer);
            const transferAttribs = GetNativePixelTransferAttribs(this.desc.format);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
            if (transferAttribs.is_compressed) {
              if (!(dstBox2.min_x % 4 == 0 && dstBox2.min_y % 4 == 0) || (dstBox2.max_x % 4 == 0 || dstBox2.max_x == Math.max(this.desc.width >> mipLevel, 1)) || (dstBox2.max_y % 4 == 0 || dstBox2.max_y == Math.max(this.desc.height >> mipLevel, 1))) {
                throw "compressed texture update region must be 4-pixel aligned";
              }
              const fmtAttribs = GetTextureFormatAttribs(this.desc.format);
              const blockBytesInRow = (dstBox2.max_x - dstBox2.min_x + 3) / 4 * fmtAttribs.component_size;
              if (subResData.stride != blockBytesInRow) {
                throw "compressed data stride must match the size of a row of compressed block";
              }
              gl.compressedTexSubImage2D(
                this.bind_target,
                mipLevel,
                dstBox2.min_x,
                dstBox2.min_y,
                dstBox2.max_x - dstBox2.min_x,
                dstBox2.max_y - dstBox2.min_y,
                this.gl_tex_format,
                (dstBox2.max_y - dstBox2.min_y + 3) / 4 * subResData.stride,
                subResData.data
              );
            } else {
              const texFormatAttribs = GetTextureFormatAttribs(this.desc.format);
              const pixelSize = texFormatAttribs.component_size * texFormatAttribs.num_components;
              if (subResData.stride % pixelSize != 0) {
                throw "data stride is not multiple of pixelSize";
              }
              gl.pixelStorei(gl.UNPACK_ROW_LENGTH, subResData.stride / pixelSize);
              gl.pixelStorei(gl.UNPACK_SKIP_PIXELS, 0);
              gl.pixelStorei(gl.UNPACK_SKIP_ROWS, 0);
              gl.texSubImage2D(
                this.bind_target,
                mipLevel,
                dstBox2.min_x,
                dstBox2.min_y,
                dstBox2.max_x - dstBox2.min_x,
                dstBox2.max_y - dstBox2.min_y,
                transferAttribs.pixel_format,
                transferAttribs.data_type,
                subResData.data
              );
            }
            if (unpackBuffer) {
              gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, null);
            }
          }
          break;
        case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY:
          {
            gl.bindTexture(this.bind_target, this.gl_texture);
            let unpackBuffer = null;
            if (subResData.src_buffer) {
              unpackBuffer = subResData.src_buffer.GetGLBuffer();
            }
            gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, unpackBuffer);
            const transferAttribs = GetNativePixelTransferAttribs(this.desc.format);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
            if (transferAttribs.is_compressed) {
              if (!(dstBox2.min_x % 4 == 0 && dstBox2.min_y % 4 == 0) || (dstBox2.max_x % 4 == 0 || dstBox2.max_x == Math.max(this.desc.width >> mipLevel, 1)) || (dstBox2.max_y % 4 == 0 || dstBox2.max_y == Math.max(this.desc.height >> mipLevel, 1))) {
                throw "compressed texture update region must be 4-pixel aligned";
              }
              const fmtAttribs = GetTextureFormatAttribs(this.desc.format);
              const blockBytesInRow = (dstBox2.max_x - dstBox2.min_x + 3) / 4 * fmtAttribs.component_size;
              if (subResData.stride != blockBytesInRow) {
                throw "compressed data stride must match the size of a row of compressed block";
              }
              gl.compressedTexSubImage3D(
                this.bind_target,
                mipLevel,
                dstBox2.min_x,
                dstBox2.min_y,
                slice,
                dstBox2.max_x - dstBox2.min_x,
                dstBox2.max_y - dstBox2.min_y,
                1,
                this.gl_tex_format,
                (dstBox2.max_y - dstBox2.min_y + 3) / 4 * subResData.stride,
                subResData.data
              );
            } else {
              const texFormatAttribs = GetTextureFormatAttribs(this.desc.format);
              const pixelSize = texFormatAttribs.component_size * texFormatAttribs.num_components;
              if (subResData.stride % pixelSize != 0) {
                throw "data stride is not multiple of pixelSize";
              }
              gl.pixelStorei(gl.UNPACK_ROW_LENGTH, subResData.stride / pixelSize);
              gl.pixelStorei(gl.UNPACK_SKIP_PIXELS, 0);
              gl.pixelStorei(gl.UNPACK_SKIP_ROWS, 0);
              gl.texSubImage3D(
                this.bind_target,
                mipLevel,
                dstBox2.min_x,
                dstBox2.min_y,
                slice,
                dstBox2.max_x - dstBox2.min_x,
                dstBox2.max_y - dstBox2.min_y,
                1,
                transferAttribs.pixel_format,
                transferAttribs.data_type,
                subResData.data
              );
            }
            if (unpackBuffer) {
              gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, null);
            }
          }
          break;
        case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D:
          {
            gl.bindTexture(this.bind_target, this.gl_texture);
            let unpackBuffer = null;
            if (subResData.src_buffer) {
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
            if (subResData.stride % pixelSize != 0) {
              throw "data stride is not multiple of pixelSize";
            }
            gl.pixelStorei(gl.UNPACK_ROW_LENGTH, subResData.stride / pixelSize);
            gl.texSubImage3D(
              this.bind_target,
              mipLevel,
              dstBox2.min_x,
              dstBox2.min_y,
              slice,
              dstBox2.max_x - dstBox2.min_x,
              dstBox2.max_y - dstBox2.min_y,
              1,
              transferAttribs.pixel_format,
              transferAttribs.data_type,
              subResData.data
            );
            if (unpackBuffer) {
              gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, null);
            }
          }
          break;
        case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE:
          {
            gl.bindTexture(this.bind_target, this.gl_texture);
            const cubemapFaceBindTarget = CubeMapFaces[slice];
            let unpackBuffer = null;
            if (subResData.src_buffer) {
              unpackBuffer = subResData.src_buffer.GetGLBuffer();
            }
            gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, unpackBuffer);
            const transferAttribs = GetNativePixelTransferAttribs(this.desc.format);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
            if (transferAttribs.is_compressed) {
              if (!(dstBox2.min_x % 4 == 0 && dstBox2.min_y % 4 == 0) || (dstBox2.max_x % 4 == 0 || dstBox2.max_x == Math.max(this.desc.width >> mipLevel, 1)) || (dstBox2.max_y % 4 == 0 || dstBox2.max_y == Math.max(this.desc.height >> mipLevel, 1))) {
                throw "compressed texture update region must be 4-pixel aligned";
              }
              const fmtAttribs = GetTextureFormatAttribs(this.desc.format);
              const blockBytesInRow = (dstBox2.max_x - dstBox2.min_x + 3) / 4 * fmtAttribs.component_size;
              if (subResData.stride != blockBytesInRow) {
                throw "compressed data stride must match the size of a row of compressed block";
              }
              gl.compressedTexSubImage2D(
                cubemapFaceBindTarget,
                mipLevel,
                dstBox2.min_x,
                dstBox2.min_y,
                dstBox2.max_x - dstBox2.min_x,
                dstBox2.max_y - dstBox2.min_y,
                this.gl_tex_format,
                (dstBox2.max_y - dstBox2.min_y + 3) / 4 * subResData.stride,
                subResData.data
              );
            } else {
              const texFormatAttribs = GetTextureFormatAttribs(this.desc.format);
              const pixelSize = texFormatAttribs.component_size * texFormatAttribs.num_components;
              if (subResData.stride % pixelSize != 0) {
                throw "data stride is not multiple of pixelSize";
              }
              gl.pixelStorei(gl.UNPACK_ROW_LENGTH, subResData.stride / pixelSize);
              gl.pixelStorei(gl.UNPACK_SKIP_PIXELS, 0);
              gl.pixelStorei(gl.UNPACK_SKIP_ROWS, 0);
              gl.texSubImage2D(
                cubemapFaceBindTarget,
                mipLevel,
                dstBox2.min_x,
                dstBox2.min_y,
                dstBox2.max_x - dstBox2.min_x,
                dstBox2.max_y - dstBox2.min_y,
                transferAttribs.pixel_format,
                transferAttribs.data_type,
                subResData.data
              );
            }
          }
          break;
        default:
          break;
      }
      gl.bindTexture(this.bind_target, currentTexture);
      gl.pixelStorei(gl.UNPACK_ROW_LENGTH, 0);
    }
    CopyData(deviceContext, srcTexture, srcMipLevel, srcSlice, srcBox, dstMipLevel, dstSlice, dstX, dstY, dstZ) {
      super.CopyData(
        deviceContext,
        srcTexture,
        srcMipLevel,
        srcSlice,
        srcBox,
        dstMipLevel,
        dstSlice,
        dstX,
        dstY,
        dstZ
      );
      const srcTextureDesc = srcTexture.GetDesc();
      if (!srcBox) {
        srcBox = new Box();
        srcBox.max_x = Math.max(srcTextureDesc.width >> srcMipLevel, 1);
        srcBox.max_y = Math.max(srcTextureDesc.height >> srcMipLevel, 1);
        if (srcTextureDesc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D) {
          srcBox.max_z = Math.max(srcTextureDesc.array_size_or_depth >> srcMipLevel, 1);
        } else {
          srcBox.max_z = 1;
        }
      }
      if (this.desc.type == RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D) {
      } else {
        throw "WebGL texture copy not supported";
      }
    }
    AttachToFramebuffer(viewDesc, attachmentPoint) {
      switch (this.desc.type) {
        case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D: {
          if (this.desc.sample_count >= 2) {
            if (attachmentPoint == gl.DEPTH_STENCIL_ATTACHMENT || attachmentPoint == gl.DEPTH_ATTACHMENT) {
              gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachmentPoint, gl.RENDERBUFFER, this.gl_renderbuffer);
            } else {
              if (this.render_device.GetDeviceCaps().multisample_rendertexture_supported && viewDesc.format) {
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
        case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D_ARRAY: {
          if (viewDesc.num_array_or_depth_slice == this.desc.array_size_or_depth) {
            throw "Render target not support entire 2D Array Texture";
          } else if (viewDesc.num_array_or_depth_slice == 1) {
            gl.framebufferTextureLayer(gl.DRAW_FRAMEBUFFER, attachmentPoint, this.gl_texture, viewDesc.most_detailed_mip, viewDesc.first_array_or_depth_slice);
            gl.framebufferTextureLayer(gl.READ_FRAMEBUFFER, attachmentPoint, this.gl_texture, viewDesc.most_detailed_mip, viewDesc.first_array_or_depth_slice);
          } else {
            throw "Only one slice or the entire texture array can be attached to a framebuffer";
          }
          break;
        }
        case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_3D: {
          const numDepthSlicesInMip = this.desc.array_size_or_depth >> viewDesc.most_detailed_mip;
          if (viewDesc.num_array_or_depth_slice == numDepthSlicesInMip) {
            throw "Render target not support entire 3D Array Texture";
          } else if (viewDesc.num_array_or_depth_slice == 1) {
            gl.framebufferTextureLayer(gl.DRAW_FRAMEBUFFER, attachmentPoint, this.gl_texture, viewDesc.most_detailed_mip, viewDesc.first_array_or_depth_slice);
            gl.framebufferTextureLayer(gl.READ_FRAMEBUFFER, attachmentPoint, this.gl_texture, viewDesc.most_detailed_mip, viewDesc.first_array_or_depth_slice);
          } else {
            throw "Only one slice or the entire 3D texture can be attached to a framebuffer";
          }
          break;
        }
        case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE: {
          if (viewDesc.num_array_or_depth_slice == this.desc.array_size_or_depth) {
            throw "Render Target not support entire Cube Array Texture";
          } else if (viewDesc.num_array_or_depth_slice == 1) {
            const cubemapFaceBindTarget = CubeMapFaces[viewDesc.first_array_or_depth_slice];
            gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, attachmentPoint, cubemapFaceBindTarget, this.gl_texture, viewDesc.most_detailed_mip);
            gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, attachmentPoint, cubemapFaceBindTarget, this.gl_texture, viewDesc.most_detailed_mip);
          } else {
            throw "Only one slice or the entire Cube Array texture can be attached to a framebuffer";
          }
          break;
        }
        case RESOURCE_DIMENSION.RESOURCE_DIM_TEX_CUBE_ARRAY: {
          gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, attachmentPoint, this.bind_target, this.gl_texture, viewDesc.most_detailed_mip);
          gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, attachmentPoint, this.bind_target, this.gl_texture, viewDesc.most_detailed_mip);
          break;
        }
        default:
          break;
      }
    }
    ReadPixels(deviceContext, pixels, isHDR) {
      if (isHDR && (this.desc.type != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D || this.desc.format != TEXTURE_FORMAT.TEX_FORMAT_RGBA32_FLOAT)) {
        console.error("Read Pixels only support 2D Texture, HDR Texture only support RGBA32F");
        return;
      }
      if (!isHDR && (this.desc.type != RESOURCE_DIMENSION.RESOURCE_DIM_TEX_2D || this.desc.format != TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM)) {
        console.error("Read Pixels only support 2D Texture, 8bit Texture only support RGBA8");
      }
      const fbo = gl.createFramebuffer();
      deviceContext.GetContextState().BindFBO(fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.gl_texture, 0);
      if (this.desc.misc_flag & MISC_TEXTURE_FLAGS.MISC_TEXTURE_FLAG_ASYNC_READ) {
        const defaultPBO = gl.getParameter(gl.PIXEL_PACK_BUFFER_BINDING);
        if (!this.PBOs[0] || !this.PBOs[1]) {
          this.PBOs[0] = gl.createBuffer();
          this.PBOs[1] = gl.createBuffer();
          gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.PBOs[0]);
          gl.bufferData(gl.PIXEL_PACK_BUFFER, this.desc.width * this.desc.height * 4 * (isHDR ? 4 : 1), gl.STREAM_READ);
          this.fences[0] = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
          gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.PBOs[1]);
          gl.bufferData(gl.PIXEL_PACK_BUFFER, this.desc.width * this.desc.height * 4 * (isHDR ? 4 : 1), gl.STREAM_READ);
          this.fences[1] = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
          gl.bindBuffer(gl.PIXEL_PACK_BUFFER, defaultPBO);
        }
        gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.PBOs[this.current_PBO]);
        gl.readPixels(0, 0, this.desc.width, this.desc.height, gl.RGBA, isHDR ? gl.FLOAT : gl.UNSIGNED_BYTE, 0);
        this.fences[this.current_PBO] = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        if (this.fences[(this.current_PBO + 1) % 2]) {
          gl.waitSync(this.fences[(this.current_PBO + 1) % 2], 0, gl.TIMEOUT_IGNORED);
          gl.deleteSync(this.fences[(this.current_PBO + 1) % 2]);
          this.fences[(this.current_PBO + 1) % 2] = null;
        }
        gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.PBOs[(this.current_PBO + 1) % 2]);
        gl.getBufferSubData(gl.PIXEL_PACK_BUFFER, 0, pixels, 0, this.desc.width * this.desc.height * 4 * (isHDR ? 4 : 1));
        gl.bindBuffer(gl.PIXEL_PACK_BUFFER, defaultPBO);
        deviceContext.InvalidateState();
      } else {
        gl.readPixels(0, 0, this.desc.width, this.desc.height, gl.RGBA, isHDR ? gl.FLOAT : gl.UNSIGNED_BYTE, pixels);
      }
    }
    ReadPixels(deviceContext, pixels) {
      if (pixels instanceof Float32Array) {
        return this.ReadPixels(deviceContext, pixels, true);
      } else {
        return this.ReadPixels(deviceContext, pixels, false);
      }
    }
  };

  // src/render-backend/graphics-engine-webgl/render-device-gl.js
  var EngineGLAttribs = class extends EngineCreationAttribs {
    constructor() {
      super();
      this.device_type = DEVICE_TYPE.DEVICE_TYPE_OPENGLES;
      this.context_creation_type = CONTEXT_CREATION_TYPE.ATTACH;
    }
  };
  var RenderDeviceGL = class extends RenderDevice {
    constructor(engineAttribs) {
      super(engineAttribs.custom_device_caps, 0);
      this.gl_context = new GLContext(engineAttribs, this.device_caps);
      this.device_caps.separable_program_supported = false;
      this.extension_strings = gl.getSupportedExtensions();
      this.CheckProgramBinarySupported();
      this.FlagSupportedTexFormats();
      this.QueryDeviceCaps();
      const glVendorStr = gl.getParameter(gl.VENDOR);
      console.info("GPU Vendor: {}", glVendorStr);
      this.FBO_cache = /* @__PURE__ */ new Map();
      this.VAO_cache = /* @__PURE__ */ new Map();
      this.InitDeviceLimits();
    }
    InitDeviceLimits() {
      this.device_caps.limit_caps.max_msaa_sample_count = gl.getParameter(gl.MAX_SAMPLES);
      let size = gl.getParameter(gl.MAX_TEXTURE_SIZE);
      this.device_caps.limit_caps.max_texture_size_1D = size;
      this.device_caps.limit_caps.max_texture_size_2D = size;
      this.device_caps.limit_caps.max_texture_size_3D = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);
      this.device_caps.limit_caps.max_texture_size_cube = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
      this.device_caps.limit_caps.max_texture_array_layers = gl.getParameter(gl.MAX_ARRAY_TEXTURE_LAYERS);
    }
    GetFBOCache(context) {
      return this.FBO_cache[context];
    }
    OnReleaseTexture(texture) {
      for (let [context, fboCache] of this.FBO_cache) {
        fboCache.OnReleaseTexture(texture);
      }
    }
    GetVAOCache(context) {
      return this.VAO_cache[context];
    }
    OnDestroyPSO(pso) {
      for (let [context, vaoCache] of this.VAO_cache) {
        vaoCache.OnDestroyPSO(pso);
      }
    }
    OnDestroyBuffer(buffer) {
      for (let [context, vaoCache] of this.VAO_cache) {
        vaoCache.OnDestroyBuffer(buffer);
      }
    }
    CreateBuffer(bufferDesc2, bufferData) {
      const buffer = new BufferGL(this, bufferDesc2, bufferData);
      buffer.CreateDefaultViews();
      return buffer;
    }
    CreateShader(shaderCreationAttribs) {
      return new ShaderGL(this, shaderCreationAttribs);
    }
    CreateProgram(programDesc) {
      return new ProgramGL(this, programDesc);
    }
    CreateTexture(textureDesc, textureData) {
      const deviceContext = this.GetImmediateContext();
      if (!deviceContext) {
        throw "immediate device context has been destroyed";
      }
      const fmtInfo = this.GetTextureFormatInfo(textureDesc.format);
      const texture = new TextureGL(this, textureDesc, textureData);
      texture.CreateDefaultViews();
      return texture;
    }
    CreateSampler(samplerDesc) {
      return new SamplerGL(this, samplerDesc);
    }
    CreatePipelineState(pipelineStateDesc) {
      return new PipelineStateGL(this, pipelineStateDesc);
    }
    CreateTestGLTexture(contextState, glBingTarget, glTexture, cb) {
      contextState.BindTexture(-1, glBingTarget, glTexture);
      cb();
      const isSuccess = gl.getError() == gl.NO_ERROR;
      contextState.BindTexture(-1, glBingTarget, void 0);
      return isSuccess;
    }
    TestTextureFormat(textureFormat) {
      const formatInfo = this.texture_format_infos[textureFormat];
      if (!formatInfo.supported) {
        throw "texture format is not supported";
      }
      const glFormat = TexFormatToGLInternalTexFormat(textureFormat);
      if (!glFormat) {
        throw "incorrect internal GL format";
      }
      const deviceContext = this.GetImmediateContext();
      if (!deviceContext) {
        throw "immediate device context has been destroyed";
      }
      const contextState = deviceContext.GetContextState();
      const transferAttribs = GetNativePixelTransferAttribs(textureFormat);
      const testTextureDim = 32;
      const testTextureDepth = 8;
      formatInfo.texture2D_format = false;
      formatInfo.texture_cube_format = false;
      const testGLTexture = gl.createTexture();
      formatInfo.texture2D_format = this.CreateTestGLTexture(contextState, gl.TEXTURE_2D, testGLTexture, () => {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAX_LEVEL, 0);
        if (transferAttribs.is_compressed) {
          gl.compressedTexImage2D(gl.TEXTURE_2D, 0, glFormat, testTextureDim, testTextureDim, 0);
        } else {
          gl.texImage2D(gl.TEXTURE_2D, 0, glFormat, testTextureDim, testTextureDim, 0, transferAttribs.pixel_format, transferAttribs.data_type, null);
        }
      });
      if (formatInfo.texture2D_format) {
        const testGLCubeTexture = gl.createTexture();
        formatInfo.texture_cube_format = this.CreateTestGLTexture(contextState, gl.TEXTURE_CUBE_MAP, testGLCubeTexture, () => {
          gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAX_LEVEL, 0);
          for (let i = 0; i < 6; i++) {
            if (transferAttribs.is_compressed) {
              gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glFormat, testTextureDim, testTextureDim, 0);
            } else {
              gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glFormat, testTextureDim, testTextureDim, 0, transferAttribs.pixel_format, transferAttribs.data_type, null);
            }
          }
        });
        gl.deleteTexture(testGLCubeTexture);
        const shouldTestDepthAttachment = formatInfo.component_type == COMPONENT_TYPE.COMPONENT_TYPE_DEPTH || formatInfo.component_type == COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL;
        const shouldTestColorAttachment = !shouldTestDepthAttachment && formatInfo.component_type != COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED;
        let newFBO;
        let currentFramebuffer;
        if (shouldTestDepthAttachment || shouldTestColorAttachment) {
          currentFramebuffer = gl.getParameter(gl.DRAW_FRAMEBUFFER_BINDING);
          newFBO = gl.createFramebuffer();
          gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER_BINDING, newFBO);
        }
        if (shouldTestDepthAttachment) {
          const attachmentPoint = formatInfo.component_type == COMPONENT_TYPE.COMPONENT_TYPE_DEPTH ? gl.DEPTH_ATTACHMENT : gl.DEPTH_STENCIL_ATTACHMENT;
          gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, testGLTexture, 0);
          if (gl.getError() == gl.NO_ERROR) {
            const colorTexture = gl.createTexture();
            const success = this.CreateTestGLTexture(contextState, gl.TEXTURE_2D, colorTexture, () => {
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAX_LEVEL, 0);
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, testTextureDim, testTextureDim, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            });
            if (!success) {
              throw "failed to create dummy render target texture";
            }
            gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTexture, 0);
            gl.drawBuffers([gl.COLOR_ATTACHMENT0]);
            const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            formatInfo.depth_renderable = gl.getError() == gl.NO_ERROR && status == gl.FRAMEBUFFER_COMPLETE;
            gl.deleteTexture(colorTexture);
          }
        } else if (shouldTestColorAttachment) {
          gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, testGLTexture, 0);
          if (gl.getError() == gl.NO_ERROR) {
            gl.drawBuffers([gl.COLOR_ATTACHMENT0]);
            const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            formatInfo.color_renderable = gl.getError() == gl.NO_ERROR && status == gl.FRAMEBUFFER_COMPLETE;
          }
        }
        if (shouldTestDepthAttachment || shouldTestColorAttachment) {
          gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, currentFramebuffer);
        }
      }
      formatInfo.support_multisample = false;
      if (formatInfo.component_type != COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED && this.device_caps.texture_caps.texture2D_multisample_suppored) {
        console.error("multiple-sample texture not supported");
      }
      formatInfo.texture3D_format = false;
      if (!(formatInfo.component_type == COMPONENT_TYPE.COMPONENT_TYPE_DEPTH || formatInfo.component_type == COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL)) {
        const testGLTexture2 = gl.createTexture();
        formatInfo.texture3D_format = this.CreateTestGLTexture(contextState, gl.TEXTURE_3D, testGLTexture2, () => {
          gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAX_LEVEL, 0);
          if (transferAttribs.is_compressed) {
            gl.compressedTexImage3D(gl.TEXTURE_3D, 0, glFormat, testTextureDim, testTextureDim, testTextureDepth, 0);
          } else {
            gl.texImage3D(gl.TEXTURE_3D, 0, glFormat, testTextureDim, testTextureDim, testTextureDepth, 0, transferAttribs.pixel_format, transferAttribs.data_type, null);
          }
        });
        gl.deleteTexture(testGLTexture2);
      }
      gl.deleteTexture(testGLTexture);
    }
    CheckProgramBinarySupported() {
      this.device_caps.shader_binary_supported = false;
    }
    CheckExtension(extensionString) {
      for (let i = 0; i < this.extension_strings.length; i++) {
        if (this.extension_strings[i].indexOf(extensionString) != -1) {
          return true;
        }
      }
      return false;
    }
    FlagSupportedTexFormats() {
      const deviceCaps2 = this.device_caps;
      const isGL330OrAbove = deviceCaps2.dev_type == DEVICE_TYPE.DEVICE_TYPE_OPENGLES && (deviceCaps2.major_version >= 4 || deviceCaps2.major_version == 3 && deviceCaps2.minor_version >= 3);
      if (deviceCaps2.dev_type == DEVICE_TYPE.DEVICE_TYPE_OPENGLES) {
        deviceCaps2.multisample_rendertexture_supported = this.CheckExtension("EXT_multisampled_render_to_texture");
      } else {
        deviceCaps2.multisample_rendertexture_supported = false;
      }
      const supportRGTC = this.CheckExtension("EXT_texture_compression_rgtc");
      const supportBPTC = this.CheckExtension("EXT_texture_compression_bptc");
      const supportS3TC = this.CheckExtension("WEBGL_compressed_texture_s3tc");
      const supportASTC = this.CheckExtension("WEBGL_compressed_texture_astc");
      const supportETC2 = this.CheckExtension("WEBGL_compressed_texture_etc");
      const supportTexNorm16 = this.CheckExtension("EXT_texture_norm16");
      const supportReversedZ = deviceCaps2.major_version == 4 && deviceCaps2.minor_version >= 5 || this.CheckExtension("EXT_clip_control");
      deviceCaps2.reversedz_perspective &= supportReversedZ;
      if (deviceCaps2.reversedz_perspective) {
        const extClipControl = gl.getExtension("EXT_clip_control");
        extClipControl.clipControlEXT(extClipControl.LOWER_LEFT_EXT, extClipControl.ZERO_TO_ONE_EXT);
      }
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_FLOAT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_UINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA32_SINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGB32_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGB32_FLOAT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGB32_UINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGB32_SINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_FLOAT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UNORM].supported = isGL330OrAbove || supportTexNorm16;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SNORM].supported = isGL330OrAbove || supportTexNorm16;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG32_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG32_FLOAT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG32_UINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG32_SINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R32G8X24_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT_S8X24_UINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT_X8X24_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_UNORM].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_UINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R11G11B10_FLOAT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA8_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM_SRGB].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SNORM].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG16_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG16_FLOAT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG16_UNORM].supported = isGL330OrAbove || supportTexNorm16;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG16_UINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG16_SNORM].supported = isGL330OrAbove || supportTexNorm16;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG16_SINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R32_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R32_UINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R32_SINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R24G8_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_D24_UNORM_S8_UINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R24_UNORM_X8_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG8_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG8_UNORM].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG8_UINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG8_SNORM].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RG8_SINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R16_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R16_FLOAT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_D16_UNORM].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R16_UNORM].supported = isGL330OrAbove || supportTexNorm16;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R16_UINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R16_SNORM].supported = isGL330OrAbove || supportTexNorm16;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R16_SINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R8_TYPELESS].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R8_UNORM].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R8_UINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_R8_SINT].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGB9E5_SHAREDEXP].supported = true;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC1_TYPELESS].supported = supportS3TC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM].supported = supportS3TC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM_SRGB].supported = supportS3TC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC2_TYPELESS].supported = supportS3TC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM].supported = supportS3TC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM_SRGB].supported = supportS3TC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC3_TYPELESS].supported = supportS3TC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM].supported = supportS3TC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM_SRGB].supported = supportS3TC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC4_TYPELESS].supported = supportRGTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC4_UNORM].supported = supportRGTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC4_SNORM].supported = supportRGTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC5_TYPELESS].supported = supportRGTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC5_UNORM].supported = supportRGTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC5_SNORM].supported = supportRGTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC6H_TYPELESS].supported = supportBPTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC6H_UF16].supported = supportBPTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC6H_SF16].supported = supportBPTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC7_TYPELESS].supported = supportBPTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC7_UNORM].supported = supportBPTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_BC7_UNORM_SRGB].supported = supportBPTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGB_ETC2_UNORM_BLOCK8].supported = supportETC2;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGB_ETC2_SRGB_BLOCK8].supported = supportETC2;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_UNORM_BLOCK8].supported = supportETC2;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_SRGB_BLOCK8].supported = supportETC2;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_UNORM_BLOCK16].supported = supportETC2;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ETC2_SRGB_BLOCK16].supported = supportETC2;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_4X4_UNORM_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_4X4_SRGB_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X4_UNORM_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X4_SRGB_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X5_UNORM_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_5X5_SRGB_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X5_UNORM_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X5_SRGB_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X6_UNORM_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_6X6_SRGB_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X5_UNORM_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X5_SRGB_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X6_UNORM_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X6_SRGB_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X8_UNORM_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_8X8_SRGB_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X5_UNORM_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X5_SRGB_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X6_UNORM_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X6_SRGB_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X8_UNORM_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X8_SRGB_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X10_UNORM_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_10X10_SRGB_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X10_UNORM_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X10_SRGB_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X12_UNORM_BLOCK16].supported = isGL330OrAbove || supportASTC;
      this.texture_format_infos[TEXTURE_FORMAT.TEX_FORMAT_RGBA_ASTC_12X12_SRGB_BLOCK16].supported = isGL330OrAbove || supportASTC;
    }
    QueryDeviceCaps() {
      const isGL430OrAbove = this.device_caps.dev_type == DEVICE_TYPE.DEVICE_TYPE_OPENGLES && (this.device_caps.major_version > 4 || this.device_caps.major_version == 4 && this.device_caps.minor_version >= 3);
      this.device_caps.compute_shader_supported = isGL430OrAbove || this.CheckExtension("ARB_compute_shader");
      this.device_caps.geometry_shader_supported = isGL430OrAbove || this.CheckExtension("ARB_geometry_shader");
      this.device_caps.tessellation_supported = isGL430OrAbove || this.CheckExtension("ARB_tessellation_shader");
      this.device_caps.texture_caps.texture2D_copy_supported = isGL430OrAbove || this.CheckExtension("ARB_copy_image");
      this.device_caps.texture_caps.texture2D_load_store_supported = isGL430OrAbove || this.CheckExtension("ARB_shader_image_load_store");
      this.device_caps.texture_caps.textureview_supported = isGL430OrAbove || this.CheckExtension("ARB_texture_view");
      this.device_caps.independent_blend_supported = this.device_caps.dev_type == DEVICE_TYPE.DEVICE_TYPE_OPENGLES && (this.device_caps.major_version > 3 || this.device_caps.major_version == 3 && this.device_caps.minor_version >= 2);
    }
  };

  // src/render-backend/graphics/device-context-desc.js
  var SET_VERTEX_BUFFERS_FLAGS = {
    SET_VERTEX_BUFFERS_FLAG_RESET: 1
  };
  var Viewport = class {
    constructor() {
      this.top_left_x = 0;
      this.top_left_y = 0;
      this.width = 0;
      this.height = 0;
      this.min_depth = 0;
      this.max_depth = 1;
    }
  };
  var Rect = class {
    constructor() {
      this.left = 0;
      this.top = 0;
      this.right = 0;
      this.bottom = 0;
    }
  };
  var RenderPassFlag = class {
    constructor() {
      this.clear = TARGET_BUFFER_FLAGS.NONE;
      this.discard_start = TARGET_BUFFER_FLAGS.NONE;
      this.discard_end = TARGET_BUFFER_FLAGS.NONE;
    }
  };
  var RenderPassAttribs = class {
    constructor() {
      this.num_render_targets = 0;
      this.clear_color = [];
      this.depth_value = 1;
      this.stencil_value = 0;
      this.flags = new RenderPassFlag();
    }
  };

  // src/render-backend/graphics-engine/device-context.js
  var VertexStreamInfo = class {
    constructor() {
      this.buffer = null;
      this.offset = 0;
    }
  };
  var DeviceContext = class {
    constructor(renderDevice2, isDeferred) {
      this.render_device = renderDevice2;
      this.is_deferred = isDeferred;
      this.pipelinestate = null;
      this.stencil_ref = 0;
      this.blend_factors = [-1, -1, -1, -1];
      this.vertex_streams = [];
      for (let i = 0; i < MAX_BUFFER_SLOTS; i++) {
        this.vertex_streams[i] = new VertexStreamInfo();
      }
      this.num_vertex_streams = 0;
      this.index_buffer = null;
      this.index_data_start_offset = 0;
      this.framebuffer_width = 0;
      this.framebuffer_height = 0;
      this.framebuffer_slices = 0;
      this.is_default_framebuffer_bound = false;
      this.swapchain = null;
      this.num_targets_to_resolve = 0;
      this.pre_render_targets_to_resolve = [];
      this.num_bind_render_targets = 0;
      this.bound_render_targets = [];
      this.bound_depth_stencil = null;
      this.num_viewports = 0;
      this.viewports = [];
      for (let i = 0; i < MAX_VIEWPORTS; i++) {
        this.viewports[i] = new Viewport();
      }
      this.num_scissor_rects = 0;
      this.scissor_rects = [];
      for (let i = 0; i < MAX_VIEWPORTS; i++) {
        this.scissor_rects[i] = new Rect();
      }
      this.render_pass_attribs = null;
      this.active_render_pass = false;
    }
    ResolveResource(msaaTexture, resolvedTexture) {
      throw "implementation needed";
    }
    SetSwapChain(swapchain) {
      this.swapchain = swapchain;
    }
    SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags) {
      if (startSlot >= MAX_BUFFER_SLOTS) {
        throw `start vertex buffer slot ${startSlot} is out of range [0, ${MAX_BUFFER_SLOTS - 1}]`;
      }
      if (startSlot + numBufferSet > MAX_BUFFER_SLOTS) {
        console.error(`vertex buffer slots [${startSlot}, ${startSlot + numBufferSet - 1}] is out of range [0, ${MAX_BUFFER_SLOTS - 1}]`);
        numBufferSet = MAX_BUFFER_SLOTS - startSlot;
      }
      if (flags & SET_VERTEX_BUFFERS_FLAGS.SET_VERTEX_BUFFERS_FLAG_RESET) {
        for (let i = 0; i < this.num_vertex_streams; i++) {
          this.vertex_streams = new VertexStreamInfo();
        }
        this.num_vertex_streams = 0;
      }
      this.num_vertex_streams = Math.max(this.num_vertex_streams, startSlot + numBufferSet);
      for (let buff = 0; buff < numBufferSet; buff++) {
        const currentStream = this.vertex_streams[startSlot + buff];
        currentStream.buffer = buffers[buff];
        currentStream.offset = offsets[buff];
        if (currentStream.buff) {
          const bufferDesc2 = currentStream.buff.GetDesc();
          if (!(bufferDesc2.bind_flags & BIND_FLAGS.BIND_VERTEX_BUFFER)) {
            throw "buffer bound as vertex buffer was not created with BIND_VERTEX_BUFFER flag";
          }
        }
      }
      while (this.num_vertex_streams > 0 && !this.vertex_streams[this.num_vertex_streams - 1].buffer) {
        this.vertex_streams[this.num_vertex_streams--] = new VertexStreamInfo();
      }
    }
    SetIndexBuffer(indexBuffer, byteOffset) {
      this.index_buffer = indexBuffer;
      this.index_data_start_offset = byteOffset;
      const bufferDesc2 = this.index_buffer.GetDesc();
      if (!(bufferDesc2.bind_flags & BIND_FLAGS.BIND_INDEX_BUFFER)) {
        throw "buffer bound as index buffer was not created with BIND_INDEX_BUFFER flag";
      }
    }
    SetPipelineState(pipelineState) {
      this.pipelinestate = pipelineState;
    }
    SetStencilRef(stencilRef) {
      if (this.stencil_ref != stencilRef) {
        this.stencil_ref = stencilRef;
        return true;
      }
      return false;
    }
    SetBlendFactors(blendFactors) {
      let factorDiff = false;
      for (let i = 0; i < 4; i++) {
        if (blendFactors[i] != this.blend_factors[i]) {
          this.blend_factors[i] = blendFactors[i];
          factorDiff = true;
        }
      }
      return factorDiff;
    }
    SetViewports(numViewports, viewports, RTWidth, RTHeight) {
      if (RTHeight == 0 || RTWidth == 0) {
        RTWidth = this.framebuffer_width;
        RTHeight = this.framebuffer_height;
      }
      if (numViewports >= MAX_VIEWPORTS) {
        console.error("number of viewports exceed the limit");
      }
      this.num_viewports = Math.min(MAX_VIEWPORTS, numViewports);
      const defaultVP = new Viewport();
      defaultVP.width = RTWidth;
      defaultVP.height = RTHeight;
      if (this.num_viewports == 1 && !viewports.length) {
        viewports.push(defaultVP);
      }
      for (let vp = 0; vp < this.num_viewports; vp++) {
        this.viewports[vp] = viewports[vp];
        if (this.viewports[vp].width < 0 || this.viewports[vp].height < 0) {
          throw "incorrect viewport width or height";
        }
        if (this.viewports[vp].min_depth > this.viewports[vp].max_depth) {
          throw "incorrect viewport depth range";
        }
      }
    }
    SetScissorRects(numRect, rects) {
      if (numRect >= MAX_VIEWPORTS) {
        throw "number of scissor rects excced the limit";
      }
      this.num_scissor_rects = Math.min(numRect, MAX_VIEWPORTS);
      for (let i = 0; i < this.num_scissor_rects; i++) {
        this.scissor_rects[i] = rects[i];
        if (this.scissor_rects[i].left > this.scissor_rects[i].right) {
          throw "incorrect horizontal bounds for a scissor rect";
        }
        if (this.scissor_rects[i].top > this.scissor_rects[i].bottom) {
          throw "incorrect vertical bounds for a scissor rect";
        }
      }
    }
    TransitionShaderResources(pipelineState, shaderResourceBinding) {
      throw "implementation needed";
    }
    CommitShaderResources(shaderResourceBinding, flags) {
      if (!this.pipelinestate) {
        throw "no pipeline state is bound to the context";
      }
      return true;
    }
    FinishCommandList(commandList) {
      throw "implementation needed";
    }
    ExecuteCommandList(commandList) {
      throw "implementation needed";
    }
    Flush() {
      throw "implementation needed";
    }
    BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs) {
      if (this.active_render_pass) {
        throw "already in render pass";
      }
      this.active_render_pass = true;
      let bindRenderTargets = false;
      let defaultRTV = null;
      const isDefaultFramebuffer = (numRenderTargets == 0 || !renderTargets || numRenderTargets == 1 && !renderTargets[0]) && !depthStencil;
      bindRenderTargets = this.is_default_framebuffer_bound != isDefaultFramebuffer;
      this.is_default_framebuffer_bound = isDefaultFramebuffer;
      if (this.is_default_framebuffer_bound) {
        if (!this.swapchain) {
          throw "swapchain is not initialized in this device context";
        }
        numRenderTargets = 1;
        defaultRTV = this.swapchain.GetCurrentBackBufferRTV();
        renderTargets = [defaultRTV];
        depthStencil = this.swapchain.GetCurrentBackBufferDSV();
        const swapchainDesc = this.swapchain.GetDesc();
        this.framebuffer_width = swapchainDesc.width;
        this.framebuffer_height = swapchainDesc.height;
        this.framebuffer_slices = 1;
      }
      this.num_targets_to_resolve = 0;
      if (!this.render_device.GetDeviceCaps().multisample_rendertexture_supported) {
        for (let i = 0; i < this.num_bind_render_targets; i++) {
          const texture = this.bound_render_targets[i].GetTexture();
          if (texture && texture.GetDesc().misc_flag & MISC_TEXTURE_FLAGS.MISC_TEXTURE_FLAG_RESOLVE && !texture.GetResolveFlag()) {
            this.pre_render_targets_to_resolve[this.num_targets_to_resolve++] = texture.GetDefaultView(TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET);
          }
        }
      }
      if (numRenderTargets != this.num_bind_render_targets) {
        bindRenderTargets = true;
        for (let i = numRenderTargets; i < this.numRenderTargets; i++) {
          this.bound_render_targets[i] = null;
        }
        this.num_bind_render_targets = numRenderTargets;
      }
      for (let i = 0; i < numRenderTargets; i++) {
        const RTView = renderTargets[i];
        if (RTView) {
          const RTViewDesc = RTView.GetDesc();
          if (RTViewDesc.view_type != TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET) {
            throw "incorrect view type, TEXTURE_VIEW_RENDER_TARGET is required";
          }
          const texture = RTView.GetTexture();
          if (texture && texture.GetDesc().misc_flag & MISC_TEXTURE_FLAGS.MISC_TEXTURE_FLAG_RESOLVE) {
            texture.SetResolveFlag(false);
          }
          if (this.framebuffer_width == 0) {
            let desc;
            if (!texture) {
              desc = this.swapchain.GetDesc();
            } else {
              desc = texture.GetDesc();
            }
            this.framebuffer_width = Math.max(desc.width >> desc.most_detailed_mip, 1);
            this.framebuffer_height = Math.max(desc.height >> desc.most_detailed_mip, 1);
            this.framebuffer_slices = RTViewDesc.num_array_or_depth_slice;
          }
        }
        if (this.bound_render_targets[i] != RTView) {
          this.bound_render_targets[i] = RTView;
          bindRenderTargets = true;
        }
      }
      if (depthStencil) {
        const DSViewDesc = depthStencil.GetDesc();
        if (DSViewDesc.view_type != TEXTURE_VIEW_TYPE.TEXTURE_VIEW_DEPTH_STENCIL) {
          throw "incorrect view type, TEXTURE_VIEW_DEPTH_STENCIL is required";
        }
        const texture = depthStencil.GetTexture();
        if (texture) {
          if (numRenderTargets == 0 && texture.sample_count > 1) {
            console.error("depth only render target with msaa may be invalid on some andorid platform");
          }
        }
        if (this.framebuffer_width == 0) {
          const desc = texture.GetDesc();
          this.framebuffer_width = Math.max(desc.width >> desc.most_detailed_mip, 1);
          this.framebuffer_height = Math.max(desc.height >> desc.most_detailed_mip, 1);
          this.framebuffer_slices = DSViewDesc.num_array_or_depth_slice;
        }
      }
      if (this.bound_depth_stencil != depthStencil) {
        this.bound_depth_stencil = depthStencil;
        bindRenderTargets = true;
      }
      this.render_pass_attribs = renderPassAttribs;
      if (this.framebuffer_width <= 0 || this.framebuffer_height <= 0 || this.framebuffer_slices <= 0) {
        throw "framebuffer width/height/slices not valid";
      }
      return bindRenderTargets;
    }
    EndRenderPass() {
      if (!this.active_render_pass) {
        throw "not in a render pass";
      }
      this.active_render_pass = false;
    }
    Draw(drawAttribs) {
      if (drawAttribs.is_indexed) {
        switch (drawAttribs.index_type) {
          case VALUE_TYPE2.VT_UINT8:
          case VALUE_TYPE2.VT_UINT16:
          case VALUE_TYPE2.VT_UINT32:
            break;
          default:
            throw "draw index buffer type must be UNSIGN INT 8/16/32";
        }
      }
      if (!this.pipelinestate) {
        throw "no pipelinestate is bound";
      }
      if (!this.pipelinestate.GetDesc().is_compute_pipeline) {
        throw "no graphics pipelinestate is bound";
      }
    }
    InvalidateState() {
      this.ClearStateCache();
      this.is_default_framebuffer_bound = false;
    }
    ClearStateCache() {
      for (let i = 0; i < this.num_vertex_streams; i++) {
        this.vertex_streams[i] = new VertexStreamInfo();
      }
      this.num_vertex_streams = 0;
      this.pipelinestate = null;
      this.index_buffer = null;
      this.index_data_start_offset = 0;
      this.stencil_ref = 0;
      this.blend_factors = [-1, -1, -1, -1];
      for (let i = 0; i < this.num_viewports; i++) {
        this.viewports[i] = new Viewport();
      }
      this.num_viewports = 0;
      for (let i = 0; i < this.num_scissor_rects; i++) {
        this.scissor_rects = new Rect();
      }
      this.num_scissor_rects = 0;
      this.ResetRenderTargets();
    }
    ResetRenderTargets() {
      for (let i = 0; i < this.num_bind_render_targets; i++) {
        this.bound_render_targets = null;
      }
      this.num_bind_render_targets = 0;
      this.framebuffer_width = 0;
      this.framebuffer_height = 0;
      this.framebuffer_slices = 0;
      this.is_default_framebuffer_bound = false;
      this.bound_depth_stencil = null;
    }
    GraphicStateSave() {
      throw "implementation needed";
    }
    GraphicStateRestore() {
      throw "implementation needed";
    }
  };

  // src/render-backend/graphics-engine-webgl/device-context-gl.js
  function PrimitiveTopologyToGLTopology(primitiveTopology) {
    let glTopology;
    switch (primitiveTopology) {
      case PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_UNDEFINED:
        glTopology = void 0;
        break;
      case PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_TRIANGLE_LIST:
        glTopology = gl.TRIANGLES;
        break;
      case PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP:
        glTopology = gl.TRIANGLE_STRIP;
        break;
      case PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_POINT_LIST:
        glTopology = gl.POINTS;
        break;
      case PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_LINE_LIST:
        glTopology = gl.LINES;
        break;
      case PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_LINE_STRIP:
        glTopology = gl.LINE_STRIP;
        break;
      default:
        throw "unexpected primitive topology";
    }
    return glTopology;
  }
  function TypeToGLType(valueType) {
    let glType;
    switch (valueType) {
      case VALUE_TYPE2.VT_UNDEFINED:
        glType = void 0;
        break;
      case VALUE_TYPE2.VT_INT8:
        glType = gl.BYTE;
        break;
      case VALUE_TYPE2.VT_UINT8:
        glType = gl.UNSIGNED_BYTE;
        break;
      case VALUE_TYPE2.VT_INT16:
        glType = gl.SHORT;
        break;
      case VALUE_TYPE2.VT_UINT16:
        glType = gl.UNSIGNED_SHORT;
        break;
      case VALUE_TYPE2.VT_INT32:
        glType = gl.INT;
        break;
      case VALUE_TYPE2.VT_UINT32:
        glType = gl.UNSIGNED_INT;
        break;
      case VALUE_TYPE2.VT_FLOAT16:
        glType = void 0;
        break;
      case VALUE_TYPE2.VT_FLOAT32:
        glType = gl.FLOAT;
        break;
      default:
        throw "unexpected value type";
    }
    return glType;
  }
  var DeviceContextGL = class extends DeviceContext {
    constructor(renderDevice2, isDeferred) {
      super(renderDevice2, isDeferred);
      this.context_state = new GLContextState(renderDevice2);
      this.default_fbo = null;
      this.app_gl_state = new AppGLState(renderDevice2);
    }
    GetContextState() {
      return this.context_state;
    }
    SetPipelineState(pipelineState) {
      super.SetPipelineState(pipelineState);
      const desc = this.pipelinestate.GetDesc();
      if (desc.is_compute_pipeline) {
      } else {
        this.context_state.SetDepthStencilState(this.pipelinestate.GetDepthStencilState(), this.stencil_ref);
        this.context_state.SetRasterizerState(this.pipelinestate.GetRasterizerState());
        const blendStateDesc = desc.graphics_pipeline_desc.blend_state_desc;
        this.context_state.SetBlendState(blendStateDesc, desc.graphics_pipeline_desc.sample_mask);
        this.context_state.SetPrimitiveRestart(desc.graphics_pipeline_desc.enable_primitive_restart);
      }
    }
    TransitionShaderResources(pipelineState, shaderResourceBinding) {
    }
    CommitShaderResources(shaderResourceBinding, flags) {
      super.CommitShaderResources(shaderResourceBinding, flags);
      this.BindProgramResources(shaderResourceBinding);
    }
    BindProgramResources(shaderResourceBinding) {
      const program = this.pipelinestate.GetProgram();
      const nativeProg = program.GetGLProgram();
      if (!nativeProg) {
        throw "no program/program pipeline is set for the draw call";
      }
      this.context_state.SetProgram(nativeProg);
      const deviceCaps2 = this.render_device.GetDeviceCaps();
      const programPipelineSupported = deviceCaps2.separable_program_supported;
      const numPrograms = programPipelineSupported ? program.GetNumShaders() : 1;
      let textureIndex = 0;
      let uniformBuffBindPoint = 0;
      for (let i = 0; i < numPrograms; i++) {
        const shader = program.GetShader(i);
        const glProgram = programPipelineSupported ? shader.gl_program : nativeProg;
        const dynamicResources = shaderResourceBinding ? shaderResourceBinding.GetProgramResources(shader.GetDesc().shader_type, this.pipelinestate) : null;
        for (let j = 0; j < dynamicResources ? 2 : 1; j++) {
          const progResources = j ? dynamicResources : glProgram.GetConstantResource;
          const programHandle = glProgram.native_handle;
          const uniformBlocks = progResources.GetUniformBlocks();
          for (let index = 0; index < uniformBlocks.length; index++) {
            const block = uniformBlocks[index];
            for (let arrayIndex = 0; arrayIndex < block.array_size; arrayIndex++) {
              const buffer = block.resources[arrayIndex];
              if (buffer) {
                gl.bindBufferBase(gl.UNIFORM_BUFFER, uniformBuffBindPoint, buffer.GetGLBuffer());
                gl.uniformBlockBinding(programHandle, block.index + arrayIndex, uniformBuffBindPoint);
                uniformBuffBindPoint++;
              } else {
                throw `no uniform buffer is bound to ${block.name} variable in the shader`;
              }
            }
          }
          const samplers = progResources.GetSamplers();
          for (let index = 0; index < samplers.length; index++) {
            const sampler = samplers[index];
            for (let arrayIndex = 0; arrayIndex < item.array_size; arrayIndex++) {
              const texView = sampler.resources[arrayIndex];
              if (texView) {
                this.context_state.BindTexture(textureIndex, texView.GetBindTarget(), texView.GetTexture());
              } else {
                throw `no texture sampler is bound to ${sampler.name} variable in the shader`;
              }
              let samplerToUse;
              if (sampler.static_sampler) {
                samplerToUse = sampler.static_sampler;
              } else {
                samplerToUse = texView.GetSampler();
              }
              if (samplerToUse) {
                this.context_state.BindSampler(textureIndex, sampler.GetGLSampler());
              }
              gl.uniform1i(sampler.location, textureIndex);
              textureIndex++;
            }
          }
          const scaleUniforms = progResources.GetScaleUniforms();
          for (let uniform of scaleUniforms) {
            switch (uniform.data_type) {
              case UNIFORM_TYPE.FLOAT:
                gl.uniform1fv(uniform.uniform_location, new Float32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.FLOAT2:
                gl.uniform2fv(uniform.uniform_location, new Float32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.FLOAT3:
                gl.uniform3fv(uniform.uniform_location, new Float32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.FLOAT4:
                gl.uniform4fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.MAT2X2:
                gl.uniformMatrix2fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.MAT3X3:
                gl.uniformMatrix3fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.MAT4X4:
                gl.uniformMatrix4fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.MAT2X3:
                gl.uniformMatrix2x3fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.MAT2X4:
                gl.uniformMatrix2x4fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.MAT3X2:
                gl.uniformMatrix3x2fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.MAT3X4:
                gl.uniformMatrix3x4fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.MAT4X2:
                gl.uniformMatrix4x2fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.MAT4X3:
                gl.uniformMatrix4x3fv(uniform.uniform_location, false, new Float32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.INT:
                gl.uniform1iv(uniform.uniform_location, new Int32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.INT2:
                gl.uniform2iv(uniform.uniform_location, new Int32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.INT3:
                gl.uniform3iv(uniform.uniform_location, new Int32Array(uniform.scale_uniform));
                break;
              case UNIFORM_TYPE.INT4:
                gl.uniform4iv(uniform.uniform_location, new Int32Array(uniform.scale_uniform));
                break;
            }
          }
        }
      }
    }
    SetStencilRef(stencilRef) {
      if (super.SetStencilRef(stencilRef)) {
        this.context_state.SetStencilRef(gl.FRONT, stencilRef);
        this.context_state.SetStencilRef(gl.BACK, stencilRef);
      }
    }
    SetBlendFactors(factors) {
      if (super.SetBlendFactors(factors)) {
        this.context_state.SetBlendFactors(factors);
      }
    }
    SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags) {
      super.SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags);
    }
    SetIndexBuffer(indexBuffer, byteOffset) {
      super.SetIndexBuffer(indexBuffer, byteOffset);
    }
    ResolveResource(msaaTexture, resolvedTexture) {
      if (msaaTexture && resolvedTexture) {
        const desc = msaaTexture.GetDesc();
        msaaTexture.SetResolveFlag(true);
        const renderDevice2 = this.render_device;
        const currentNativeGLContext = this.render_device.gl_context.GetCurrentNativeGLContext();
        const fboCache = renderDevice2.GetFBOCache(currentNativeGLContext);
        const srcTexView = msaaTexture.GetDefaultView(TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET);
        const srcFBO = fboCache.GetFBO(1, [srcTexView], null, this.context_state);
        const dstTexView = resolvedTexture.GetDefaultView(TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET);
        const dstFBO = fboCache.GetFBO(1, [dstTexView], null, this.context_state);
        if (srcFBO && dstFBO) {
          gl.bindFramebuffer(gl.READ_FRAMEBUFFER, srcFBO);
          gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, dstFBO);
          gl.disable(gl.SCISSOR_TEST);
          gl.blitFramebuffer(0, 0, desc.width, desc.height, 0, 0, desc.width, desc.height, gl.COLOR_BUFFER_BIT, gl.NEAREST);
        }
      }
    }
    ResolveResource(msaaTexture) {
      const desc = msaaTexture.GetDesc();
      if (msaaTexture && desc.misc_flag & MISC_TEXTURE_FLAGS.MISC_TEXTURE_FLAG_RESOLVE) {
        const currentNativeGLContext = this.render_device.gl_context.GetCurrentNativeGLContext();
        const fboCache = this.render_device.GetFBOCache(currentNativeGLContext);
        const srcTexView = msaaTexture.GetDefaultView(TEXTURE_VIEW_TYPE.TEXTURE_VIEW_RENDER_TARGET);
        const srcFBO = fboCache.GetFBO(1, [srcTexView], null, this.context_state);
        const dstTexView = msaaTexture.GetDefaultView(TEXTURE_VIEW_TYPE.TEXTURE_VIEW_SHADER_RESOURCE);
        const dstFBO = fboCache.GetFBO(1, [dstTexView], null, this.context_state);
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, srcFBO);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, dstFBO);
        gl.disable(gl.SCISSOR_TEST);
        gl.blitFramebuffer(0, 0, desc.width, desc.height, 0, 0, desc.width, desc.height, gl.COLOR_BUFFER_BIT, gl.NEAREST);
      }
    }
    FinishCommandList(commandList) {
      throw "deferred context is not supported in WebGL";
    }
    ExecuteCommandList(commandList) {
      throw "deferred context is not supported in WebGL";
    }
    Flush() {
      gl.flush();
    }
    InvalidateState() {
      super.InvalidateState();
      this.context_state.Invalidate();
    }
    GraphicStateSave() {
      this.app_gl_state.Save();
      this.InvalidateState();
    }
    GraphicStateRestore() {
      this.app_gl_state.Restore();
      this.context_state.gl_prog = null;
      this.context_state.vao = null;
      this.context_state.fbo = null;
      this.context_state.render_buffer = null;
      this.context_state.bound_samplers = [];
      this.context_state.bound_textures = [];
    }
    BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs) {
      if (super.BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs)) {
        for (let i = 0; i < this.num_targets_to_resolve; i++) {
          this.ResolveResource(this.pre_render_targets_to_resolve[i].GetTexture());
          this.pre_render_targets_to_resolve[i] = null;
        }
        this.num_targets_to_resolve = 0;
        this.CommitRenderTargets();
        const caps = this.render_device.GetDeviceCaps();
        const clearFlag = this.render_pass_attribs.flags.clear;
        const discardStartFlag = this.render_pass_attribs.flags.discard_start;
        if (caps.dev_type == DEVICE_TYPE.DEVICE_TYPE_OPENGLES && caps.major_version >= 3) {
          const attachmentArray = [];
          this.GetAttachments(attachmentArray, discardStartFlag);
          if (attachmentArray.length) {
            gl.invalidateFramebuffer(gl.FRAMEBUFFER, attachmentArray);
          }
        } else {
          this.ClearWithRasterPipe(targetBuffers & ~clearFlag);
        }
        if (clearFlag) {
          this.ClearWithRasterPipe(clearFlag);
        }
      }
    }
    CommitRenderTargets() {
      if (this.is_default_framebuffer_bound) {
        const swapchain = this.swapchain;
        const defaultFBO = swapchain.GetDefaultFBO();
        if (this.default_fbo != defaultFBO) {
          this.default_fbo = defaultFBO;
        }
        this.context_state.BindFBO(this.default_fbo);
      } else {
        if (this.num_bind_render_targets == 0 && !this.bound_depth_stencil) {
          throw "at least one render target or a depth stencil is expected";
        }
        let numRenderTargets = this.num_bind_render_targets;
        if (numRenderTargets >= MAX_RENDER_TARGETS) {
          console.warn("too many render target are set");
          numRenderTargets = Math.min(numRenderTargets, MAX_RENDER_TARGETS);
        }
        const ctxCaps = this.context_state.GetContextCaps();
        if (numRenderTargets >= ctxCaps.max_draw_buffers) {
          console.warn(`this device only supports ${ctxCaps.max_draw_buffers} draw buffers`);
          numRenderTargets = Math.min(numRenderTargets, ctxCaps.max_draw_buffers);
        }
        const boundRTVs = [];
        for (let i = 0; i < numRenderTargets; i++) {
          boundRTVs[i] = this.bound_render_targets[i];
        }
        const currentNativeGLContext = this.render_device.gl_context.GetCurrentNativeGLContext();
        const fboCache = this.render_device.GetFBOCache(currentNativeGLContext);
        const fbo = fboCache.GetFBO(numRenderTargets, boundRTVs, this.bound_depth_stencil, this.context_state);
        this.context_state.BindFBO(fbo);
      }
      this.SetViewports(1, [], 0, 0);
    }
    SetViewports(numViewports, viewports, RTWidth, RTHeight) {
      super.SetViewports(numViewports, viewports, RTWidth, RTHeight);
      if (numViewports != this.num_viewports) {
        console.warn("unexpected num of viewports");
      }
      if (numViewports == 1) {
        const vp = viewports[0];
        const bottomLeftX = vp.top_left_x;
        const bottomLeftY = vp.top_left_y;
        const width = vp.width;
        const height = vp.height;
        gl.viewport(bottomLeftX, bottomLeftY, width, height);
        gl.depthRange(vp.min_depth, vp.max_depth);
      } else {
        throw "not support multople viewports";
      }
    }
    SetScissorRects(numRect, rects) {
      super.SetScissorRects(numRect, rects);
      if (this.num_scissor_rects == 1) {
        const rect = this.scissor_rects[0];
        const width = rect.right - rect.left;
        const height = rect.top - rect.bottom;
        gl.scissor(rect.left, rect.bottom, width, height);
      } else {
        console.error("not support multiple scissors");
      }
    }
    GetAttachments(attachmentArray, targetBuffers2) {
      if (targetBuffers2 & TARGET_BUFFER_FLAGS.COLOR0) {
        attachmentArray.push(this.is_default_framebuffer_bound ? gl.COLOR : gl.COLOR_ATTACHMENT0);
      }
      if (targetBuffers2 & TARGET_BUFFER_FLAGS.COLOR1) {
        attachmentArray.push(gl.COLOR_ATTACHMENT1);
      }
      if (targetBuffers2 & TARGET_BUFFER_FLAGS.COLOR2) {
        attachmentArray.push(gl.COLOR_ATTACHMENT2);
      }
      if (targetBuffers2 & TARGET_BUFFER_FLAGS.COLOR3) {
        attachmentArray.push(gl.COLOR_ATTACHMENT3);
      }
      if (targetBuffers2 & TARGET_BUFFER_FLAGS.COLOR4) {
        attachmentArray.push(gl.COLOR_ATTACHMENT4);
      }
      if (targetBuffers2 & TARGET_BUFFER_FLAGS.COLOR5) {
        attachmentArray.push(gl.COLOR_ATTACHMENT5);
      }
      if (targetBuffers2 & TARGET_BUFFER_FLAGS.COLOR6) {
        attachmentArray.push(gl.COLOR_ATTACHMENT6);
      }
      if (targetBuffers2 & TARGET_BUFFER_FLAGS.COLOR7) {
        attachmentArray.push(gl.COLOR_ATTACHMENT7);
      }
      if (targetBuffers2 & TARGET_BUFFER_FLAGS.DEPTH) {
        attachmentArray.push(this.is_default_framebuffer_bound ? gl.DEPTH : gl.DEPTH_ATTACHMENT);
      }
      if (targetBuffers2 & TARGET_BUFFER_FLAGS.STENCIL) {
        attachmentArray.push(this.is_default_framebuffer_bound ? gl.STENCIL : gl.STENCIL_ATTACHMENT);
      }
    }
    ClearWithRasterPipe(clearFlags) {
      const depthWriteEnabled = this.context_state.GetDepthWriteEnable();
      const scissorTestEnabled = this.context_state.GetScissorTestEnable();
      if (!depthWriteEnabled) {
        gl.depthMask(true);
      }
      if (scissorTestEnabled) {
        gl.disable(gl.SCISSOR_TEST);
      }
      for (let i = 0; i < MAX_RENDER_TARGETS; i++) {
        const colorAttachment = TARGET_BUFFER_FLAGS.COLOR0 << i;
        if (clearFlags & colorAttachment) {
          const colorWriteMask = this.context_state.GetColorWriteMask(i);
          this.context_state.SetColorWriteMask(i, COLOR_MASK.COLOR_MASK_ALL, colorWriteMask.is_independent);
          gl.clearBufferfv(gl.COLOR, i, this.render_pass_attribs.clear_color[i]);
          this.context_state.SetColorWriteMask(i, colorWriteMask.write_mask, colorWriteMask.is_independent);
        }
        if ((clearFlags & TARGET_BUFFER_FLAGS.DEPTH_AND_STENCIL) == TARGET_BUFFER_FLAGS.DEPTH_AND_STENCIL) {
          gl.clearBufferfi(gl.DEPTH_STENCIL, 0, this.render_pass_attribs.depth_value, this.render_pass_attribs.stencil_value);
        } else {
          if (clearFlags & TARGET_BUFFER_FLAGS.DEPTH) {
            gl.clearBufferfv(gl.DEPTH, 0, [this.render_pass_attribs.depth_value]);
          }
          if (clearFlags & TARGET_BUFFER_FLAGS.STENCIL) {
            gl.clearBufferiv(gl.STENCIL, 0, [this.render_pass_attribs.stencil_value]);
          }
        }
      }
      if (scissorTestEnabled) {
        gl.enable(gl.SCISSOR_TEST);
      }
      if (!depthWriteEnabled) {
        gl.depthMask(false);
      }
    }
    EndRenderPass() {
      const caps = this.render_device.GetDeviceCaps();
      const clearFlag = this.render_pass_attribs.flags.clear;
      const discardEndFlag = this.render_pass_attribs.flags.discard_end;
      if (caps.dev_type == DEVICE_TYPE.DEVICE_TYPE_OPENGLES && caps.major_version >= 3) {
        this.CommitRenderTargets();
        const attachmentArray = [];
        this.GetAttachments(attachmentArray, discardEndFlag);
        if (attachmentArray.length) {
          gl.invalidateFramebuffer(gl.FRAMEBUFFER, attachmentArray);
        }
      }
    }
    Draw(drawAttribs) {
      super.Draw(drawAttribs);
      const renderDevice2 = this.render_device;
      const currentNativeGLContext = renderDevice2.gl_context.GetCurrentNativeGLContext();
      const pipelineDesc = this.pipelinestate.GetDesc().graphics_pipeline_desc;
      const VAOCache = this.render_device.GetVAOCache(currentNativeGLContext);
      const indexBuffer = drawAttribs.is_indexed ? this.index_buffer : null;
      let VAO;
      if (pipelineDesc.input_layout_desc.num_elements > 0 || indexBuffer) {
        VAO = VAOCache.GetVAO(this.pipelinestate, indexBuffer, this.vertex_streams, this.num_vertex_streams, this.context_state);
      } else {
        VAO = VAOCache.GetEmptyVAO();
      }
      this.context_state.BindVAO(VAO);
      let glTopology;
      const topology = pipelineDesc.primitive_topology;
      if (topology >= PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_CONTROL_POINT_PATCHLIST) {
        throw "tessellation is not supported";
      } else {
        glTopology = PrimitiveTopologyToGLTopology(topology);
      }
      let indexType;
      let firstIndexByteOffset;
      if (drawAttribs.is_indexed) {
        indexType = TypeToGLType(drawAttribs.index_type);
        if (indexType != gl.UNSIGNED_BYTE && indexType != gl.UNSIGNED_SHORT && indexType != gl.UNSIGNED_INT) {
          throw "unsupported index type";
        }
        if (!indexBuffer) {
          throw "index buffer is not bound to the pipeline";
        }
        firstIndexByteOffset = GetValueSize(drawAttribs.index_type) * drawAttribs.start_vertex_or_index_location + this.index_data_start_offset;
      }
      if (drawAttribs.is_indirect) {
        console.error("indirect rendering is not supported");
      } else {
        if (drawAttribs.num_instances > 1) {
          if (drawAttribs.is_indexed) {
            if (drawAttribs.base_vertex) {
              console.error("not support draw elements instanced base vertex");
            } else {
              if (drawAttribs.start_instance_location) {
                console.error("not support draw elements instanced base instance");
              } else {
                gl.drawElementsInstanced(glTopology, drawAttribs.num_vertices_or_indice, indexType, firstIndexByteOffset, drawAttribs.num_instances);
              }
            }
          } else {
            if (drawAttribs.start_instance_location) {
              console.error("not support draw arrays instanced base instance");
            } else {
              gl.drawArraysInstanced(glTopology, drawAttribs.start_vertex_or_index_location, drawAttribs.num_vertices_or_indices, drawAttribs.num_instances);
            }
          }
        } else {
          if (drawAttribs.is_indexed) {
            if (drawAttribs.base_vertex) {
              console.error("not supported");
            } else {
              gl.drawElements(glTopology, drawAttribs.num_vertices_or_indice, indexType, firstIndexByteOffset);
            }
          } else {
            gl.drawArrays(glTopology, drawAttribs.start_vertex_or_index_location, drawAttribs.num_vertices_or_indices);
          }
        }
      }
      this.context_state.UnbindVAO();
    }
  };

  // src/render-backend/graphics-engine-webgl/swapchain-gl.js
  var SwapchainGL = class extends SwapChain {
    constructor(renderDevice2, deviceContext, swapchainDesc) {
      super(renderDevice2, deviceContext, swapchainDesc);
      this.swap_chain_desc.width = GetCanvas().width;
      this.swap_chain_desc.height = GetCanvas().height;
    }
    Release() {
    }
    Present(syncInterval) {
      const GLContext2 = this.render_device.gl_context;
      GLContext2.SwapBuffers(syncInterval);
    }
    Resize(newWidth, newHeight) {
      if (super.Resize(newWidth, newHeight)) {
        if (this.device_context) {
          const isDefaultFramebufferBound = this.device_context.is_default_framebuffer_bound;
          if (isDefaultFramebufferBound) {
            const renderPassAttribs = new RenderPassAttribs();
            this.device_context.BeginRenderPass(0, null, null, renderPassAttribs);
            this.device_context.EndRenderPass();
          }
        } else {
          throw "Immediate context has been released";
        }
      }
    }
    GetCurrentBackBufferRTV() {
      return null;
    }
    GetCurrentBackBufferDSV() {
      return null;
    }
    ReadPixels() {
    }
    GetDefaultFBO() {
      return null;
    }
  };

  // src/render-backend/graphics/graphics-driver.js
  var GraphicsDriver = class {
    constructor() {
      this.render_device = null;
      this.device_context = null;
      this.enterSave = false;
    }
    CreateBuffer(bufferDesc2, bufferData) {
      return this.render_device.CreateBuffer(bufferDesc2, bufferData);
    }
    CreateBufferView(buffer, viewDesc) {
      return buffer.CreateView(viewDesc);
    }
    CreatePipelineState(pipelineStateDesc) {
      return this.render_device.CreatePipelineState(pipelineStateDesc);
    }
    CreateShaderResourceBinding(pipelineState) {
      return pipelineState.CreateShaderResourceBinding();
    }
    CreateProgram(programDesc) {
      return this.render_device.CreateProgram(programDesc);
    }
    CreateSampler(samplerDesc) {
      return this.render_device.CreateSampler(samplerDesc);
    }
    CreateShader(creationAttribs) {
      return this.render_device.CreateShader(creationAttribs);
    }
    CreateTexture(textureDesc, textureData) {
      return this.render_device.CreateTexture(textureDesc, textureData);
    }
    CreateTextureView(texture, viewDesc) {
      return texture.CreateView(viewDesc);
    }
    ResolvedMSAATexture(msaaTexture, resolvedTexture) {
      if (msaaTexture && resolvedTexture) {
        const desc = msaaTexture.GetDesc();
        const outDesc = resolvedTexture.GetDesc();
        if (desc.sample_count > 1 && desc.width == outDesc.width && desc.height == outDesc.height && desc.format == outDesc.format) {
          this.render_device.GetImmediateContext().ResolveResource(msaaTexture, resolvedTexture);
        }
      }
    }
    CreateSwapChain(swapchainDesc) {
      switch (this.render_device.GetDeviceCaps().dev_type) {
        case DEVICE_TYPE.DEVICE_TYPE_OPENGLES:
          return new SwapchainGL(this.render_device, this.device_context, swapchainDesc);
        case DEVICE_TYPE.DEVICE_TYPE_WEBGPU:
        default:
          return new SwapChain(this.render_device, this.device_context, swapchainDesc);
      }
    }
    DestroyBuffer(buffer) {
      buffer.Release();
    }
    DestroyPipelineState(pipelineState) {
      pipelineState.Release();
    }
    DestroyShaderResourceBinding(shaderResourceBinding) {
      shaderResourceBinding.Release();
    }
    DestroyProgram(program) {
      program.Release();
    }
    DestroySampler(sampler) {
      sampler.Release();
    }
    DestroyShader(shader) {
      shader.Release();
    }
    DestroyTexture(texture) {
      texture.Release();
    }
    DestroySwapChain(swapchain) {
      swapchain.Release();
    }
    GetDeviceCaps() {
      return this.render_device.GetDeviceCaps();
    }
    GetTextureFormatInfo(textureFormat) {
      return this.render_device.GetTextureFormatInfo(textureFormat);
    }
    SetPipelineState(pipelineState) {
      this.device_context.SetPipelineState(pipelineState);
    }
    TransitionShaderResources(pipelineState, shaderResourceBinding) {
      this.device_context.TransitionShaderResources(pipelineState, shaderResourceBinding);
    }
    CommitShaderResources(shaderResourceBinding, flags) {
      this.device_context.CommitShaderResources(shaderResourceBinding, flags);
    }
    SetStencilRef(stencilRef) {
      this.device_context.SetStencilRef(stencilRef);
    }
    SetBlendFactors(blendFactors) {
      this.device_context.SetBlendFactors(blendFactors);
    }
    SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags) {
      this.device_context.SetVertexBuffers(startSlot, numBufferSet, buffers, offsets, flags);
    }
    SetIndexBuffer(indexBuffer, byteOffset) {
      this.device_context.SetIndexBuffer(indexBuffer, byteOffset);
    }
    SetViewports(numViewports, viewports, RTWidth, RTHeight) {
      this.device_context.SetViewports(numViewports, viewports, RTWidth, RTHeight);
    }
    SetScissorRects(numRect, rects) {
      this.device_context.SetScissorRects(numRect, rects);
    }
    InvalidateState() {
      this.device_context.InvalidateState();
    }
    BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs) {
      this.device_context.BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs);
    }
    EndRenderPass() {
      this.device_context.EndRenderPass();
    }
    Draw(drawAttribs) {
      this.device_context.Draw(drawAttribs);
    }
    FinishCommandList(commandList) {
      this.device_context.FinishCommandList(commandList);
    }
    ExecuteCommandList(commandList) {
      this.device_context.ExecuteCommandList(commandList);
    }
    Flush() {
      this.device_context.Flush();
    }
    SetSwapChain(swapchain) {
      this.device_context.SetSwapChain(swapchain);
    }
    GetBufferDesc(buffer) {
      return buffer.GetDesc();
    }
    UpdateBufferData(buffer, offset, size, data) {
      return buffer.UpdateData(this.device_context, offset, size, data);
    }
    CopyBufferData(dstBuffer, srcBuffer, srcOffset, dstOffset, size) {
      dstBuffer.CopyData(this.device_context, srcBuffer, srcOffset, dstOffset, size);
    }
    Map(buffer, mapType, mapFlags, mappedData) {
      buffer.Map(this.device_context, mapType, mapFlags, mappedData);
    }
    Unmap(buffer, mapType, mapFlags) {
      buffer.Unmap(this.device_context, mapType, mapFlags);
    }
    GetDefaultBufferView(buffer, view_type) {
      return buffer.GetDefaultView(view_type);
    }
    GetBufferViewDesc(bufferView) {
      return bufferView.GetDesc();
    }
    GetBuffer(bufferView) {
      return bufferView.GetBuffer();
    }
    GetTextureDesc(texture) {
      return texture.GetDesc();
    }
    GetDefaultTextureView(texture, viewType) {
      return texture.GetDefaultView(viewType);
    }
    UpdateTextureData(texture, mipLevel, slice, dstBox2, subResData) {
      return texture.UpdateData(this.device_context, mipLevel, slice, dstBox2, subResData);
    }
    CopyTextureData(dstTexture, srcTexture, srcMipLevel, srcSlice, srcBox, dstMipLevel, dstSlice, dstX, dstY, dstZ) {
      return dstTexture.CopyData(this.device_context, srcTexture, srcMipLevel, srcSlice, srcBox, dstMipLevel, dstSlice, dstX, dstY, dstZ);
    }
    ReadPixels(texture) {
      return texture.ReadPixels(this.device_context);
    }
    GetTextureViewDesc(textureView) {
      return textureView.GetDesc();
    }
    GetSampler(textureView) {
      return textureView.GetSampler();
    }
    SetSampler(textureView, sampler) {
      textureView.SetSampler(sampler);
    }
    GetTexture(textureView) {
      return textureView.GetTexture();
    }
    GenerateMips(textureView) {
      return textureView.GenerateMips(this.device_context);
    }
    GetPipelineStateDesc(pipelineState) {
      return pipelineState.GetDesc();
    }
    GetProgramDesc(program) {
      return program.GetDesc();
    }
    GetVSShaderReflection(program) {
      return program.GetVSShaderReflection();
    }
    GetPSShaderReflection(program) {
      return program.GetPSShaderReflection();
    }
    GetGSShaderReflection(program) {
      return program.GetGSShaderReflection();
    }
    GetHSShaderReflection(program) {
      return program.GetHSShaderReflection();
    }
    GetDSShaderReflection(program) {
      return program.GetDSShaderReflection();
    }
    GetCSShaderReflection(program) {
      return program.GetCSShaderReflection();
    }
    GetSamplerDesc(sampler) {
      return sampler.GetDesc();
    }
    GetShaderDesc(shader) {
      return shader.GetDesc();
    }
    GetPipielineState(shaderResourceBinding) {
      return shaderResourceBinding.GetPipielineState();
    }
    SetShaderVariableWithBuffer(shaderResourceBinding, shaderType, name, buffer) {
      shaderResourceBinding.GetVariable(shaderType, name).Set(buffer);
    }
    SetShaderVariableWithBufferView(shaderResourceBinding, shaderType, name, bufferView) {
      shaderResourceBinding.GetVariable(shaderType, name).Set(bufferView);
    }
    SetShaderVariableWithTextureView(shaderResourceBinding, shaderType, name, textureView) {
      shaderResourceBinding.GetVariable(shaderType, name).Set(textureView);
    }
    SetShaderVariableWithBufferArray(shaderResourceBinding, shaderType, name, buffers, firstElement, numElements) {
      shaderResourceBinding.GetVariable(shaderType, name).SetArray(buffers, firstElement, numElements);
    }
    SetShaderVariableWithBufferViewArray(shaderResourceBinding, shaderType, name, bufferviews, firstElement, numElements) {
      shaderResourceBinding.GetVariable(shaderType, name).SetArray(bufferviews, firstElement, numElements);
    }
    SetShaderVariableWithTextureViewArray(shaderResourceBinding, shaderType, name, textureviews, firstElement, numElements) {
      shaderResourceBinding.GetVariable(shaderType, name).SetArray(textureviews, firstElement, numElements);
    }
    SetShaderVariableFloatArray(shaderResourceBinding, shaderType, name, floatArray, count) {
      shaderResourceBinding.GetVariable(shaderType, name).SetFloatArray(floatArray, count);
    }
    SetShaderVariableIntArray(shaderResourceBinding, shaderType, name, intArray, count) {
      shaderResourceBinding.GetVariable(shaderType, name).SetIntArray(intArray, count);
    }
    SetShaderVariableUintArray(shaderResourceBinding, shaderType, name, uintArray, count) {
      shaderResourceBinding.GetVariable(shaderType, name).SetUintArray(uintArray, count);
    }
    GetSwapchainDesc(swapchain) {
      return swapchain.GetDesc();
    }
    Present(swapchain, syncInterval) {
      swapchain.Present(syncInterval);
    }
    Resize(swapchain, newWidth, newHeight) {
      swapchain.Resize(newWidth, newHeight);
    }
    GetCurrentBackBufferRTV(swapchain) {
      return swapchain.GetCurrentBackBufferRTV();
    }
    GetCurrentBackBufferDSV(swapchain) {
      return swapchain.GetCurrentBackBufferDSV();
    }
    ReadPixels(swapchain) {
      return swapchain.ReadPixels();
    }
    GraphicStateSave() {
      if (this.enterSave) {
        return false;
      }
      this.enterSave = true;
      this.device_context.GraphicStateSave();
      return true;
    }
    GraphicStateRestore() {
      if (!this.enterSave) {
        return false;
      }
      this.enterSave = false;
      this.device_context.GraphicStateRestore();
      return true;
    }
    CreateDefaultVertexBuffer(byteSize, data, gpuWriteable) {
      return CreateDefaultVertexBuffer(this.render_device, byteSize, data, gpuWriteable);
    }
    CreateStaticVertexBuffer(byteSize, data) {
      return CreateStaticVertexBuffer(this.render_device, byteSize, data);
    }
    CreateDynamicVertexBuffer(byteSize, data, gpuWriteable) {
      return CreateDynamicVertexBuffer(this.render_device, byteSize, data, gpuWriteable);
    }
    CreateDefaultIndexBuffer(byteSize, data, gpuWriteable) {
      return CreateDefaultIndexBuffer(this.render_device, byteSize, data, gpuWriteable);
    }
    CreateStaticIndexBuffer(byteSize, data) {
      return CreateStaticIndexBuffer(this.render_device, byteSize, data);
    }
    CreateDynamicIndexBuffer(byteSize, data, gpuWriteable) {
      return CreateDynamicIndexBuffer(this.render_device, byteSize, data, gpuWriteable);
    }
    CreateUniformBuffer(byteSize, usage, bindFlag, cpuAccessFlas) {
      const CBDesc = new BufferDesc();
      CBDesc.size = byteSize;
      CBDesc.usage = usage;
      CBDesc.bind_flags = bindFlag;
      CBDesc.cpu_access_flags = cpuAccessFlas;
      const data = new ArrayBuffer();
      return this.render_device.CreateBuffer(CBDesc, data);
    }
  };
  GraphicsDriver.InitAttribs = function(deviceCaps2, engineCreationAttribs) {
    engineCreationAttribs.custom_device_caps = deviceCaps2;
    switch (deviceCaps2.dev_type) {
      case DEVICE_TYPE.DEVICE_TYPE_OPENGLES:
        engineCreationAttribs.custom_device_caps.major_version = 3;
        engineCreationAttribs.custom_device_caps.minor_version = 0;
        break;
      case DEVICE_TYPE.DEVICE_TYPE_WEBGPU:
        break;
      default:
        throw "unknown device type";
    }
    return 0;
  };
  GraphicsDriver.Create = function(deviceCaps2, contextCreationType) {
    const driver2 = new GraphicsDriver();
    let numDeferredContexts = 0;
    const contexts = [];
    let device = null;
    let deviceContext = null;
    let swapchainDesc = new SwapChainDesc();
    swapchainDesc.color_buffer_format = TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM;
    switch (deviceCaps2.dev_type) {
      case DEVICE_TYPE.DEVICE_TYPE_OPENGLES:
        {
          const creationAttribs = new EngineGLAttribs();
          creationAttribs.device_type = deviceCaps2.dev_type;
          creationAttribs.context_creation_type = contextCreationType;
          numDeferredContexts = GraphicsDriver.InitAttribs(deviceCaps2, creationAttribs);
          if (numDeferredContexts != 0) {
            console.warn("deferred contexts are not supported in OpenGL mode");
            numDeferredContexts = 0;
          }
          device = new RenderDeviceGL(creationAttribs);
          deviceContext = new DeviceContextGL(device, false);
          device.SetImmediateContext(deviceContext);
          swapchainDesc.default_depth_value = device.GetDeviceCaps().reversedz_perspective ? 0 : 1;
          const swapchain = new SwapchainGL(device, deviceContext, swapchainDesc);
          deviceContext.SetSwapChain(swapchain);
          const renderPassAttribs = new RenderPassAttribs();
          deviceContext.BeginRenderPass(0, null, null, renderPassAttribs);
          deviceContext.EndRenderPass();
        }
        break;
      case DEVICE_TYPE.DEVICE_TYPE_WEBGPU:
        break;
      default:
        throw "unknown device type";
    }
    driver2.render_device = device;
    driver2.device_context = contexts[0];
    return driver2;
  };

  // test/render-backend/webgl/index.js
  var deviceCaps = new DeviceCaps();
  deviceCaps.dev_type = DEVICE_TYPE.DEVICE_TYPE_OPENGLES;
  var driver = GraphicsDriver.Create(deviceCaps, CONTEXT_CREATION_TYPE.CREATE);
  var psoDesc = new PipelineStateDesc(deviceCaps.reversedz_perspective);
  psoDesc.is_compute_pipeline = false;
  psoDesc.graphics_pipeline_desc.num_render_targets = 1;
  psoDesc.graphics_pipeline_desc.RTV_formats[0] = TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN;
  psoDesc.graphics_pipeline_desc.primitive_topology = PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_TRIANGLE_LIST;
  psoDesc.graphics_pipeline_desc.rasterizer_state_desc.cull_mode = CULL_MODE.CULL_MODE_NONE;
  psoDesc.graphics_pipeline_desc.input_layout_desc.num_elements = 2;
  psoDesc.graphics_pipeline_desc.input_layout_desc.layout_elements[0] = new LayoutElement(0, 0, 3, VALUE_TYPE2.VT_FLOAT32);
  psoDesc.graphics_pipeline_desc.input_layout_desc.layout_elements[1] = new LayoutElement(1, 0, 2, VALUE_TYPE2.VT_FLOAT32);
})();
