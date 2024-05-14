import { Buffer, CorrectBufferViewDesc } from "../graphics-engine/buffer";
import { BIND_FLAGS, CPU_ACCESS_FLAGS, MAP_TYPE, USAGE } from "../graphics/graphics-types";
import { BufferViewGPU } from "./bufferview-gpu";

function GetBufferUsage(bufferDesc) {
    let usage = 0;

    if(bufferDesc.bind_flags == BIND_FLAGS.BIND_VERTEX_BUFFER) {
        usage |= GPUBufferUsage.VERTEX;
    } else if(bufferDesc.bind_flags == BIND_FLAGS.BIND_INDEX_BUFFER) {
        usage |= GPUBufferUsage.INDEX;
    } else if(bufferDesc.bind_flags == BIND_FLAGS.BIND_UNIFORM_BUFFER) {
        usage |= GPUBufferUsage.UNIFORM;
    } else if(bufferDesc.bind_flags == BIND_FLAGS.BIND_INDIRECT_DRAW_ARGS) {
        usage |= GPUBufferUsage.INDIRECT;
    } else if(bufferDesc.bind_flags == BIND_FLAGS.BIND_UNORDERED_ACCESS) {
        usage |= GetBufferUsage.STORAGE;
    }

    if(bufferDesc.usage == USAGE.USAGE_DEFAULT) {
        // UpdateData -> writeBuffer or use staging buffer ring
        usage |= GPUBufferUsage.COPY_DST;
    } else if(bufferDesc.usage == USAGE.USAGE_DYNAMIC) {
        // mapAsync
    } else if(bufferDesc.usage == USAGE.USAGE_STAGING) {
        usage |= GPUBufferUsage.COPY_SRC;
    }

    if(bufferDesc.cpu_access_flags & CPU_ACCESS_FLAGS.CPU_ACCESS_READ) {
        usage |= GPUBufferUsage.MAP_READ;
    }
    if(bufferDesc.cpu_access_flags & CPU_ACCESS_FLAGS.CPU_ACCESS_WRITE) {
        usage |= GPUBufferUsage.MAP_WRITE;
    }

    return usage;
}

class BufferGPU extends Buffer {
    constructor(renderDevice, bufferDesc, bufferData) {
        super(renderDevice, bufferDesc);
        this.gpu_buffer = null;

        if(bufferDesc.usage == USAGE.USAGE_STATIC && !bufferData.data) {
            throw 'Static buffer must be initialized with data at creation time';
        }
        if(bufferData.data && bufferData.size<bufferDesc.size) {
            throw 'data is not null and data size is not consistent with buffer size'
        }
        let dataSize = bufferDesc.size;
        let data = null;
        if(bufferData.data && bufferData.size>=bufferDesc.size) {
            data = bufferData.data;
            dataSize = bufferData.size;
        }

        const device = his.render_device.GetWebGPUDevice();
        const usage = GetBufferUsage(bufferDesc);

        if(data && dataSize) {
            this.gpu_buffer = device.createBuffer({
                size: dataSize,
                mappedAtCreation: true,
                usage,
            });

            let mapping;
            if(bufferData.data instanceof Int8Array) {
                mapping = new Int8Array(this.gpu_buffer.getMappedRange());
            } else if(bufferData.data instanceof Uint8Array) {
                mapping = new Uint8Array(this.gpu_buffer.getMappedRange());
            } else if(bufferData.data instanceof Int16Array) {
                mapping = new Int16Array(this.gpu_buffer.getMappedRange());
            } else if(bufferData.data instanceof Uint16Array) {
                mapping = new Uint16Array(this.gpu_buffer.getMappedRange());
            } else if(bufferData.data instanceof Int32Array) {
                mapping = new Int32Array(this.gpu_buffer.getMappedRange());
            } else if(bufferData.data instanceof Uint32Array) {
                mapping = new Uint32Array(this.gpu_buffer.getMappedRange());
            } else if(bufferData.data instanceof Float32Array) {
                mapping = new Float32Array(this.gpu_buffer.getMappedRange());
            }
            mapping.set(bufferData.data);
        } else {
            this.gpu_buffer = device.createBuffer({
                size: dataSize,
                usage,
            });
        }
    }

    GetNativeHandle() { return this.gpu_buffer; }

    Release() {
        super.Release();
        // this.render_device.OnDestroyBuffer(this);
        this.gpu_buffer.destroy();
    }

    UpdateData(deviceContext, offset, size, data) {
        super.UpdateData(deviceContext, offset, size, data);
        deviceContext.UpdateBufferRegion(this, offset, size, data);
    }

    CopyData(deviceContext, srcBuffer, srcOffset, dstOffset, size) {
        super.CopyData(deviceContext, srcBuffer, srcOffset, dstOffset, size);
        deviceContext.CopyBufferRegion(srcBuffer, srcOffset, this, dstOffset, size);
    }

    Map(deviceContext, mapType, mapFlags) {
        super.Map(deviceContext, mapType, mapFlags);
        let resolve, reject;
        const ret = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        if(mapType == MAP_TYPE.MAP_READ) {
            if(this.gpu_buffer.mapState == 'mapped') {
                resolve(this.gpu_buffer.getMappedRange());
            } else {
                this.gpu_buffer.mapAsync(GPUMapMode.READ)
                    .then(() => resolve(this.gpu_buffer.getMappedRange()));
            }
        } else if(mapType == MAP_TYPE.MAP_WRITE) {
            if(this.gpu_buffer.mapState == 'mapped') {
                resolve(this.gpu_buffer.getMappedRange());
            } else {
                this.gpu_buffer.mapAsync(GPUMapMode.WRITE)
                    .then(() => resolve(this.gpu_buffer.getMappedRange()));
            }
        } else if(mapType == MAP_TYPE.MAP_READ_WRITE) {
            throw 'MAP_READ_WRITE is currently not implement in WebGPU';
        } else {
            throw 'only MAP_READ and MAP_WRITE are currently implemented in WebGPU';
        }
        return ret;
    }

    Unmap(deviceContext, mapType, mapFlags) {
        if(this.gpu_buffer.mapState != 'unmapped') {
            this.gpu_buffer.unmap();
        }
    }

    BufferMemoryBarrier(requiredBarriers, glContextState) {
        // todo: implement
    }

    CreateViewInternal(bufferViewDesc) {
        CorrectBufferViewDesc(bufferViewDesc, this.desc);
        return new BufferViewGPU(this.render_device, bufferViewDesc, this);
    }
}

export {
    BufferGPU,
}
