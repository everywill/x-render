import { SwapChain } from "../graphics-engine/swapchain";

class SwapchainGPU extends SwapChain {
    constructor(renderDevice, deviceContext, swapchainDesc) {
        super(renderDevice, deviceContext, swapchainDesc);
    }

    Release() {}

    Present(syncInterval) {}

    Resize(newWidth, newHeight) {
        if(super.Resize(newWidth, newHeight)) {
            
        }
    }

    GetCurrentBackBufferRTV() { }

    GetCurrentBackBufferDSV() { }

    ReadPixels() { }
}

export {
    SwapchainGPU,
}
