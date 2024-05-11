import { BufferView } from "../graphics-engine/bufferview";

class BufferViewGPU extends BufferView {
    constructor(renderDevice, deviceContext, viewDesc, buffer) {
        super(renderDevice, viewDesc, buffer);
    }
}

export {
    BufferViewGPU,
}
