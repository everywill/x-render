import { GetTextureFormatAttribs } from "../graphics-accessories/graphics-accessories";
import { TEXTURE_FORMAT, TextureFormatInfo } from "../graphics/graphics-types";

class RenderDevice {
    constructor(customDeviceCaps, numDeferredContexts) {
        this.device_caps = customDeviceCaps;
        this.texture_format_infos = [];
        this.texture_format_init_flags = [];
        const filterable_formats = new Set();
        
        filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RGBA32_FLOAT);  // OpenGL 3.1 not require
        filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_FLOAT);
        filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_UNORM);
        filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RGBA16_SNORM);
        filterable_formats.add(TEXTURE_FORMAT.TEX_FORMAT_RG32_FLOAT);   // OpenGL 3.1 not require
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

        for(let key in TEXTURE_FORMAT) {
            if(TEXTURE_FORMAT[key]>TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN && TEXTURE_FORMAT[key]<TEXTURE_FORMAT.TEX_FORMAT_NUM_FORMATS) {
                const textureFormatInfo = new TextureFormatInfo(GetTextureFormatAttribs(TEXTURE_FORMAT[key]));
                if(filterable_formats.has(key)) {
                    textureFormatInfo.filterable = true;
                }
                this.texture_format_infos[TEXTURE_FORMAT[key]] = textureFormatInfo;
                this.texture_format_init_flags[TEXTURE_FORMAT[key]] = false;
            }
        }

        this.immediate_context = null;
    }

    GetDeviceCaps() { return this.device_caps; }

    GetTextureFormatInfo(textureFormat) {
        if(textureFormat<=TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN || textureFormat>=TEXTURE_FORMAT.TEX_FORMAT_NUM_FORMATS) {
            throw 'texture format out of range';
        }
        const textureFormatInfo = this.texture_format_infos[textureFormat];
        if(textureFormat.format != textureFormat) {
            throw 'texture format check fail'
        }
        if(!this.texture_format_init_flags[textureFormat]) {
            if(textureFormatInfo.supported) {
                this.TestTextureFormat(textureFormat);
                this.texture_format_init_flags[textureFormat] = true;
            }
        }
        return textureFormatInfo;
    }

    TestTextureFormat(textureFormat) { throw 'implementation needed'; }

    SetImmediateContext(context) {
        if(this.immediate_context) {
            throw 'immediate context has already been set';
        }
        this.immediate_context = context;
    }

    GetImmediateContext() { return this.immediate_context; }

    InitDeviceLimits() { throw 'implementation needed'; }

    // to allocate space only, provide null bufferData 
    // static buffers (USAGE_STATIC) must be initialized at creation time.                  
    CreateBuffer(bufferDesc, bufferData) { throw 'implementation needed'; }

    CreateShader(creationAttribs) { throw 'implementation needed'; }

    CreateProgram(programDesc) { throw 'implementation needed'; }

    // to allocate space only, provide null data
    // static textures(USAGE_STATIC) must be initialized at creation time
    CreateTexture(textureDesc, textureData) { throw 'implementation needed'; }

    CreateSampler(samplerDesc) { throw 'implementation needed'; }

    CreatePipelineState(pipelineStateDesc) { throw 'implementation needed'; }
}

export  {
    RenderDevice
}