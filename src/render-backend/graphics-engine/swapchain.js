// SwapChain interface
class SwapChain {
    constructor(renderDevice, deviceContext, swapchainDesc) {
        this.render_device = renderDevice;
        this.device_context = deviceContext;
        this.swap_chain_desc = swapchainDesc;
    }

    // Present a renderer image to the user
    Present(sync_interval) {}

    // return the swapchain description
    GetDesc() {
        return this.swap_chain_desc;
    }

    // change size of swapchain's back buffer
    Resize(new_width, new_height) {
        if(new_height != 0 && new_width != 0 
            && this.swap_chain_desc.width != new_width
            && this.swap_chain_desc.height != new_height) 
        {
            this.swap_chain_desc.width = new_width;
            this.swap_chain_desc.height = new_height;
            return true;
        }
        return false;
    }

    // SetFullscreenMode() {}
    // SetWindowedMode() {}
    // SetMaximumFrameLatency(maxLatency) {}

    // returns render target view of the current back buffer in the swapchain; 
    // OpenGL backends return null
    GetCurrentBackBufferRTV() {}
    // returns depth-stencil view of the depth buffer
    GetDepthBufferDSV() {}
}

export {
    SwapChain,
}