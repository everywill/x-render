import { SwapChain } from "../graphics-engine/swapchain";

class SwapchainGL extends SwapChain {
    constructor(renderDevice, deviceContext, swapchainDesc) {
        super(renderDevice, deviceContext, swapchainDesc);
    }

    Release() {}

    Present(syncInterval) {
        const GLContext = this.render_device.gl_context;
        GLContext.SwapBuffers(syncInterval);
    }

    GetCurrentBackBufferRTV() { }

    GetCurrentBackBufferDSV() { }

    ReadPixels() { }

    GetDefaultFBO() { return null; }
}

export {
    SwapchainGL,
}
