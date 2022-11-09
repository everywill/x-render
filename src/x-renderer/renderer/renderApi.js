import { Context } from '../core/context';

export const API = {
    WEBGL: 0,
    WEBGPU: 1,
}

export const MASKTYPE = {
    COLOR: 'Color',
    DEPTH: 'Depth',
    STENCIL: 'Stencil',
};

export class RenderApi {
    get ctx() { return Context.CURRENT; }
    init(options) {}
    setClearColor(color) {}
    clear(mask) {}
    drawIndexed(vao, indexCount) {}
}

RenderApi.CURRENT_TYPE = undefined;
