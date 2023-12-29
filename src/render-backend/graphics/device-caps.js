const MAX_BUFFER_SLOTS = 32;
const MAX_RENDER_TARGETS = 8;
const MAX_VIEWPORTS = 16;
const MAX_SHADERS_IN_PIPELINE = 5;

const DEVICE_TYPE = {
    DEVICE_TYPE_UNDEFINED: 0,
    DEVICE_TYPE_OPENGLES: 1,
    DEVICE_TYPE_WEBGPU: 2,
}

class SamplerCaps {
    constructor() {
        this.border_sampling_mode_supported = true;
        this.anisotropic_filtering_supported = true;
        this.lod_bias_supported = true;
    }
}

class TextureCaps {
    constructor() {
        this.texture1D_supported = true;
        this.texture1D_array_supported = true;
        this.texture2D_multisample_suppored = true;
        this.texture2D_multisample_array_suppored = true;
        // copy operation between textures is supported or not
        this.texture2D_copy_supported = false;
        // load and store operations in shader are supported or not
        this.texture2D_load_store_supported = false;
        this.textureview_supported = true;
        // query parameter operation at specific mipmap level is supported or not
        this.texture_level_parameter_supported = false;
        this.cubemap_array_supported = false;
    }
}

class ResourceLimitCaps {
    constructor() {
        // texture1D U dimension
        this.max_texture_size_1D = 0;
        // texture2D U/V dimension
        this.max_texture_size_2D = 0;
        // texture3D U/V/W dimension
        this.max_texture_size_3D = 0;
        this.max_texture_size_cube = 0;
        // texture2D array dimension
        this.max_texture_array_layers = 0;
        this.max_msaa_sample_count = 0;
    }
}

class DeviceCaps {
    constructor() {
        this.dev_type = DEVICE_TYPE.DEVICE_TYPE_UNDEFINED;
        // for instance, for OpenGL 3.1 this value would be 3
        this.major_version = 0;
        // for instance, for OpenGL 3.1 this value would be 1
        this.minor_version = 0;
        // device supports separable program or not
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
        return this.dev_type ==DEVICE_TYPE.DEVICE_TYPE_OPENGLES;
    }
}

export {
    MAX_BUFFER_SLOTS,
    MAX_RENDER_TARGETS,
    MAX_VIEWPORTS,
    MAX_SHADERS_IN_PIPELINE,
    DeviceCaps
}