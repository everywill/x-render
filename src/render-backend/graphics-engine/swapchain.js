// SwapChain interface
class SwapChain {
    constructor() {}
    // Present a renderer image to the user
    Present(sync_interval) {}
    // return the swapchain description
    GetDesc() {}
    // change swapchain's back buffer
    Resize(new_width, new_height) {}
}