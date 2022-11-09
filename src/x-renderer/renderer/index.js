import { RenderCommand } from './renderCommand';

export class Renderer {}

Renderer.Init = function(options) {
    return RenderCommand.Init(options);
}

Renderer.Submit = function(shader, vao) {
    shader.bind();
    vao.bind();
    
    RenderCommand.DrawIndexed(vao);
}
