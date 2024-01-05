import { BIND_FLAGS, CPU_ACCESS_FLAGS, USAGE, VALUE_TYPE } from "./graphics-types";

// used in buffer creation
const BUFFER_MODE = {
    BUFFER_MODE_UNDEFINED: 0,
    BUFFER_MODE_FORMATTED: 1,  // like 1D texture mostly
    BUFFER_MODE_STRUCTURED: 2,
    BUFFER_MODE_RAW_VIEWS: 3,  // almost like formatted, but can be indexed in bytes
    BUFFER_MODE_NUM_MODES: 4,
};

class BufferDesc {
    constructor() {
        // size in bytes, for a uniform buffer, this must be a multiple of 16
        this.size = 0;
        // The following bind flags are allowed:
        // Diligent::BIND_VERTEX_BUFFER, Diligent::BIND_INDEX_BUFFER, Diligent::BIND_UNIFORM_BUFFER,
        // Diligent::BIND_SHADER_RESOURCE, Diligent::BIND_STREAM_OUTPUT, Diligent::BIND_UNORDERED_ACCESS,
        // Diligent::BIND_INDIRECT_DRAW_ARGS
        this.bind_flags = BIND_FLAGS.BIND_NONE;
        this.usage = USAGE.USAGE_DEFAULT;
        this.cpu_access_flags = CPU_ACCESS_FLAGS.CPU_ACCESS_NONE;
        this.mode = BUFFER_MODE.BUFFER_MODE_UNDEFINED;
        // for a formatted buffer
        // this.buffer_format = new BufferFormat();
        // Buffer element stride, in bytes. For a structured buffer (BufferDesc::Mode
        // equals Cubic::BUFFER_MODE_STRUCTURED), this member cannot be zero. For a formatted buffer
        // (BufferDesc::Mode equals Cubic::BUFFER_MODE_FORMATTED), this member can either specify the stride, or
        // be 0. In the latter case, the stride is computed automatically based
        // on the format size and assuming that elements are densely packed.
        this.element_stride = 0;
    }
}

class BufferData {
    constructor() {
        this.data = null;
        this.size = 0;
    }
}

export {
    BUFFER_MODE,
    BufferDesc,
    BufferData,
}
