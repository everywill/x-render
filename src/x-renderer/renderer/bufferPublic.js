import { RenderApi, API } from './renderApi';
import { VertexBuffer, IndexBuffer, BufferLayout, ShaderDataType } from './buffer';
import { GLIndexBuffer, GLVertexBuffer } from '../../backend/webgl/buffer';
import { WGPUIndexBuffer, WGPUVertexBuffer } from '../../backend/webgpu/buffer';

VertexBuffer.Create = function(data, offset) {
    switch(RenderApi.CURRENT_TYPE) {
        case API.WEBGL: return new GLVertexBuffer(data, offset);
        case API.WEBGPU: return new WGPUVertexBuffer(data, offset);
    }
}

IndexBuffer.Create = function(data) {
    switch(RenderApi.CURRENT_TYPE) {
        case API.WEBGL: return new GLIndexBuffer(data);
        case API.WEBGPU: return new WGPUIndexBuffer(data);
    }
}

export {
    VertexBuffer, 
    IndexBuffer, 
    BufferLayout, 
    ShaderDataType,
}
