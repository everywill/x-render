import { RenderCommand } from './renderCommand';

export class Renderer {}

Renderer.Init = function() {
    RenderCommand.Init();
}

Renderer.Submit = function(shader, vao) {
    shader.bind();
    vao.bind();
    
    RenderCommand.DrawIndexed(vao);
}
