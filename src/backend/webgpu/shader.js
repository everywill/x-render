import { Shader } from "../../x-renderer/renderer/shader";
import { Context } from "../../x-renderer/core/context";
import logger from '../../x-renderer/core/log';

export class GPUShader extends Shader {
    get device() { return Context.device }

    get pipeline() {
        if(!this._pipeline) {
            this.pipelineDesc.vertex.buffers = Context.CURRENT_VAO.vertexBufferDesc;
            this._pipeline = this.device.createRenderPipeline(this.pipelineDesc);
        }
        return this._pipeline;
    }

    constructor(name, vertexSrc, fragmentSrc, vertexEntry = 'main', fragmentEntry = 'main') {
        super();
        this.name = name;
        // this.varLocs = {};  // item: {group, binding}
        // this.bindGroups = [];
        this.pipelineDesc = { 
            //  vertex, fragment, 
            layout: 'auto',
            primitive: {
                frontFace: 'ccw',
                cullMode: 'none',
                topology: 'triangle-list',
            },
            // depthStencil: {
            //     depthWriteEnabled: false,
            // }
        };
        this.createShaderDesc(vertexSrc, vertexEntry, fragmentSrc, fragmentEntry);
    }

    createShaderDesc(vertexSrc, vertexEntry, fragmentSrc, fragmentEntry) {
        this.device.pushErrorScope('validation');
        const vShaderModule = this.device.createShaderModule({ code: vertexSrc });
        // let error = await this.device.popErrorScope();
        // if(error) {
        //     logger.error('compile vertexShader', '', error.message);
        // }
        // this.device.popErrorScope()
        //     .then((error) => {
        //         if(error) {
        //             logger.error('compile vertexShader', '', error.message);
        //         } else {
        //             logger.info('compile vertexShader', '', 'success');
        //         }
        //     });

        const vertexDesc = {
            module: vShaderModule,
            entryPoint: vertexEntry,
            // buffers: [],
        };

        this.pipelineDesc.vertex = vertexDesc;

        const fShaderModule = this.device.createShaderModule({ code: fragmentSrc });
        // error = await this.device.popErrorScope();
        // if(error) {
        //     logger.error('compile fragmentShader', '', error.message);
        // }
        // this.device.popErrorScope()
        //     .then((error) => {
        //         if(error) {
        //             logger.error('compile fragmentShader', '', error.message);
        //         } else {
        //             logger.info('compile fragmentShader', '', 'success');
        //         }
        //     });
        const fragmentDesc = {
            module: fShaderModule,
            entryPoint: fragmentEntry,
            targets: [{
                format: navigator.gpu.getPreferredCanvasFormat(),
            }]
        };

        this.pipelineDesc.fragment = fragmentDesc;
    }

    // todo: uniform upload
    // allocVar(name, loc) {
    //     this.varLocs[name] = loc;
    // }

    bind() {
        Context.CURRENT_SHADER = this;
    }
    unbind() {
        Context.CURRENT_SHADER = undefined;
    }
}
