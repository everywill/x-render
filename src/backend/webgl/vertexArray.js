import { VertexArray } from '../../x-renderer/renderer/vertexArray';
import { Context } from '../../x-renderer/core/context';
import { ShaderDataTypeMap } from '../../x-renderer/renderer/buffer';

export class GLVertexArray extends VertexArray {
    get gl() { return Context.CURRENT }

    constructor() {
        this.id = this.gl.createVertexArray();
        this.vertexBufferIndex = 0;  // layout index
        this.vertexBuffers = [];
        this.indexBuffer = undefined;
    }

    bind() {
        this.gl.bindVertexArray(this.id);
    }
    unbind() {
        this.gl.bindVertexArray(null);
    }

    addVertexBuffer(vertexBuffer) {
        if(vertexBuffer.getLayout().numElements > 0) {
            this.gl.bindVertexArray(this.id);
            vertexBuffer.bind();

            const layout = vertexBuffer.getLayout();
            for(let el of layout) {
                switch(el.type) {
                    case ShaderDataTypeMap.Float:
                    case ShaderDataTypeMap.Float2:
                    case ShaderDataTypeMap.Float3:
                    case ShaderDataTypeMap.Float4:
                    {
                        this.gl.enableVertexAttribArray(this.vertexBufferIndex++);
                        this.gl.vertexAttribPointer(this.vertexBufferIndex, el.size, this.gl.FLOAT, el.normalized, layout.stride, el.offset);
                        break;
                    }
                    case ShaderDataTypeMap.Int:
                    case ShaderDataTypeMap.Int2:
                    case ShaderDataTypeMap.Int3:
                    case ShaderDataTypeMap.int4:
                    {
                        this.gl.enableVertexAttribArray(this.vertexBufferIndex++);
                        this.gl.vertexAttribIPointer(this.vertexBufferIndex, el.size, this.gl.INT, layout.stride, el.offset);
                        break;
                    }
                    case ShaderDataTypeMap.Mat3:
                    case ShaderDataTypeMap.Mat4:
                    {
                        const count = el.getComponentCount();
                        for(let i=0; i<count; i++) {
                            this.gl.enableVertexAttribArray(this.vertexBufferIndex);
                            this.gl.vertexAttribPointer(this.vertexBufferIndex, count, this.gl.FLOAT, layout.stride, el.offset+4*i*count);
                            this.gl.vertexAttribDivisor(this.vertexBufferIndex, 1);
                            this.vertexBufferIndex++;
                        }
                    }
                }
            }
            this.vertexBuffers.push(vertexBuffer);
        }
    }

    setIndexBuffer(indexBuffer) {
        this.gl.bindVertexArray(this.id);
        indexBuffer.bind();
        this.indexBuffer = indexBuffer;
    }
}