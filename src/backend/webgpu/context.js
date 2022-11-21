import { Context } from "../../x-renderer/core/context";

export class WGPUContext extends Context {
    constructor(options) {
        super(options);
        this.context = this.canvas.getContext('webgpu');
    }
}