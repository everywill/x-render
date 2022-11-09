// Abstraction of Program(vertex and fragment shader)
export class Shader {
    bind() {}
    unbind() {}

    // uniform
    setInt(name, value) {}
    setIntArray(name, value) {}
    setFloat(name, value) {}
    setFloat2(name, value) {}
    setFloat3(name, value) {}
    setFloat4(name, value) {}
    setMat4(name, value) {} 
}
