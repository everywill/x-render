import { RenderApi, API } from './renderApi';
import { GLVertexArray } from '../../backend/webgl/vertexArray';

export class VertexArray {
    bind() {}
    unbind() {}
    addVertexBuffer(vertexBuffer) {}
    setIndexBuffer(indexBuffer) {}
}

VertexArray.Create = function() {
    if(RenderApi.CURRENT_TYPE === API.WEBGL) {
        return new GLVertexArray();
    }
}