import { BufferView } from "../graphics-engine/bufferview";

class BufferViewGPU extends BufferView {
    constructor(renderDevice, viewDesc, buffer) {
        super(renderDevice, viewDesc, buffer);
    }

    Release() { }
}

export {
    BufferViewGPU,
}
