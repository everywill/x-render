import { Buffer } from "../graphics-engine/buffer";

const USAGE_MAP = {
    
}

class BufferGL extends Buffer {
    constructor(renderDevice, bufferDesc, bufferData) {
        super(renderDevice, bufferDesc);
        this.map_target = 0;
    }
}