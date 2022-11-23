import { Shader } from "../../x-renderer/renderer/shader";
import { Context } from "../../x-renderer/core/context";
import { ShaderDataType, ShaderDataTypeSize } from "../../x-renderer/renderer/buffer";
import logger from '../../x-renderer/core/log';

export class WGPUShader extends Shader {
    get device() { return Context.device }

    get pipeline() {
        if(!this._pipeline) {
            this.pipelineDesc.vertex.buffers = this.vao.vertexBufferDesc;
            this._pipeline = this.device.createRenderPipeline(this.pipelineDesc);
        }
        return this._pipeline;
    }

    get bindGroup() {
        if(!this._bindGroup) {
            const entries = [];
            this.bindings.forEach((value, key) => {
                if(value.type === ShaderDataType.Mat4) {
                    entries[value.index] = {
                        binding: value.index,
                        resource: { buffer: value.resource },
                    };
                }
                if(value.type === 'texture') {
                    entries[value.index] = {
                        binding: value.index,
                        resource: value.resource.createView(),
                    };
                }
                if(value.type === 'sampler') {
                    entries[value.index] = {
                        binding: value.index,
                        resource: value.resource,
                    };
                }
            });
            this._bindGroup = this.device.createBindGroup({
                layout: this.pipeline.getBindGroupLayout(0),
                entries,
            });
        }
        return this._bindGroup;
    }

    constructor(vertexSrc, fragmentSrc, vertexEntry = 'main', fragmentEntry = 'main') {
        super();
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
        this.bindings = new Map();
    }

    createShaderDesc(vertexSrc, vertexEntry, fragmentSrc, fragmentEntry) {
        // this.device.pushErrorScope('validation');
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

    setTexture(tex) {
        const texName = tex.name + '_texture';
        if(!this.bindings.get(texName) || this.bindings.get(texName).type !== 'texture') {
            this.bindings.set(texName, {
                index: this.bindings.size,
                type: 'texture',
                resource: tex.tex,
            });
        }
        const samplerName = tex.name + '_sampler';
        if(!this.bindings.get(samplerName) || this.bindings.get(samplerName).type !== 'texture') {
            this.bindings.set(samplerName, {
                index: this.bindings.size,
                type: 'sampler',
                resource: tex.sampler,
            });
        }
    }

    setMat4(name, value) {
        if(!this.bindings.get(name) || this.bindings.get(name).type !== ShaderDataType.Mat4) {
            this.bindings.set(name, {
                index: this.bindings.size,
                type: ShaderDataType.Mat4,
                resource: this.device.createBuffer({
                    size: ShaderDataTypeSize[ShaderDataType.Mat4],
                    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
                }),
            });
        }
        
        if(!(value instanceof Float32Array)) {
            value = new Float32Array(value);
        }
        const entry = this.bindings.get(name);
        entry.data = value;
    }

    uploadUniformMat4(name, value) {
        const { resource, data } = this.bindings.get(name);
        this.device.queue.writeBuffer(resource, 0, data, 0, data.length);
    }

    setVAO(vao) {
        this.vao = vao;
    }

    upload(passEncoder) {
        this.vao.upload(passEncoder);
        for(const [key, value] of this.bindings.entries()) {
            if(value.type === ShaderDataType.Mat4) {
                this.uploadUniformMat4(key);
            }
        }
        passEncoder.setBindGroup(0, this.bindGroup);
    }

    bind() {}
    unbind() {}
}
