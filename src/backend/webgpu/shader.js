import { Shader } from "../../x-renderer/renderer/shader";
import { Context } from "../../x-renderer/core/context";
import logger from '../../x-renderer/core/log';

export class GPUShader extends Shader {
    get device() { return Context.device }

    constructor(name, vertexSrc, fragmentSrc, vertexEntry = 'main', fragmentEntry = 'main') {
        super();
        this.name = name;
        this.varLocs = {};  // item: {group, binding}
        this.bindGroups = [];
        this.createShaderDesc(vertexSrc, vertexEntry, fragmentSrc, fragmentEntry);
    }

    async createShaderDesc(vertexSrc, vertexEntry, fragmentSrc, fragmentEntry) {
        this.device.pushErrorScope('validation');
        const vShaderModule = this.device.createShaderModule({ code: vertexSrc });
        let error = await this.device.popErrorScope();
        if(error) {
            logger.error('compile vertexShader', '', error.message);
        }
        this.vertexDesc = {
            module: vShaderModule,
            entryPoint: vertexEntry,
        };

        const fShaderModule = this.device.createShaderModule({ code: fragmentSrc });
        error = await this.device.popErrorScope();
        if(error) {
            logger.error('compile fragmentShader', '', error.message);
        }
        this.fragmentDesc = {
            module: fShaderModule,
            entryPoint: fragmentEntry,
        };
    }

    allocVar(name, loc) {
        this.varLocs[name] = loc;
    }

    bind(pipelineDesc) {
        pipelineDesc.vertex = ths.vertexDesc;
        pipelineDesc.fragment = this.fragmentDesc;
    }
    unbind(pipelineDesc) {
        // pipelineDesc.vertex = {};
        // pipelineDesc.fragment = {};
    }


}
