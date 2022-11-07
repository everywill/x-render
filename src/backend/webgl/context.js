import { Context } from '../../x-renderer/core/context';

export class GLContext extends Context {
    constructor(options) {
        super(options);
        this.context = this.canvas.getContext('webgl2');
    }
}