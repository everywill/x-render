import { VertexBuffer, IndexBuffer } from '../../x-renderer/renderer/buffer';
import { Context } from '../../x-renderer/core/context';

export class GLVertexBuffer extends VertexBuffer {
    get gl() { return Context.CURRENT }

    constructor(data, offset = 0) {
        this.id = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.DYNAMIC_DRAW, offset);
    }
 
    bind() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id);
    }

    unbind() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, 0);
    }

    setData(data, dstOffset = 0, srcOffset = 0, size) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id);
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, dstOffset, data, srcOffset, size);
    }
    getLayout() {
        return this.layout;
    }
    setLayout(layout) {
        this.layout = layout;
    } 
}

export class GLIndexBuffer extends IndexBuffer {
    get gl() { return Context.CURRENT }

    constructor(data, count) {
        this.id = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.id);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
        this.count = count;
    }

    bind() {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.id);
    }

    unbind() {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, 0);
    }

    getCount() {
        return this.count;
    }
}
