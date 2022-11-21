import { VertexArray } from "../../x-renderer/renderer/vertexArray";
import { Context } from "../../x-renderer/core/context";
import { ShaderDataType } from "../../x-renderer/renderer/buffer";

// VertexArray or BufferLayout
export class WGPUVertexArray extends VertexArray { 
    get device() { return Context.device; }

    get vertexBufferDesc() {
        return this.vertexBuffers.map(item => item.desc);
    }

    constructor() {
        super();
        this.vertexBufferIndex = 0;  // shader location index
        this.vertexBuffers = [];
        this.indexBuffer = undefined;
    }
    
    bind() {}

    unbind() {}

    upload(passEncoder) {
        for(let i=0; i<this.vertexBuffers.length; i++) {
            this.vertexBuffers[i].vBuffer.bind(passEncoder, i);
        }

        this.indexBuffer.bind(passEncoder);
    }

    addVertexBuffer(vertexBuffer) {
        const layout = vertexBuffer.getLayout();
        if(layout.length > 0){
            let bufferDesc = {
                attributes: [],
                arrayStride: layout.stride,
                stepMode: 'vertex',
            }
            let attribDesc;
            for(let el of layout) {
                switch(el.type) {
                    case ShaderDataType.Float:
                    case ShaderDataType.Float2:
                    case ShaderDataType.Float3:
                    case ShaderDataType.Float4:
                    {
                        attribDesc = {
                            shaderLocation: this.vertexBufferIndex,
                            offset: el.offset,
                            format: el.getComponentCount() > 1 ? `float32x${el.getComponentCount()}` : 'float32',
                        };
                        bufferDesc.attributes.push(attribDesc);
                        this.vertexBufferIndex++;
                        break;
                    }
                    case ShaderDataType.Int:
                    case ShaderDataType.Int2:
                    case ShaderDataType.Int3:
                    case ShaderDataType.Int4:
                    {
                        attribDesc = {
                            shaderLocation: this.vertexBufferIndex,
                            offset: el.offset,
                            format: el.getComponentCount() > 1 ? `sint32x${el.getComponentCount()}` : 'sint32',
                        }
                        bufferDesc.attributes.push(attribDesc);
                        this.vertexBufferIndex++;
                        break;
                    }
                    case ShaderDataType.Mat3:
                    case ShaderDataType.Mat4:
                    {
                        const count = el.getComponentCount();
                        for(let i=0; i<count; i++) {
                            attribDesc = {
                                shaderLocation: this.vertexBufferIndex,
                                offset: el.offset+4*count*i,
                                format: 'float32x4',
                            }
                            bufferDesc.attributes.push(attribDesc);
                            this.vertexBufferIndex++;
                        }
                        break;
                    }
                }
            }

            this.vertexBuffers.push({
                desc: bufferDesc,
                vBuffer: vertexBuffer,
            });
        }
    }

    setIndexBuffer(indexBuffer) {
        this.indexBuffer = indexBuffer;
    }
}
