import { RenderApi, API } from './renderApi';
import { Texture } from "./texture";
import { GLTexture } from '../../backend/webgl/texture';

Texture.create = function(width, height) {
    switch(RenderApi.CURRENT_TYPE) {
        case API.WEBGL: return new GLTexture(width, height);
    }
}

export {
    Texture,
};
