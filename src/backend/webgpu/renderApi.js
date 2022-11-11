import { RenderApi } from "../../x-renderer/renderer/renderApi";
import { Context } from "../../x-renderer/core/context";

export class GPURenderApi extends RenderApi {
    async init(options) {
        const adapter = await navigator.gpu.requestAdapter();
        const device = await adapter.requestDevice();
        const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
        // configure the swap chain
        this.ctx.configure({
            device,
            format: presentationFormat,
            // alphaMode: 'opaque'
        });
        Context.device = device;
    }
    setClearColor(color) {
        this.clearColor = color;
    }

    clear(mask) {}

    drawIndexed(vao, indexCount) {
        const commandEncoder = Context.device.createCommandEncoder();
        const renderPassDescriptor = {
            colorAttachments: [{
                view: Context.CURRENT.getCurrentTexture().createView(),
                clearValue: this.clearColor,
                loadOp: 'clear',
                storeOp: 'store',
            }],
        };

        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(Context.CURRENT_SHADER.pipeline);

        vao.upload(passEncoder);

        const count = indexCount ? indexCount : vao.indexBuffer.getCount();
        passEncoder.drawIndexed(count);
        passEncoder.end();
        Context.device.queue.submit([commandEncoder.finish()]);
    }
}