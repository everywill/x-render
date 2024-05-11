import { Buffer } from "../graphics-engine/buffer";

class BufferGPU extends Buffer {
    constructor(renderDevice, bufferDesc, bufferData) {
        super(renderDevice, bufferDesc);
    }
}

export {
    BufferGPU,
}
