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
        this.bind_groups = []

        // this.SetupBindGroupLayouts();
    }

    Release() { }

    // GetBindGroupLayoutNums() { return this.bind_group_layouts.length; }
    GetBindGroupLayouts() { return this.bind_group_layouts; }
    GetBindGroups() { return this.bind_groups; }

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

    GetBindGroups() {
        const device = this.render_device.GetWebGPUDevice();
        const layoutsInfo = [];
        const resourcesInfo = []

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

                if(!resourcesInfo[buffer.group]) {
                    resourcesInfo[buffer.group] = [];
                }
                resourcesInfo[buffer.group].push({
                    binding: buffer.binding,
                    resource: {
                        buffer: buffer.resource
                    }
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

                if(!resourcesInfo[sampler.group]) {
                    resourcesInfo[sampler.group] = [];
                }
                resourcesInfo[sampler.group].push({
                    binding: sampler.binding,
                    resource: sampler.resource,
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

                if(!resourcesInfo[storage.group]) {
                    resourcesInfo[storage.group] = [];
                }
                resourcesInfo[storage.group].push({
                    binding: storage.binding,
                    resource: storage.resource,
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

                if(!resourcesInfo[texture.group]) {
                    resourcesInfo[texture.group] = [];
                }
                resourcesInfo[texture.group].push({
                    binding: texture.binding,
                    resource: texture.resource,
                });
            }
        }

        for(let i=0; i<layoutsInfo.length; i++) {
            this.bind_group_layouts[i] = device.createBindGroupLayout({
                entries: layoutsInfo[i],
            });

            this.bind_groups[i] = device.createBindGroup({
                layout: this.bind_group_layouts[i],
                entries: resourcesInfo[i],
            });
        }
    }
}

export {
    ProgramGPU,
}
