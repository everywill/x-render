import { Buffer, CorrectBufferViewDesc } from "../graphics-engine/buffer";
import { BIND_FLAGS, CPU_ACCESS_FLAGS, USAGE } from "../graphics/graphics-types";
import { BufferViewGL } from "./bufferview-gl";
import { GetCurrentContext } from "./gl-context";

function UsageToGLUsage(usage) {
    const gl = GetCurrentContext();
    switch(usage) {
        case USAGE.USAGE_STATIC:
            return gl.STATIC_DRAW;
        case USAGE.USAGE_DEFAULT:
            return gl.DYNAMIC_DRAW;
        case USAGE.USAGE_DYNAMIC:
            return gl.STREAM_DRAW;
        case USAGE.USAGE_STAGING:
            return gl.DYNAMIC_READ;
    }
}

function GetBufferBindTarget(bufferDesc) {
    const gl = GetCurrentContext();
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
    constructor(renderDevice, bufferDesc, bufferData) {
        super(renderDevice, bufferDesc);
        const gl = GetCurrentContext();
        this.map_target = 0;
        this.gl_usage_hint = UsageToGLUsage(bufferDesc.usage);
        this.gl_buffer = gl.createBuffer();
        if(bufferDesc.usage == USAGE.USAGE_STATIC && !bufferData.data) {
            throw 'Static buffer must be initialized with data at creation time';
        }
        const target = GetBufferBindTarget(bufferDesc);
        gl.bindBuffer(target, this.gl_buffer);
        if(bufferData.data && bufferData.size<bufferDesc.size) {
            throw 'data is not null and data size is not consistent with buffer size'
        }
        let dataSize = bufferDesc.size;
        let data = null;
        if(bufferData.data && bufferData.size>=bufferDesc.size) {
            data = bufferData.data;
            dataSize = bufferData.size;
        }

        if(data && dataSize) {
            // slice dataSize portion if data 
            gl.bufferData(target, data, this.gl_usage_hint);
        } else {
            gl.bufferData(target, dataSize, this.gl_usage_hint);
        }
        gl.bindBuffer(target, null);
    }

    GetGLBuffer() { return this.gl_buffer; }

    Release() {
        super.Release();
        const gl = GetCurrentContext();
        this.render_device.OnDestroyBuffer(this);
        gl.deleteBuffer(this.gl_buffer);
    }

    UpdateData(deviceContext, offset, size, data) {
        super.UpdateData(deviceContext, offset, size, data);
        const gl = GetCurrentContext();
        // todo: bufferMemoryBarrier
        const target = GetBufferBindTarget(this.desc);
        gl.bindBuffer(target, this.gl_buffer);
        if(size) {
            // todo: slice data to provided size
            gl.bufferSubData(target, offset, data);
        }
        gl.bindBuffer(target, null);
    }

    CopyData(deviceContext, srcBuffer, srcOffset, dstOffset, size) {
        super.CopyData(deviceContext, srcBuffer, srcOffset, dstOffset, size);
        const gl = GetCurrentContext();
        // todo: bufferMemoryBarrier
        gl.bindBuffer(gl.COPY_WRITE_BUFFER, this.gl_buffer);
        gl.bindBuffer(gl.COPY_READ_BUFFER, srcBuffer.gl_buffer);
        gl.copyBufferSubData(gl.COPY_READ_BUFFER, gl.COPY_WRITE_BUFFER, srcOffset, dstOffset, size);
        gl.bindBuffer(gl.COPY_WRITE_BUFFER, null);
        gl.bindBuffer(gl.COPY_READ_BUFFER, null);
    }

    Map(deviceContext, mapType, mapFlags) {
        super.Map(deviceContext, mapType, mapFlags);
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
