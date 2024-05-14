import { BUFFER_VIEW_TYPE, VALUE_TYPE } from "./graphics-types";

class BufferFormat {
    constructor() {
        this.value_type = VALUE_TYPE.VT_UNDEFINED;
        // for a formatted buffer, allowed values are 1,2,3,4
        this.num_components = 0;
        // For signed and unsigned integer value types
        // (VT_INT8, VT_INT16, VT_INT32, VT_UINT8, VT_UINT16, VT_UINT32)
        // indicates if the value should be normalized to [-1,+1] or
        // [0, 1] range respectively. For floating point types
        // (VT_FLOAT16 and VT_FLOAT32), this member is ignored.
        this.is_normalized = true;
    }
}

class BufferViewDesc {
    constructor() {
        this.view_type = BUFFER_VIEW_TYPE.BUFFER_VIEW_UNDEFINED;
        // Format of the view. This member is only used for formatted and raw buffers.
        // To create raw view of a raw buffer, set Format.ValueType member to VT_UNDEFINED
        this.format = new BufferFormat();
        // Offset in bytes from the beginnig of the buffer to the start of the
        // buffer region referenced by the view
        this.byte_offset = 0;
        // Size in bytes of the referenced buffer region
        this.byte_width = 0;
    }
}

export {
    BufferViewDesc,
}
