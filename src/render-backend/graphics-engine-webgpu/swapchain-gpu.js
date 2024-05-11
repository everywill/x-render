import { SwapChain } from "../graphics-engine/swapchain";

class SwapchainGPU extends SwapChain {
    constructor(renderDevice, deviceContext, swapchainDesc) {
        super(renderDevice, deviceContext, swapchainDesc);
    }
}

export {
    SwapchainGPU,
}
