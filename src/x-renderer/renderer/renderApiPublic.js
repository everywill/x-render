import { API, RenderApi, MASKTYPE } from "./renderApi";
import { GLRenderApi } from '../../backend/webgl/renderApi';

RenderApi.Create = function() {
    if(RenderApi.CURRENT_TYPE === API.WEBGL) {
        return new GLRenderApi();
    }
}

export {
    API, MASKTYPE,
    RenderApi,
};
