export const ShaderDataType = {
    Float: 'Float',
    Float2: 'Float2',
    Float3: 'Float3',
    Float4: 'Float4',
    Mat3: 'Mat3',
    Mat4: 'Mat4',
    Int: 'Int',
    Int2: 'Int2',
    Int3: 'Int3',
    int4: 'Int4',
};

export const ShaderDataTypeSize = {
    Float: 4,
    Float2: 4*2,
    Float3: 4*3,
    Float4: 4*4,
    Mat3: 4*3*3,
    Mat4: 4*4*4,
    Int: 4,
    Int2: 4*2,
    Int3: 4*3,
    Int4: 4*4,
};

export const ShaderDataTypeCompCount = {
    Float: 1,
    Float2: 2,
    Float3: 3,
    Float4: 4,
    Mat3: 3,  // 3 x Float3
    Mat4: 4, // 4 x Float4
    Int: 1,
    Int2: 2,
    Int3: 3,
    Int4: 4,
};

class BufferElement {
    constructor(type, name, normalized) {
        this.name = name;
        this.type = type;
        this.size = ShaderDataTypeSize[type];
        this.offset = 0; // temporary value
        this.normalized = normalized;
    }

    getComponentCount() {
        return ShaderDataTypeCompCount[this.type];
    }
}

export class BufferLayout {
    get length() {
        return this.elements.length;
    }
    constructor(list) {
        this.elements = [];
        for(let item of list) {
            const { type, name, normalized = false } = item;
            const el = new BufferElement(type, name, normalized);
            this.elements.push(el);
        }
        this.stride = 0;
        this.calculateOffsetAndStride();
    }

    [Symbol.iterator]() {
        return this.elements.values();
    }

    calculateOffsetAndStride() {
        let offset = 0;
        for(let el of this.elements) {
            el.offset = offset;
            offset += el.size;
            this.stride += el.size;
        }
    }
} 

// Abstraction of Vertex Resource
export class VertexBuffer {
    bind() {}
    unbind() {}
    setData(data, size) {}
    getLayout() {}
    setLayout(layout) {}
}

export class IndexBuffer {
    bind() {}
    unbind() {}
    getCount() {}
}
