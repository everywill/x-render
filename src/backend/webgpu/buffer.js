import { VertexBuffer, IndexBuffer } from "../../x-renderer/renderer/buffer";
import { Context } from "../../x-renderer/core/context";

export class GPUVertexBuffer extends VertexBuffer {
    get device() { return Context.device; }

    constructor(data) {
        super();
        if(!(data instanceof Float32Array)) {
            data = new Float32Array(data);
        }

        // suitable for static mesh(set once on creation and then never changed agains)
        const buffer = this.device.createBuffer({
            size: data.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
            mappedAtCreation: true,
        });
        new Float32Array(buffer.getMappedRange()).set(data);
        buffer.unmap();
        
        this.buffer = buffer;
    }

    bind(passEncoder, index) {
        passEncoder.setVertexBuffer(index, this.buffer);
    }

    unbind() {}

    setData(data) { 
        // todo 
    }

    getLayout() {
        return this.layout;
    }
    setLayout(layout) {
        this.layout = layout;
    } 
}

export class GPUIndexBuffer extends IndexBuffer {
    get device() { return Context.device }
    
    constructor(data, count) {
        super();
        if(!(data instanceof Uint32Array)) {
            data = new Uint32Array(data);
        }

        const buffer = this.device.createBuffer({
            size: data.byteLength,
            usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
            mappedAtCreation: true,
        });
        new Uint32Array(buffer.getMappedRange()).set(data);
        buffer.unmap();
        
        this.buffer = buffer;
        this.count = count ? count : data.length;
    }

    bind(passEncoder) {
        passEncoder.setIndexBuffer(this.buffer, 'uint32');
    }

    unbind() {}

    getCount() {
        return this.count;
    }
}
 