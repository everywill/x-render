// SwapChain interface
class SwapChain {
    constructor(renderDevice, deviceContext, swapchainDesc) {
        this.render_device = renderDevice;
        this.device_context = deviceContext;
        this.swap_chain_desc = swapchainDesc;
    }

    // Present a renderer image to the user
    Present(syncInterval) { throw 'implementation needed'; }

    // return the swapchain description
    GetDesc() { return this.swap_chain_desc; }

    // change size of swapchain's back buffer
    Resize(newWidth, newHeight) {
        if(newWidth != 0 && newHeight != 0 
            && this.swap_chain_desc.width != newWidth
            && this.swap_chain_desc.height != newHeight) 
        {
            this.swap_chain_desc.width = newWidth;
            this.swap_chain_desc.height = newHeight;
            return true;
        }
        return false;
    }

    // SetFullscreenMode() {}
    // SetWindowedMode() {}
    // SetMaximumFrameLatency(maxLatency) {}

    // returns render target view of the current back buffer in the swapchain; 
    // OpenGL backends return null
    GetCurrentBackBufferRTV() { throw 'implementation needed'; }
    // returns depth-stencil view of the depth buffer
    GetDepthBufferDSV() { throw 'implementation needed'; }
    ReadPixels() { throw 'implementation needed'; }
}

export {
    SwapChain,
}