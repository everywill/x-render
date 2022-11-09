import { RenderApi, API } from './renderApi';
import { GLVertexArray } from '../../backend/webgl/vertexArray';
import { VertexArray } from './vertexArray';

VertexArray.Create = function() {
    if(RenderApi.CURRENT_TYPE === API.WEBGL) {
        return new GLVertexArray();
    }
}

export {
    VertexArray,
};
