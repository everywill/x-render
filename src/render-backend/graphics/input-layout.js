import { VALUE_TYPE } from "./graphics-types";

const INPUT_ELEMENT_FREQUENCY = {
    INPUT_ELEMENT_FREQUENCY_UNDEFINED: 0,
    // per-vertex data
    INPUT_ELEMENT_FREQUENCY_PER_VERTEX: 1,
    // per-instance data
    INPUT_ELEMENT_FREQUENCY_PER_INSTANCE: 2,
    INPUT_ELEMENT_FREQUENCY_NUM_FREQUENCIES: 3,
};

class LayoutElement {
    constructor(
        semanticIndex=0, bufferSlot=0, numComponents=1, 
        valueType=VALUE_TYPE.VT_FLOAT32, isNormalized=false, 
        relativeOffset=0, stride=0, frequency=INPUT_ELEMENT_FREQUENCY.INPUT_ELEMENT_FREQUENCY_PER_VERTEX,
        instanceDataStepRate=0) 
    {
        // semantic index in shader
        this.semantic_index = semanticIndex;
        // buffer slot index that this element is read from
        this.buffer_slot = bufferSlot;
        // number of components in the element, allowed values are 1, 2, 3 and 4
        this.num_components = numComponents;
        this.value_type = valueType;
        // For signed and unsigned integer value types
        // (VT_INT8, VT_INT16, VT_INT32, VT_UINT8, VT_UINT16, VT_UINT32)
        // indicates if the value should be normalized to [-1,+1] or
        // [0, 1] range respectively. For floating point types
        // (VT_FLOAT16 and VT_FLOAT32), this member is ignored.
        this.is_normalized = isNormalized;
        // relative offset in bytes to the element bits.
        // if this value is set to 0(default value), the offset will be computed automatically
        // by placing the element right after the previous one (tightly)
        this.relative_offset = relativeOffset;
        // bytes between two elements. should not be 0
        this.stride = stride;
        this.frequency = frequency;
        // The number of instances to draw using the same per-instance data before advancing in
        // the buffer by one element. This value must be 0 for an element that contains per-vertex
        // data.
        this.instance_data_step_rate = instanceDataStepRate;
    }
}

class InputLayoutDesc {
    constructor() {
        //  array of LayoutElement
        this.layout_elements = [];
        // number of elements
        this.num_elements = 0;
    }
}

export {
    INPUT_ELEMENT_FREQUENCY,
    LayoutElement,
    InputLayoutDesc,
}
