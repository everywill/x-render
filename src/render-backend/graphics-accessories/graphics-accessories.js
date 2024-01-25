import { TEXTURE_FORMAT, COMPONENT_TYPE, TextureFormatAttribs, VALUE_TYPE } from '../graphics/graphics-types'

function ComputeMipLevelsCount(width, height = 0, depth = 0) {
    width = Math.max(width, height, depth);
    if(width == 0) {
        return 0;
    }
    let mipLevels = 0;
    while((width >> mipLevels) > 0) {
        mipLevels ++;
    }
    return mipLevels;
}

const FmtAttribs = new Map();
let isInit = false;

function GetTextureFormatAttribs(format) {
    if(!isInit) {
        isInit = true;
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA32_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA32_TYPELESS', 4, 4, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA32_FLOAT, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA32_FLOAT', 4, 4, COMPONENT_TYPE.COMPONENT_TYPE_FLOAT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA32_UINT, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA32_UINT', 4, 4, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA32_SINT, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA32_SINT', 4, 4, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1));
        
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGB32_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_RGB32_TYPELESS', 4, 3, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGB32_FLOAT, 
            new TextureFormatAttribs('TEX_FORMAT_RGB32_FLOAT', 4, 3, COMPONENT_TYPE.COMPONENT_TYPE_FLOAT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGB32_UINT, 
            new TextureFormatAttribs('TEX_FORMAT_RGB32_UINT', 4, 3, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGB32_SINT, 
            new TextureFormatAttribs('TEX_FORMAT_RGB32_SINT', 4, 3, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1));

        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA16_TYPELESS', 2, 4, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_FLOAT, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA16_FLOAT', 2, 4, COMPONENT_TYPE.COMPONENT_TYPE_FLOAT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UNORM, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA16_UNORM', 2, 4, COMPONENT_TYPE.COMPONENT_TYPE_UNORM, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UINT, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA16_UINT', 2, 4, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SNORM, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA16_SNORM', 2, 4, COMPONENT_TYPE.COMPONENT_TYPE_SNORM, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SINT, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA16_SINT', 2, 4, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1));

        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG32_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_RG32_TYPELESS', 4, 2, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG32_FLOAT, 
            new TextureFormatAttribs('TEX_FORMAT_RG32_FLOAT', 4, 2, COMPONENT_TYPE.COMPONENT_TYPE_FLOAT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG32_UINT, 
            new TextureFormatAttribs('TEX_FORMAT_RG32_UINT', 4, 2, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG32_SINT, 
            new TextureFormatAttribs('TEX_FORMAT_RG32_SINT', 4, 2, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1));

        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R32G8X24_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_R32G8X24_TYPELESS', 4, 2, COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL, true, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT_S8X24_UINT, 
            new TextureFormatAttribs('TEX_FORMAT_D32_FLOAT_S8X24_UINT', 4, 2, COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT_X8X24_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_R32_FLOAT_X8X24_TYPELESS', 4, 2, COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL, false, 1, 1));

        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_RGB10A2_TYPELESS', 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPOUND, true, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_UNORM, 
            new TextureFormatAttribs('TEX_FORMAT_RGB10A2_UNORM', 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPOUND, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGB10A2_UINT, 
            new TextureFormatAttribs('TEX_FORMAT_RGB10A2_UINT', 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPOUND, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R11G11B10_FLOAT, 
            new TextureFormatAttribs('TEX_FORMAT_R11G11B10_FLOAT', 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPOUND, false, 1, 1));

        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA8_TYPELESS', 1, 4, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA8_UNORM', 1, 4, COMPONENT_TYPE.COMPONENT_TYPE_UNORM, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UNORM_SRGB, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA8_UNORM_SRGB', 1, 4, COMPONENT_TYPE.COMPONENT_TYPE_UNORM_SRGB, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_UINT, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA8_UINT', 1, 4, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SNORM, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA8_SNORM', 1, 4, COMPONENT_TYPE.COMPONENT_TYPE_SNORM, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGBA8_SINT, 
            new TextureFormatAttribs('TEX_FORMAT_RGBA8_SINT', 1, 4, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1));

        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG16_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_RG16_TYPELESS', 2, 2, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG16_FLOAT, 
            new TextureFormatAttribs('TEX_FORMAT_RG16_FLOAT', 2, 2, COMPONENT_TYPE.COMPONENT_TYPE_FLOAT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG16_UNORM, 
            new TextureFormatAttribs('TEX_FORMAT_RG16_UNORM', 2, 2, COMPONENT_TYPE.COMPONENT_TYPE_UNORM, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG16_UINT, 
            new TextureFormatAttribs('TEX_FORMAT_RG16_UINT', 2, 2, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG16_SNORM, 
            new TextureFormatAttribs('TEX_FORMAT_RG16_SNORM', 2, 2, COMPONENT_TYPE.COMPONENT_TYPE_SNORM, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG16_SINT, 
            new TextureFormatAttribs('TEX_FORMAT_RG16_SINT', 2, 2, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1));

        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R32_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_R32_TYPELESS', 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_D32_FLOAT, 
            new TextureFormatAttribs('TEX_FORMAT_D32_FLOAT', 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_DEPTH, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R32_FLOAT, 
            new TextureFormatAttribs('TEX_FORMAT_R32_FLOAT', 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_FLOAT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R32_UINT, 
            new TextureFormatAttribs('TEX_FORMAT_R32_UINT', 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R32_SINT, 
            new TextureFormatAttribs('TEX_FORMAT_R32_SINT', 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1));

        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R24G8_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_R24G8_TYPELESS', 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL, true, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_D24_UNORM_S8_UINT, 
            new TextureFormatAttribs('TEX_FORMAT_RGB10A2_UNORM', 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R24_UNORM_X8_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_R24_UNORM_X8_TYPELESS', 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL, false, 1, 1));
            
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG8_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_RG8_TYPELESS', 1, 2, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG8_UNORM, 
            new TextureFormatAttribs('TEX_FORMAT_RG8_UNORM', 1, 2, COMPONENT_TYPE.COMPONENT_TYPE_UNORM, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG8_UINT, 
            new TextureFormatAttribs('TEX_FORMAT_RG8_UINT', 1, 2, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG8_SNORM, 
            new TextureFormatAttribs('TEX_FORMAT_RG8_SNORM', 1, 2, COMPONENT_TYPE.COMPONENT_TYPE_SNORM, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RG8_SINT, 
            new TextureFormatAttribs('TEX_FORMAT_RG8_SINT', 1, 2, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1));
        
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R16_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_R16_TYPELESS', 2, 1, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R16_FLOAT, 
            new TextureFormatAttribs('TEX_FORMAT_R16_FLOAT', 2, 1, COMPONENT_TYPE.COMPONENT_TYPE_FLOAT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_D16_UNORM, 
            new TextureFormatAttribs('TEX_FORMAT_D16_UNORM', 2, 1, COMPONENT_TYPE.COMPONENT_TYPE_UNORM, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R16_UNORM, 
            new TextureFormatAttribs('TEX_FORMAT_R16_UNORM', 2, 1, COMPONENT_TYPE.COMPONENT_TYPE_UNORM, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R16_UINT, 
            new TextureFormatAttribs('TEX_FORMAT_R16_UINT', 2, 1, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R16_SNORM, 
            new TextureFormatAttribs('TEX_FORMAT_R16_SNORM', 2, 1, COMPONENT_TYPE.COMPONENT_TYPE_SNORM, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R16_SINT, 
            new TextureFormatAttribs('TEX_FORMAT_R16_SINT', 2, 1, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1));

        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R8_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_R8_TYPELESS', 1, 1, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R8_UNORM, 
            new TextureFormatAttribs('TEX_FORMAT_R8_UNORM', 1, 1, COMPONENT_TYPE.COMPONENT_TYPE_UNORM, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R8_UINT, 
            new TextureFormatAttribs('TEX_FORMAT_R8_UINT', 1, 1, COMPONENT_TYPE.COMPONENT_TYPE_UINT, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R8_SNORM, 
            new TextureFormatAttribs('TEX_FORMAT_R8_SNORM', 1, 1, COMPONENT_TYPE.COMPONENT_TYPE_SNORM, false, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R8_SINT, 
            new TextureFormatAttribs('TEX_FORMAT_R8_SINT', 1, 1, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1));
        // FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_A8_Uno, 
        //     new TextureFormatAttribs('TEX_FORMAT_RG16_SINT', 2, 2, COMPONENT_TYPE.COMPONENT_TYPE_SINT, false, 1, 1));

        // FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_R1_, 
        //     new TextureFormatAttribs('TEX_FORMAT_R8_TYPELESS', 1, 1, COMPONENT_TYPE.COMPONENT_TYPE_UNDEFINED, true, 1, 1));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_RGB9E5_SHAREDEXP, 
            new TextureFormatAttribs('TEX_FORMAT_RGB9E5_SHAREDEXP', 4, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPOUND, false, 1, 1));
        
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC1_TYPELESS, 
            new TextureFormatAttribs('TEX_FORMAT_BC1_TYPELESS', 8, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, true, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM,
            new TextureFormatAttribs('TEX_FORMAT_BC1_UNORM', 8, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC1_UNORM_SRGB, 
            new TextureFormatAttribs('TEX_FORMAT_BC1_UNORM_SRGB', 8, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC2_TYPELESS,
            new TextureFormatAttribs('TEX_FORMAT_BC2_TYPELESS', 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, true, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM,
            new TextureFormatAttribs('TEX_FORMAT_BC2_UNORM', 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC2_UNORM_SRGB, 
            new TextureFormatAttribs('TEX_FORMAT_BC2_UNORM_SRGB', 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC3_TYPELESS,
            new TextureFormatAttribs('TEX_FORMAT_BC3_TYPELESS', 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, true, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM,
            new TextureFormatAttribs('TEX_FORMAT_BC3_UNORM', 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC3_UNORM_SRGB, 
            new TextureFormatAttribs('TEX_FORMAT_BC3_UNORM_SRGB', 16, 4, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC4_TYPELESS,
            new TextureFormatAttribs('TEX_FORMAT_BC4_TYPELESS', 8, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, true, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC4_UNORM,
            new TextureFormatAttribs('TEX_FORMAT_BC4_UNORM', 8, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC4_SNORM, 
            new TextureFormatAttribs('TEX_FORMAT_BC4_SNORM', 8, 1, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC5_TYPELESS,
            new TextureFormatAttribs('TEX_FORMAT_BC5_TYPELESS', 16, 2, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, true, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC5_UNORM,
            new TextureFormatAttribs('TEX_FORMAT_BC5_UNORM', 16, 2, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC5_SNORM, 
            new TextureFormatAttribs('TEX_FORMAT_BC5_SNORM', 16, 2, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4));

        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC6H_TYPELESS,
            new TextureFormatAttribs('TEX_FORMAT_BC6H_TYPELESS', 16, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, true, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC6H_UF16,
            new TextureFormatAttribs('TEX_FORMAT_BC6H_UF16', 16, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC6H_SF16, 
            new TextureFormatAttribs('TEX_FORMAT_BC6H_SF16', 16, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4));

        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC7_TYPELESS,
            new TextureFormatAttribs('TEX_FORMAT_BC7_TYPELESS', 16, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, true, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC7_UNORM,
            new TextureFormatAttribs('TEX_FORMAT_BC7_UNORM', 16, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4));
        FmtAttribs.set(TEXTURE_FORMAT.TEX_FORMAT_BC7_UNORM_SRGB, 
            new TextureFormatAttribs('TEX_FORMAT_BC7_UNORM_SRGB', 16, 3, COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED, false, 4, 4));
    }
    if(format >= TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN && format < TEXTURE_FORMAT.TEX_FORMAT_NUM_FORMATS) {
        return FmtAttribs[format];
    } else {
        return new TextureFormatAttribs();
    }
}

function GetValueSize(inputElementType) {
    switch(inputElementType) {
        case VALUE_TYPE.VT_UINT8:
            return 1;
        case VALUE_TYPE.VT_INT8:
            return 1;
        case VALUE_TYPE.VT_UINT16:
            return 2;
        case VALUE_TYPE.VT_INT16:
            return 2;
        case VALUE_TYPE.VT_UINT32:
            return 4;
        case VALUE_TYPE.VT_INT32:
            return 4;
        case VALUE_TYPE.VT_FLOAT16:
            return 2;
        case VALUE_TYPE.VT_FLOAT32:
            return 4;
    }
}

export {
    ComputeMipLevelsCount,
    GetTextureFormatAttribs,
    GetValueSize,
}
