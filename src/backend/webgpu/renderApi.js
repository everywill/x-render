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
}