import { RenderApi, API } from '../renderer/renderApi';
import { Shader } from './shader';
import { GLShader } from '../../backend/webgl/shader';
import { GPUShader } from '../../backend/webgpu/shader';

Shader.Create = function(name, vertexShaderSrc, fragmentShaderSrc) {
    switch(RenderApi.CURRENT_TYPE) {
        case API.WEBGL: return new GLShader(name, vertexShaderSrc, fragmentShaderSrc);
        case API.WEBGPU: return new GPUShader(name, vertexShaderSrc, fragmentShaderSrc);
    }
}

export {
    Shader,
};
