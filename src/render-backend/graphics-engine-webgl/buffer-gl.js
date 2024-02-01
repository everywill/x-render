import { Buffer, CorrectBufferViewDesc } from "../graphics-engine/buffer";
import { BIND_FLAGS, CPU_ACCESS_FLAGS, MAP_TYPE, USAGE } from "../graphics/graphics-types";
import { BufferViewGL } from "./bufferview-gl";
import { gl } from "./gl";

function UsageToGLUsage(usage) {
    switch(usage) {
        case USAGE.USAGE_STATIC:
            return gl.STATIC_DRAW;
            return 0x88E4;  // GL_STATIC_DRAW
        case USAGE.USAGE_DEFAULT:
            return gl.DYNAMIC_DRAW;
            return 0x88E8;  // GL_DYNAMIC_DRAW
        case USAGE.USAGE_DYNAMIC:
            return gl.STREAM_DRAW;
            return 0x88E0;  // GL_STREAM_DRAW
        case USAGE.USAGE_STAGING:
            return gl.DYNAMIC_READ;
            return 0x88E9;  // GL_DYNAMIC_READ
    }
}

function GetBufferBindTarget(bufferDesc) {
    let target = gl.ARRAY_BUFFER;
    // let target = 0x8892;  GL_ARRAY_BUFFER
    if(bufferDesc.bind_flags == BIND_FLAGS.BIND_VERTEX_BUFFER) {
        target = gl.ARRAY_BUFFER;
        // target = 0x8892;  GL_ARRAY_BUFFER
    } else if(bufferDesc.bind_flags == BIND_FLAGS.BIND_INDEX_BUFFER) {
        target = gl.ELEMENT_ARRAY_BUFFER
        // target = 0x8893;  GL_ELEMENT_ARRAY_BUFFER
    } else if(bufferDesc.bind_flags == BIND_FLAGS.BIND_UNIFORM_BUFFER) {
        target = gl.UNIFORM_BUFFER;
        // target = 0x8A11;  GL_UNIFORM_BUFFER;
    } else if(bufferDesc.bind_flags == BIND_FLAGS.BIND_INDIRECT_DRAW_ARGS) {
        throw 'indirect draw are not supported';
    } else if(bufferDesc.usage == USAGE.USAGE_STAGING && bufferDesc.cpu_access_flags == CPU_ACCESS_FLAGS.CPU_ACCESS_WRITE) {
        target = gl.PIXEL_UNPACK_BUFFER;
        target = 0x88EC;  // GL_PIXEL_UNPACK_BUFFER
    }
    return target;
}

class BufferGL extends Buffer {
    constructor(renderDevice, bufferDesc, bufferData, glHandle = null) {
        super(renderDevice, bufferDesc);
        this.map_target = 0;
        this.gl_usage_hint = UsageToGLUsage(bufferDesc.usage);
        this.gl_buffer = gl.createBuffer();
        if(bufferDesc.usage == USAGE.USAGE_STATIC && !bufferData.data) {
            throw 'Static buffer must be initialized with data at creation time';
        }
        const target = GetBufferBindTarget(bufferDesc);
        gl.bindBuffer(target, this.gl_buffer);
        if(!bufferData.data && bufferData.size<bufferDesc.size) {
            throw 'data is not null and data size is not consistent with buffer size'
        }
        let dataSize = bufferDesc.size;
        let data = null;
        if(bufferData.data && bufferData.size>=bufferDesc.size) {
            data = bufferData.data;
            dataSize = bufferData.size;
        }

        if(data && dataSize) {
            gl.bufferData(target, data, this.gl_usage_hint, 0, dataSize);
        } else {
            gl.bufferData(target, dataSize, this.gl_usage_hint);
        }
        gl.bindBuffer(target, 0);
    }

    GetGLBuffer() { return this.gl_buffer; }

    Release() {
        gl.deleteBuffer(this.gl_buffer);
    }

    UpdateData(deviceContext, offset, size, data) {
        super.UpdateData(deviceContext, offset, size, data);
        // todo: bufferMemoryBarrier
        const target = GetBufferBindTarget(bufferDesc);
        gl.bindBuffer(target, this.gl_buffer);
        if(size) {
            gl.bufferSubData(target, offset, size, data);
        }
        gl.bindBuffer(target, 0);
    }

    CopyData(deviceContext, srcBuffer, srcOffset, dstOffset, size) {
        super.CopyData(deviceContext, srcBuffer, srcOffset, dstOffset, size);
        // todo: bufferMemoryBarrier
        gl.bindBuffer(gl.COPY_WRITE_BUFFER, this.gl_buffer);
        gl.bindBuffer(gl.COPY_READ_BUFFER, srcBuffer.gl_buffer);
        gl.copyBufferSubData(gl.COPY_READ_BUFFER, gl.COPY_WRITE_BUFFER, srcOffset, dstOffset, size);
        gl.bindBuffer(gl.COPY_WRITE_BUFFER, 0);
        gl.bindBuffer(gl.COPY_READ_BUFFER, 0);
    }

    Map(deviceContext, mapType, mapFlags, mappedData) {
        super.Map(deviceContext, mapType, mapFlags, mappedData);
        // Map and Unmap are not supported in WebGL
        // emscripten mock this by bufferSubData when and only when access is MAP_WRITE|INVALIDATE_BUFFER
        throw 'not suppoerted in WebGL';
    }

    Unmap(deviceContext, mapType, mapFlags) {
        throw 'not suppoerted in WebGL';
    }

    BufferMemoryBarrier(requiredBarriers, glContextState) { 
        // todo: implement
    }

    CreateViewInternal(bufferViewDesc) {
        CorrectBufferViewDesc(bufferViewDesc, this.desc);
        const renderDevice = this.render_device;
        const deviceContext = renderDevice.GetImmediateContext();
        return new BufferViewGL(renderDevice, deviceContext, bufferViewDesc, this);
    }
}

export {
    BufferGL,
}
