class BufferView {
    constructor(renderDevice, viewDesc, buffer) {
        this.desc = viewDesc;
        this.buffer = buffer;
    }
    GetBuffer() {
        return this.buffer;
    }
}

export {
    BufferView,
}