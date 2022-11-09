import { RenderApi, MASKTYPE } from '../../x-renderer/renderer/renderApi';

export class GLRenderApi extends RenderApi {
    init(options) {}
    setClearColor(color) {
        const {r, g, b, a} = color;
        this.ctx.clearColor(r, g, b, a);
    }

    clear(mask) {
        const color_bit_mask = mask[MASKTYPE.COLOR] ? this.ctx.COLOR_BUFFER_BIT : 0;
        const depth_bit_mask = mask[MASKTYPE.DEPTH] ? this.ctx.DEPTH_BUFFER_BIT : 0;
        const stencil_bit_mask = mask[MASKTYPE.STENCIL] ? this.ctx.STENCIL_BUFFER_BIT : 0;
        this.ctx.clear(color_bit_mask | depth_bit_mask | stencil_bit_mask);
    }

    drawIndexed(vao, indexCount) {
        vao.bind();
        const count = indexCount ? indexCount : vao.indexBuffer.getCount();
        this.ctx.drawElements(this.ctx.TRIANGLES, count, this.ctx.UNSIGNED_SHORT, 0);
    }
}