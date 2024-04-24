import { EngineCreationAttribs, RenderDevice } from "../graphics-engine/render-device";
import { DEVICE_TYPE } from "../graphics/device-caps";
import { CONTEXT_CREATION_TYPE, TEXTURE_FORMAT } from "../graphics/graphics-types";
import { BufferGL } from "./buffer-gl";
import { gl } from "./gl";
import { GLContext } from "./gl-context";
import { PipelineStateGL } from "./pipeline-state-gl";
import { ProgramGL } from "./program-gl";
import { SamplerGL } from "./sampler-gl";
import { ShaderGL } from "./shader-gl";

class EngineGLAttribs extends EngineCreationAttribs {
    constructor() {
        super();
        this.device_type = DEVICE_TYPE.DEVICE_TYPE_OPENGLES;
        this.context_creation_type = CONTEXT_CREATION_TYPE.ATTACH;
    }
}

class RenderDeviceGL extends RenderDevice {
    constructor(engineAttribs) {
        super(engineAttribs.custom_device_caps, 0);
        this.gl_context = new GLContext(engineAttribs, this.device_caps);
        this.device_caps.separable_program_supported = false;
        // each extension is duplicated
        // first in unprefixed WebGL form, and then a second time with "GL_" prefix
        this.extension_strings = gl.getSupportedExtensions(); 

        this.FBO_cache = new Map();
        this.VAO_cache = new Map();
    }

    InitDeviceLimits() {
        // msaa samples
        this.device_caps.limit_caps.max_msaa_sample_count = gl.getParameter(gl.MAX_SAMPLES);
        
        // width/height
        let size = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        this.device_caps.limit_caps.max_texture_size_1D = size;
        this.device_caps.limit_caps.max_texture_size_2D = size;

        this.device_caps.limit_caps.max_texture_size_3D = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);
        this.device_caps.limit_caps.max_texture_size_cube = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);

        // depth/slices
        this.device_caps.limit_caps.max_texture_array_layers = gl.getParameter(gl.MAX_ARRAY_TEXTURE_LAYERS);
    }

    GetFBOCache(context) {
        return this.FBO_cache[context];
    }

    GetVAOCache(context) {
        return this.VAO_cache[context];
    }

    CreateBuffer(bufferDesc, bufferData) {
        const buffer = new BufferGL(this, bufferDesc, bufferData);
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
        if(!deviceContext) {
            throw 'immediate device context has been destroyed';
        }
        const fmtInfo = 
    }

    CreateSampler(samplerDesc) {
        return new SamplerGL(this, samplerDesc);
    }

    CreatePipelineState(pipelineStateDesc) {
        return new PipelineStateGL(this, pipelineStateDesc);
    }

    TestTextureFormat(textureFormat) {
        
    }

    CheckProgramBinarySupported() {
        this.device_caps.shader_binary_supported = false;
    }

    CheckExtension(extensionString) {
        for(let i=0; i<this.extension_strings.length; i++) {
            if(this.extension_strings[i].indexOf(extensionString) != -1) {
                return true;
            }
        }
        return false;
    }

    FlagSupportedTexFormats() {
        const deviceCaps = this.device_caps;
        const isGL330OrAbove = deviceCaps.dev_type==DEVICE_TYPE.DEVICE_TYPE_OPENGLES &&
                                (deviceCaps.major_version>=4 || (deviceCaps.major_version==3 && deviceCaps.minor_version>=3));
        if(deviceCaps.dev_type == DEVICE_TYPE.DEVICE_TYPE_OPENGLES) {
            deviceCaps.multisample_rendertexture_supported = this.CheckExtension('EXT_multisampled_render_to_texture');
        } else {
            deviceCaps.multisample_rendertexture_supported = false;
        }

        const supportRGTC = this.CheckExtension('EXT_texture_compression_rgtc');
        const supportBPTC = this.CheckExtension('EXT_texture_compression_bptc');
        const supportS3TC = this.CheckExtension('WEBGL_compressed_texture_s3tc');
        const supportASTC = this.CheckExtension('WEBGL_compressed_texture_astc');
        const supportETC2 = this.CheckExtension('WEBGL_compressed_texture_etc');

        const supportTexNorm16 = this.CheckExtension('EXT_texture_norm16');
        const supportReversedZ = (deviceCaps.major_version==4 && deviceCaps.minor_version>=5) || this.CheckExtension('EXT_clip_control');
        deviceCaps.reversedz_perspective &= supportReversedZ;

        if(deviceCaps.reversedz_perspective) {
            const extClipControl = gl.getExtension('EXT_clip_control');
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
    }
}

export {
    EngineGLAttribs,
    EngineGLAttribs,
    RenderDeviceGL,
}
