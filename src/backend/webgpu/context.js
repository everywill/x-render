import { Context } from "../../x-renderer/core/context";

export class GPUContext extends Context {
    constructor(options) {
        super(options);
        this.context = this.canvas.getContext('webgpu');
    }
}