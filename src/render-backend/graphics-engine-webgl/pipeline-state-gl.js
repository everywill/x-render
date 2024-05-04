import { PipelineState } from "../graphics-engine/pipelinestate";
import { DEVICE_TYPE } from "../graphics/device-caps";
import { GLContextState } from "./gl-context-state";
import { ShaderResourceBindingGL } from "./shader-resource-binding-gl";

class PipelineStateGL extends PipelineState {
    constructor(renderDevice, pipelineStateDesc) {
        super(renderDevice, pipelineStateDesc);

        const deviceCaps = this.render_device.GetDeviceCaps();
        if(deviceCaps.dev_type == DEVICE_TYPE.DEVICE_TYPE_UNDEFINED) {
            throw 'device caps are not initialized';
        }
        this.LinkGLProgram(deviceCaps.separable_program_supported);

        this.ds_state = GLContextState.GetDepthStencilState(pipelineStateDesc.graphics_pipeline_desc.depth_stencil_state_desc);
        this.ra_state = GLContextState.GetRasterizerState(pipelineStateDesc.graphics_pipeline_desc.rasterizer_state_desc);
    }

    GetDepthStencilState() { return this.ds_state; }
    GetRasterizerState() { return this.ra_state; }

    Release() {
        this.render_device.OnDestroyPSO(this);
    }

    LinkGLProgram(isProgramPipelineSupported) {
        if(isProgramPipelineSupported) {
            console.error('program pipeline not supported in WebGL')
        } else {
            // link really happens in CreateShaderResourceBinding
        }
    }

    CreateShaderResourceBinding() {
        return new ShaderResourceBindingGL(this);
    }
}

export {
    PipelineStateGL,
}
