import { Shader } from "../../x-renderer/renderer/shader";
import { Context } from "../../x-renderer/core/context";

export class GPUShader extends Shader {
    get device() { return Context.device }

    constructor(name, vertexSrc, fragmentSrc, vertexEntry = 'main', fragmentEntry = 'main') {
        super();
        this.name = name;
        this.createShaderDesc(vertexSrc, vertexEntry, fragmentSrc, fragmentEntry);
    }

    createShaderDesc(vertexSrc, vertexEntry, fragmentSrc, fragmentEntry) {
        this.vertexDesc = {
            module: this.device.createShaderModule({
                code: vertexSrc,
            }),
            entryPoint: vertexEntry,
        };

        this.fragmentDesc = {
            module: this.device.createShaderModule({
                code: fragmentSrc,
            }),
            entryPoint: fragmentEntry,
        };

    }

    bind(pipelineDesc) {
        pipelineDesc.vertex = ths.vertexDesc;
        pipelineDesc.fragment = this.fragmentDesc;
    }
    unbind(pipelineDesc) {
        pipelineDesc.vertex = {};
        pipelineDesc.fragment = {};
    }
}
