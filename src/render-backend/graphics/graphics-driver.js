class GraphicsDriver {
    constructor() {
        this.render_device = null;
        this.device_context = null;
    }
    Create() {}

    // Create Graphics Object
    CreateBuffer(bufferDesc, bufferData) {
        return this.render_device.CreateBuffer(bufferDesc, bufferData)
    }
    CreateBufferView(buffer, viewDesc) {
        return buffer.CreateView(viewDesc);
    }
    CreatePipelineState(pipelineStateDesc) {
        return this.render_device.CreatePipelineState(pipelineStateDesc);
    }
}

export {
    GraphicsDriver,
}