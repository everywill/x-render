import { VertexArray } from '../../x-renderer/renderer/vertexArray';
import { Context } from '../../x-renderer/core/context';
import { ShaderDataType } from '../../x-renderer/renderer/buffer';

export class GLVertexArray extends VertexArray {
    get gl() { return Context.CURRENT; }

    constructor() {
        super();
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
        const layout = vertexBuffer.getLayout();
        if(layout.length > 0) {
            this.gl.bindVertexArray(this.id);
            vertexBuffer.bind();

            for(let el of layout) {
                switch(el.type) {
                    case ShaderDataType.Float:
                    case ShaderDataType.Float2:
                    case ShaderDataType.Float3:
                    case ShaderDataType.Float4:
                    {
                        this.gl.enableVertexAttribArray(this.vertexBufferIndex);
                        this.gl.vertexAttribPointer(this.vertexBufferIndex, el.getComponentCount(), this.gl.FLOAT, el.normalized, layout.stride, el.offset);
                        this.vertexBufferIndex++;
                        break;
                    }
                    case ShaderDataType.Int:
                    case ShaderDataType.Int2:
                    case ShaderDataType.Int3:
                    case ShaderDataType.int4:
                    {
                        this.gl.enableVertexAttribArray(this.vertexBufferIndex);
                        this.gl.vertexAttribIPointer(this.vertexBufferIndex, el.getComponentCount(), this.gl.INT, layout.stride, el.offset);
                        this.vertexBufferIndex++
                        break;
                    }
                    case ShaderDataType.Mat3:
                    case ShaderDataType.Mat4:
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