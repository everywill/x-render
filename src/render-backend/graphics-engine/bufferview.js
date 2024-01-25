class BufferView {
    constructor(renderDevice, viewDesc, buffer) {
        this.render_device = renderDevice;
        this.desc = viewDesc;
        this.buffer = buffer;
    }
    GetDesc() { return this.desc; }
    GetBuffer() { return this.buffer; }
}

export {
    BufferView,
}
