const INPUT_ELEMENT_FREQUENCY = {
    INPUT_ELEMENT_FREQUENCY_UNDEFINED: 0,
    // per-vertex data
    INPUT_ELEMENT_FREQUENCY_PER_VERTEX: 1,
    // per-instance data
    INPUT_ELEMENT_FREQUENCY_PER_INSTANCE: 2,
    INPUT_ELEMENT_FREQUENCY_NUM_FREQUENCIES: 3,
};

class LayoutElement {
    constructor() {
        // semantic index in shader
        this.semantic_index = 0;
        // buffer slot index that this element is read from
        this.buffer_slot = 0;
    }
}

export {
    INPUT_ELEMENT_FREQUENCY,
}