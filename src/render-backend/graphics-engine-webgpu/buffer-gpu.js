import { Buffer, CorrectBufferViewDesc } from "../graphics-engine/buffer";

class BufferGPU extends Buffer {
    constructor(renderDevice, bufferDesc, bufferData) {
        super(renderDevice, bufferDesc);
    }

    Release() {
        super.Release();
        this.render_device.OnDestroyBuffer(this);
        this.gpu_buffer.destroy();
    }

    CreateViewInternal(bufferViewDesc) {
        CorrectBufferViewDesc(bufferViewDesc, this.desc);
    }
}

export {
    BufferGPU,
}
