class GLProgramVariable {
    constructor(name, size, varType) {
        this.name = name;
        this.resources = [];
        this.scale_uniforms = [];
        this.array_size = size;
        this.var_type = varType;
    }
}

class UniformBufferInfo extends GLProgramVariable {
    constructor(name, size, varType, index) {
        super(name, size, varType);
        this.index = index;
    }
}

class SamplerInfo extends GLProgramVariable {
    constructor() {}
}

class GLProgramResources {
    constructor() {}
}

export {
    GLProgramResources,
}