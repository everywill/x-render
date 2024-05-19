import { Program } from "../graphics-engine/program";
import { SHADER_TYPE } from "../graphics/shader-desc";

const SHAER_TYPE_TO_GPU_STAGE = []
SHAER_TYPE_TO_GPU_STAGE[SHADER_TYPE.SHADER_TYPE_COMPUTE] = GPUShaderStage.COMPUTE;
SHAER_TYPE_TO_GPU_STAGE[SHADER_TYPE.SHADER_TYPE_VERTEX] = GPUShaderStage.VERTEX;
SHAER_TYPE_TO_GPU_STAGE[SHADER_TYPE.SHADER_TYPE_PIXEL] = GPUShaderStage.FRAGMENT;

class ProgramGPU extends Program {
    constructor(renderDevice, programDesc) {
        super(renderDevice, programDesc);
        
        this.bind_group_layouts = [];

        this.SetupBindGroupLayouts();
    }

    Release() { }

    GetBindGroupLayouts() { return this.bind_group_layouts; }

    GetVSShaderReflection() {
        if(this.p_vs) {
            return this.p_vs.GetShaderReflection();
        }
    }

    GetPSShaderReflection() {
        if(this.p_ps) {
            return this.p_ps.GetShaderReflection();
        }
    }

    GetGSShaderReflection() {
        if(this.p_gs) {
            return this.p_gs.GetShaderReflection();
        }
    }

    GetHSShaderReflection() {
        if(this.p_hs) {
            return this.p_hs.GetShaderReflection();
        }
    }

    GetDSShaderReflection() {
        if(this.p_ds) {
            return this.p_ds.GetShaderReflection();
        }
    }

    GetCSShaderReflection() {
        if(this.p_cs) {
            return this.p_cs.GetShaderReflection();
        }
    }

    SetupBindGroupLayouts() {
        const device = this.render_device.GetWebGPUDevice();
        const layoutsInfo = [];

        for(let shader of this.shaders) {
            const resources = shader.GetAllResources();

            for(let buffer of resources.buffer_blocks) {
                if(!layoutsInfo[buffer.group]) {
                    layoutsInfo[buffer.group] = [];
                }
                layoutsInfo[buffer.group].push({
                    binding: buffer.binding,
                    visibility: SHAER_TYPE_TO_GPU_STAGE[shader.GetDesc().shader_type],
                    buffer: {},
                });
            }

            for(let sampler of resources.samplers) {
                if(!layoutsInfo[sampler.group]) {
                    layoutsInfo[sampler.group] = [];
                }
                layoutsInfo[sampler.group].push({
                    binding: sampler.binding,
                    visibility: SHAER_TYPE_TO_GPU_STAGE[shader.GetDesc().shader_type],
                    sampler: {},
                });
            }

            for(let storage of resources.storage_textures) {
                if(!layoutsInfo[storage.group]) {
                    layoutsInfo[storage.group] = [];
                }
                layoutsInfo[storage.group].push({
                    binding: storage.binding,
                    visibility: SHAER_TYPE_TO_GPU_STAGE[shader.GetDesc().shader_type],
                    storageTexture: {},
                });
            }

            for(let texture of resources.textures) {
                if(!layoutsInfo[texture.group]) {
                    layoutsInfo[texture.group] = [];
                }
                layoutsInfo[texture.group].push({
                    binding: storage.binding,
                    visibility: SHAER_TYPE_TO_GPU_STAGE[shader.GetDesc().shader_type],
                    texture: {},
                });
            }
        }

        for(let i=0; i<layoutsInfo.length; i++) {
            this.bind_group_layouts[i] = device.createBindGroupLayout({
                entries: layoutsInfo[i],
            });
        }
    }
}

export {
    ProgramGPU,
}
