import { SwapChain } from "../graphics-engine/swapchain";
import { RenderPassAttribs } from "../graphics/device-context-desc";
import { GetCanvas } from "./gl-context";

class SwapchainGL extends SwapChain {
    constructor(renderDevice, deviceContext, swapchainDesc) {
        super(renderDevice, deviceContext, swapchainDesc);
        this.swap_chain_desc.width = GetCanvas().width;
        this.swap_chain_desc.height = GetCanvas().height;
    }

    Release() {}

    Present(syncInterval) {
        const GLContext = this.render_device.gl_context;
        GLContext.SwapBuffers(syncInterval);
    }

    Resize(newWidth, newHeight) {
        if(super.Resize(newWidth, newHeight)) {
            if(this.device_context) {
                const isDefaultFramebufferBound = this.device_context.is_default_framebuffer_bound;
                if(isDefaultFramebufferBound) {
                    // update the viewport is the only thing need to do in WebGL
                    const renderPassAttribs = new RenderPassAttribs();
                    this.device_context.BeginRenderPass(0, null, null, renderPassAttribs);
                    this.device_context.EndRenderPass();
                }
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
