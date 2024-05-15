import { Shader } from "../graphics-engine/shader";

class ShaderGPU extends Shader {
    constructor(renderDevice, shaderCreationAttribs) {
        super(renderDevice, shaderCreationAttribs.shader_desc);
        this.SetupShader(shaderCreationAttribs);
    }

    GetNativeHandle() { return this.gpu_shader_module; }

    Release() {
        this.gpu_shader_module = null;
    }

    SetupShader(shaderCreationAttribs) {
        const { source, entry, shader_desc } = shaderCreationAttribs;
        const { variable_desc, static_sampler_desc } = shader_desc;
        const gpuDevice = this.render_device.GetWebGPUDevice();
        this.gpu_shader_module = gpuDevice.createShaderModule({
            code: source,
            // different implementations may be handle this in different ways
            // providing hints does not guarantee improved shader compilation performance on all browsers/systems.
            compilationHints: [{
                entryPoint: entry,
                // layout: GPUPipelineLayout | 'auto'
            }],
        });
    }
}

export {
    ShaderGPU,
}
