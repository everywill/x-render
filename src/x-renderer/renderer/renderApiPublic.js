import { API, RenderApi, MASKTYPE } from "./renderApi";
import { GLRenderApi } from '../../backend/webgl/renderApi';
import { GPURenderApi } from '../../backend/webgpu/renderApi';

RenderApi.Create = function() {
    switch(RenderApi.CURRENT_TYPE) {
        case API.WEBGL: return new GLRenderApi();
        case API.WEBGPU: return new GPURenderApi();
    }
}

export {
    API, MASKTYPE,
    RenderApi,
};
