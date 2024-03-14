import { SwapChain } from "../graphics-engine/swapchain";

class SwapchainGL extends SwapChain {
    constructor(renderDevice, deviceContext, swapchainDesc) {
        super(renderDevice, deviceContext, swapchainDesc);
    }

    Release() {}

    Present(syncInterval) {
        
    }
}

export {
    SwapchainGL,
}
