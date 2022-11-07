import { Context } from '../core/context';
import { GLRenderApi } from '../../backend/webgl/renderApi'

export const API = {
    WEBGL: 0,
    WEBGPU: 1,
}

export class RenderApi {
    get ctx() { return Context.CURRENT; }
    init(options) {}
    setClearColor(color) {}
    clear(mask) {}
    drawIndexed(vao, indexCount) {}
}

RenderApi.CURRENT_TYPE = undefined;

RenderApi.Create = function() {
    if(RenderApi.CURRENT_TYPE === API.WEBGL) {
        return new GLRenderApi();
    }
}
