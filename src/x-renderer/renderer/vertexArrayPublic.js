import { RenderApi, API } from './renderApi';
import { VertexArray } from './vertexArray';
import { GLVertexArray } from '../../backend/webgl/vertexArray';
import { GPUVertexArray } from '../../backend/webgpu/vertexArray';

VertexArray.Create = function() {
    switch(RenderApi.CURRENT_TYPE) {
        case API.WEBGL: return new GLVertexArray();
        case API.WEBGPU: return new GPUVertexArray();
    }
}

export {
    VertexArray,
};
