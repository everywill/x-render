import { RenderApi, API } from './renderApi';
import { Texture } from "./texture";
import { GLTexture } from '../../backend/webgl/texture';
import { WGPUTexture } from '../../backend/webgpu/texture';

Texture.Create = function(name, width, height) {
    switch(RenderApi.CURRENT_TYPE) {
        case API.WEBGL: return new GLTexture(name, width, height);
        case API.WEBGPU: return new WGPUTexture(name, width, height);
    }
}

export {
    Texture,
};
