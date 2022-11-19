import { RenderCommand } from './renderCommand';
import { mat4 } from 'gl-matrix'

export class Renderer {}

const sceneData = {
    viewProjectMatrix: mat4.create(),
}

Renderer.Init = function(options) {
    return RenderCommand.Init(options);
}

Renderer.BeginScene = function(camera) {
    sceneData.viewProjectMatrix = camera.viewProjectionMatrix;
}

Renderer.EndScene = function() {}

Renderer.Submit = function(shader, vao) {
    shader.bind();
    shader.setMat4('u_ViewProjection', sceneData.viewProjectMatrix);
    vao.bind();
    
    RenderCommand.DrawIndexed(vao);
}
