import { RenderApi } from '../../x-renderer/renderer/renderApi';

export class GLRenderApi extends RenderApi {
    init(options) {}
    setClearColor(color) {
        const {r, g, b, a} = color;
        this.ctx.clearColor(r, g, b, a);
    }

    clear(mask) {
        this.ctx.clear(mask);
    }

    drawIndexed(vao, indexCount) {
        vao.bind();
        const count = indexCount ? indexCount : vao.getIndexBuffer.getCount();
        this.ctx.drawElements(this.ctx.TRIANGLES, count, this.ctx.UNSIGNED_SHORT, 0);
    }
}