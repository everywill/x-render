import { BufferDesc, BufferData } from "./buffer-desc";
import { BIND_FLAGS, USAGE } from "./graphics-types";

function CreateDefaultVertexBuffer(renderDevice, byteSize, data, gpuWriteable) {
    const bufferDesc = new BufferDesc();
    bufferDesc.usage = USAGE.USAGE_DEFAULT;
    bufferDesc.bind_flags = gpuWriteable ? 
                                BIND_FLAGS.BIND_VERTEX_BUFFER | BIND_FLAGS.BIND_UNORDERED_ACCESS : 
                                BIND_FLAGS.BIND_VERTEX_BUFFER;
    bufferDesc.size = byteSize;
    const bufferData = new BufferData();
    bufferData.data = data;
    bufferData.size = byteSize;
    return renderDevice.CreateBuffer(bufferDesc, bufferData);
}

function CreateStaticVertexBuffer(renderDevice, byteSize, data) {
    const bufferDesc = new BufferDesc();
    bufferDesc.usage = USAGE.USAGE_STATIC;
    bufferDesc.bind_flags = BIND_FLAGS.BIND_VERTEX_BUFFER;
    bufferDesc.size = byteSize;
    const bufferData = new BufferData();
    bufferData.data = data;
    bufferData.size = byteSize;
    return renderDevice.CreateBuffer(bufferDesc, bufferData);
}

function CreateDynamicVertexBuffer(renderDevice, byteSize, data, gpuWriteable) {
    const bufferDesc = new BufferDesc();
    bufferDesc.usage = USAGE.USAGE_DYNAMIC;
    bufferDesc.bind_flags = gpuWriteable ?
                            BIND_FLAGS.BIND_VERTEX_BUFFER | BIND_FLAGS.BIND_UNORDERED_ACCESS :
                            BIND_FLAGS.BIND_VERTEX_BUFFER;
    bufferDesc.size = byteSize;
    const bufferData = new BufferData();
    bufferData.data = data;
    bufferData.size = byteSize;
    return renderDevice.CreateBuffer(bufferDesc, bufferData);
}

function CreateDefaultIndexBuffer(renderDevice, byteSize, data, gpuWriteable) {
    const bufferDesc = new BufferDesc();
    bufferDesc.usage = USAGE.USAGE_DEFAULT;
    bufferDesc.bind_flags = gpuWriteable ? 
                                BIND_FLAGS.BIND_INDEX_BUFFER | BIND_FLAGS.BIND_UNORDERED_ACCESS : 
                                BIND_FLAGS.BIND_INDEX_BUFFER;
    bufferDesc.size = byteSize;
    const bufferData = new BufferData();
    bufferData.data = data;
    bufferData.size = byteSize;
    return renderDevice.CreateBuffer(bufferDesc, bufferData);
}

function CreateStaticIndexBuffer(renderDevice, byteSize, data) {
    const bufferDesc = new BufferDesc();
    bufferDesc.usage = USAGE.USAGE_STATIC;
    bufferDesc.bind_flags = BIND_FLAGS.BIND_INDEX_BUFFER;
    bufferDesc.size = byteSize;
    const bufferData = new BufferData();
    bufferData.data = data;
    bufferData.size = byteSize;
    return renderDevice.CreateBuffer(bufferDesc, bufferData);
}

function CreateDynamicIndexBuffer(renderDevice, byteSize, data) {
    const bufferDesc = new BufferDesc();
    bufferDesc.usage = USAGE.USAGE_DYNAMIC;
    bufferDesc.bind_flags = BIND_FLAGS.BIND_INDEX_BUFFER;
    bufferDesc.size = byteSize;
    const bufferData = new BufferData();
    bufferData.data = data;
    bufferData.size = byteSize;
    return renderDevice.CreateBuffer(bufferDesc, bufferData);
}

function CreateUniformBuffer(renderDevice, byteSize, usage = USAGE.USAGE_DEFAULT, bindFlag = BIND_FLAGS.BIND_UNIFORM_BUFFER, cpuAccessFlas = CPU_ACCESS_FLAGS.CPU_ACCESS_NONE) {
    const CBDesc = new BufferDesc()
    CBDesc.size = byteSize;
    CBDesc.usage = usage;
    CBDesc.bind_flags = bindFlag;
    CBDesc.cpu_access_flags = cpuAccessFlas;
    const data = new BufferData();
    return renderDevice.CreateBuffer(CBDesc, data);
}

export {
    CreateDefaultVertexBuffer,
    CreateStaticVertexBuffer,
    CreateDynamicVertexBuffer,
    CreateDefaultIndexBuffer,
    CreateStaticIndexBuffer,
    CreateDynamicIndexBuffer,
    CreateUniformBuffer,
}
