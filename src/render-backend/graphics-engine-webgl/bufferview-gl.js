import { BufferView } from "../graphics-engine/bufferview";

class BufferViewGL extends BufferView {
    constructor(renderDevice, deviceContext, viewDesc, buffer) {
        super(renderDevice, viewDesc, buffer);
        // texture buffer(glTexBuffer) is not supported in WebGL
    }
}

export {
    BufferViewGL
}
