import { RenderApi, API } from './renderApi';
import { VertexBuffer, IndexBuffer, BufferLayout, ShaderDataType } from './buffer';
import { GLIndexBuffer, GLVertexBuffer } from '../../backend/webgl/buffer';

VertexBuffer.Create = function(data, offset) {
    if(RenderApi.CURRENT_TYPE === API.WEBGL) {
        return new GLVertexBuffer(data, offset);
    }
}

IndexBuffer.Create = function(data) {
    if(RenderApi.CURRENT_TYPE === API.WEBGL) {
        return new GLIndexBuffer(data);
    }
}

export {
    VertexBuffer, 
    IndexBuffer, 
    BufferLayout, 
    ShaderDataType,
}