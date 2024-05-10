import { GetTextureFormatAttribs } from "../graphics-accessories/graphics-accessories";
import { EngineCreationAttribs, RenderDevice } from "../graphics-engine/render-device";
import { DEVICE_TYPE } from "../graphics/device-caps";
import { COMPONENT_TYPE, CONTEXT_CREATION_TYPE, TEXTURE_FORMAT } from "../graphics/graphics-types";
import { VAOCache } from "./VAOCache";
import { BufferGL } from "./buffer-gl";
import { gl } from "./gl";
import { GLContext } from "./gl-context";
import { PipelineStateGL } from "./pipeline-state-gl";
import { ProgramGL } from "./program-gl";
import { SamplerGL } from "./sampler-gl";
import { ShaderGL } from "./shader-gl";
import { GetNativePixelTransferAttribs, TexFormatToGLInternalTexFormat, TextureGL } from "./texture-gl";

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

        this.CheckProgramBinarySupported();
        this.FlagSupportedTexFormats();
        this.QueryDeviceCaps();

        const glVendorStr = gl.getParameter(gl.VENDOR);
        console.info('GPU Vendor:', glVendorStr);

        // map context to fbo cache
        this.FBO_cache = new Map();
        // map context to vao cache
        this.VAO_cache = new Map();

        this.InitDeviceLimits();
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

    OnReleaseTexture(texture) {
        for(let [context, fboCache] of this.FBO_cache) {
            fboCache.OnReleaseTexture(texture);
        }
    }

    GetVAOCache(context) {
        if(!this.VAO_cache[context]) {
            this.VAO_cache[context] = new VAOCache();
        }
        return this.VAO_cache[context];
    }

    OnDestroyPSO(pso) {
        for(let [context, vaoCache] of this.VAO_cache) {
            vaoCache.OnDestroyPSO(pso);
        }
    }

    OnDestroyBuffer(buffer) {
        for(let [context, vaoCache] of this.VAO_cache) {
            vaoCache.OnDestroyBuffer(buffer);
        }
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
        contextState.BindTexture(-1, glBingTarget, undefined);
        return isSuccess;
    }

    TestTextureFormat(textureFormat) {
        const formatInfo = this.texture_format_infos[textureFormat];
        if(!formatInfo.supported) {
            throw 'texture format is not supported';
        }
        const glFormat = TexFormatToGLInternalTexFormat(textureFormat);
        if(!glFormat) {
            throw 'incorrect internal GL format';
        }
        const deviceContext = this.GetImmediateContext();
        if(!deviceContext) {
            throw 'immediate device context has been destroyed';
        }
        const contextState = deviceContext.GetContextState();

        const transferAttribs = GetNativePixelTransferAttribs(textureFormat);
        // const fmtAttribs = GetTextureFormatAttribs(textureFormat);

        const testTextureDim = 32;
        const testTextureDepth = 8;

        // const test2DTextureCompressSize = ((testTextureDim + fmtAttribs.block_width-1) / fmtAttribs.block_width) *
        //                                     ((testTextureDim + fmtAttribs.block_height-1) / fmtAttribs.block_height) * fmtAttribs.component_size;
        // const test3DTextureCompressSize = ((testTextureDim + fmtAttribs.block_width-1) / fmtAttribs.block_width) *
        //                                     ((testTextureDim + fmtAttribs.block_height-1) / fmtAttribs.block_height) *
        //                                     testTextureDepth * fmtAttribs.component_size;
        formatInfo.texture2D_format = false;
        formatInfo.texture_cube_format = false;
        const testGLTexture = gl.createTexture();
        formatInfo.texture2D_format = this.CreateTestGLTexture(contextState, gl.TEXTURE_2D, testGLTexture, () => {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAX_LEVEL, 0);

            if(transferAttribs.is_compressed) {
                gl.compressedTexImage2D(gl.TEXTURE_2D, 0, glFormat, testTextureDim, testTextureDim, 0);
            } else {
                gl.texImage2D(gl.TEXTURE_2D, 0, glFormat, testTextureDim, testTextureDim, 0, transferAttribs.pixel_format, transferAttribs.data_type, null);
            }
        });

        if(formatInfo.texture2D_format) {
            const testGLCubeTexture = gl.createTexture();
            formatInfo.texture_cube_format = this.CreateTestGLTexture(contextState, gl.TEXTURE_CUBE_MAP, testGLCubeTexture, () => {
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAX_LEVEL, 0);
                for(let i=0; i<6; i++) {
                    if(transferAttribs.is_compressed) {
                        gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X+i, 0, glFormat, testTextureDim, testTextureDim, 0);
                    } else {
                        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X+i, 0, glFormat, testTextureDim, testTextureDim, 0, transferAttribs.pixel_format, transferAttribs.data_type, null);
                    }
                }
            });
            gl.deleteTexture(testGLCubeTexture);

            const shouldTestDepthAttachment = 
                formatInfo.component_type == COMPONENT_TYPE.COMPONENT_TYPE_DEPTH ||
                formatInfo.component_type == COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL;
            const shouldTestColorAttachment = !shouldTestDepthAttachment && formatInfo.component_type != COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED;

            let newFBO;
            let currentFramebuffer;

            if(shouldTestDepthAttachment || shouldTestColorAttachment) {
                currentFramebuffer = gl.getParameter(gl.DRAW_FRAMEBUFFER_BINDING);
                newFBO = gl.createFramebuffer();
                gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, newFBO);
            }

            if(shouldTestDepthAttachment) {
                const attachmentPoint = formatInfo.component_type == COMPONENT_TYPE.COMPONENT_TYPE_DEPTH ? gl.DEPTH_ATTACHMENT : gl.DEPTH_STENCIL_ATTACHMENT;
                gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, testGLTexture, 0);
                if(gl.getError() == gl.NO_ERROR) {
                    // create dummy texture2D since some older version 
                    // do not allow depth only attachment
                    const colorTexture = gl.createTexture();
                    const success = this.CreateTestGLTexture(contextState, gl.TEXTURE_2D, colorTexture, () => {
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAX_LEVEL, 0);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, testTextureDim, testTextureDim, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
                    });

                    if(!success) {
                        throw 'failed to create dummy render target texture';
                    }
                    gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTexture, 0);
                    gl.drawBuffers([gl.COLOR_ATTACHMENT0]);

                    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
                    formatInfo.depth_renderable = (gl.getError() == gl.NO_ERROR) && status == gl.FRAMEBUFFER_COMPLETE;

                    gl.deleteTexture(colorTexture);
                }
            } else if(shouldTestColorAttachment) {
                gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, testGLTexture, 0);
                if(gl.getError() == gl.NO_ERROR) {
                    gl.drawBuffers([gl.COLOR_ATTACHMENT0]);

                    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
                    formatInfo.color_renderable = (gl.getError() == gl.NO_ERROR) && status == gl.FRAMEBUFFER_COMPLETE;
                }
            }

            if(shouldTestDepthAttachment || shouldTestColorAttachment) {
                gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, currentFramebuffer);
            }
        }

        formatInfo.support_multisample = false;
        if(formatInfo.component_type != COMPONENT_TYPE.COMPONENT_TYPE_COMPRESSED &&
            this.device_caps.texture_caps.texture2D_multisample_suppored) 
        {
            console.error('multiple-sample texture not supported');
        }

        // test testure 3d
        formatInfo.texture3D_format = false;
        if(!(formatInfo.component_type == COMPONENT_TYPE.COMPONENT_TYPE_DEPTH ||
            formatInfo.component_type == COMPONENT_TYPE.COMPONENT_TYPE_DEPTH_STENCIL))
        {
            const testGLTexture = gl.createTexture();
            formatInfo.texture3D_format = this.CreateTestGLTexture(contextState, gl.TEXTURE_3D, testGLTexture, () => {
                gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAX_LEVEL, 0);
                if(transferAttribs.is_compressed) {
                    gl.compressedTexImage3D(gl.TEXTURE_3D, 0, glFormat, testTextureDim, testTextureDim, testTextureDepth, 0);
                } else {
                    gl.texImage3D(gl.TEXTURE_3D, 0, glFormat, testTextureDim, testTextureDim, testTextureDepth, 0, transferAttribs.pixel_format, transferAttribs.data_type, null);
                }
            });
            gl.deleteTexture(testGLTexture);
        }

        gl.deleteTexture(testGLTexture);
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
        const isGL430OrAbove = this.device_caps.dev_type==DEVICE_TYPE.DEVICE_TYPE_OPENGLES &&
                                (this.device_caps.major_version>4 || (this.device_caps.major_version==4 && this.device_caps.minor_version>=3));
        this.device_caps.compute_shader_supported = isGL430OrAbove || this.CheckExtension('ARB_compute_shader');
        this.device_caps.geometry_shader_supported = isGL430OrAbove || this.CheckExtension('ARB_geometry_shader');
        this.device_caps.tessellation_supported = isGL430OrAbove || this.CheckExtension('ARB_tessellation_shader');

        this.device_caps.texture_caps.texture2D_copy_supported = isGL430OrAbove || this.CheckExtension('ARB_copy_image');
        this.device_caps.texture_caps.texture2D_load_store_supported = isGL430OrAbove || this.CheckExtension('ARB_shader_image_load_store');
        this.device_caps.texture_caps.textureview_supported = isGL430OrAbove || this.CheckExtension('ARB_texture_view');

        this.device_caps.independent_blend_supported = this.device_caps.dev_type==DEVICE_TYPE.DEVICE_TYPE_OPENGLES &&
                                                        (this.device_caps.major_version>3 || (this.device_caps.major_version==3 && this.device_caps.minor_version>=2));
    }
}

export {
    EngineGLAttribs,
    RenderDeviceGL,
}
