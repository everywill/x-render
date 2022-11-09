import { RenderApi, API } from '../renderer/renderApi';
import { Shader } from './shader';
import { GLShader } from '../../backend/webgl/shader';

Shader.Create = function(name, vertexShaderSrc, fragmentShaderSrc) {
    if(RenderApi.CURRENT_TYPE === API.WEBGL) {
        return new GLShader(name, vertexShaderSrc, fragmentShaderSrc)
    }
}

export {
    Shader,
};
