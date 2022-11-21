import { API, RenderApi, MASKTYPE } from "./renderApi";
import { GLRenderApi } from '../../backend/webgl/renderApi';
import { WGPURenderApi } from '../../backend/webgpu/renderApi';

RenderApi.Create = function() {
    switch(RenderApi.CURRENT_TYPE) {
        case API.WEBGL: return new GLRenderApi();
        case API.WEBGPU: return new WGPURenderApi();
    }
}

export {
    API, MASKTYPE,
    RenderApi,
};
