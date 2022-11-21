import { RenderApi, API } from './renderApi';
import { VertexArray } from './vertexArray';
import { GLVertexArray } from '../../backend/webgl/vertexArray';
import { WGPUVertexArray } from '../../backend/webgpu/vertexArray';

VertexArray.Create = function() {
    switch(RenderApi.CURRENT_TYPE) {
        case API.WEBGL: return new GLVertexArray();
        case API.WEBGPU: return new WGPUVertexArray();
    }
}

export {
    VertexArray,
};
