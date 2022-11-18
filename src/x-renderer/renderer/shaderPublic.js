import { RenderApi, API } from './renderApi';
import { Shader } from './shader';
import { GLShader } from '../../backend/webgl/shader';
import { GPUShader } from '../../backend/webgpu/shader';

Shader.Create = function(vertexShaderSrc, fragmentShaderSrc) {
    switch(RenderApi.CURRENT_TYPE) {
        case API.WEBGL: return new GLShader(vertexShaderSrc, fragmentShaderSrc);
        case API.WEBGPU: return new GPUShader(vertexShaderSrc, fragmentShaderSrc);
    }
}

export class ShaderLibrary {
    constructor() {
        this.shaders = new Map();
    }

    async load(name, path) {
        const text = await fetch(path)
            .then((res) => res.text());
        const shaderSource = this.preProcess(text);
        const shader = Shader.Create(shaderSource.vertex, shaderSource.fragment);
        this.shaders.set(name, shader);
        return shader;
    }

    preProcess(text) {
        const reg = new RegExp(/#type ([a-z]+)(?:\s+)/, 'g');
        let e = reg.exec(text);
        const ret = {};
        let startIndex = 0;
        let endIndex = 0;
        let type = '';
        while(e) {
            endIndex = e.index;
            if(endIndex > startIndex) {
                ret[type] = text.substring(startIndex, endIndex);
            }
            type = e[1];
            startIndex = endIndex + e[0].length;
            e = reg.exec(text);
        }
        ret[type] = text.substring(startIndex);
        return ret;
    }

    get(name) {
        return this.shaders.get(name);
    }
}
