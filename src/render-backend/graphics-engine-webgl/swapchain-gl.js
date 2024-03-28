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

    Resize(newWidth, newHeight) {
        if(super.Resize(newWidth, newHeight)) {
            if(this.device_context) {

            } else {
                throw 'Immediate context has been released';
            }
        }
    }

    GetCurrentBackBufferRTV() { return null; }

    GetCurrentBackBufferDSV() { return null; }

    ReadPixels() { }

    GetDefaultFBO() { return null; }
}

export {
    SwapchainGL,
}
