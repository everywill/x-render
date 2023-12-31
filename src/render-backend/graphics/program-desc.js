class ElementReflection {
    constructor(name, offset) {
        this.name = name;
        this.offset = offset;
    }
    GetElementOffset() { return this.offset; }
    GetElementName() { return this.name; }
}

class CBufferReflection {
    constructor() {
        this.CBuffer_name = '';
        this.CBuffer_size = 0;
        //  array of ElementReflection
        this.elements = []; 
    }
    GetCBufferSize() { return this.CBuffer_size; }
    GetCBufferName() { return this.CBuffer_name; }
    GetElementNum() { return this.elements.length; }
    GetElement(index) { return this.elements[index]; }
}

class ShaderReflection {
    constructor() {
        // array of texture2D reflection
        this.texture2D_ref = [];
        // array of CBuffer reflection
        this.CBuffer_ref = [];
    }
    GetTexture2DNum() { return this.texture2D_ref.length; }
    GetTexture2DName(index) { return this.texture2D_ref[index]; }
    GetCBufferNum() { return this.CBuffer_ref.length; }
    GetCBuffer(index) { return this.CBuffer_ref[index]; }
}

class ProgramDesc {
    constructor() {
        // compute shader
        this.p_cs = null;
        // vertex shader
        this.p_vs = null;
        // pixel shader
        this.p_ps = null;
        // geometry shader
        this.p_gs = null;
        // hull shader
        this.p_hs = null;
        // domain shader
        this.p_ds = null;
    }
}

export {
    ElementReflection, CBufferReflection, ShaderReflection,
    ProgramDesc,
}