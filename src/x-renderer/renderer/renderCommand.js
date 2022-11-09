import { RenderApi } from './renderApi';

export class RenderCommand {
}

RenderCommand.Init = function(options) {
    RenderCommand.Render_API = RenderApi.Create();
    return RenderCommand.Render_API.init(options);
}

RenderCommand.SetClearColor = function(color) {
    RenderCommand.Render_API.setClearColor(color);
}

RenderCommand.Clear = function(mask) {
    RenderCommand.Render_API.clear(mask);
}

RenderCommand.DrawIndexed = function(vao, indexCount) {
    RenderCommand.Render_API.drawIndexed(vao, indexCount);
}
