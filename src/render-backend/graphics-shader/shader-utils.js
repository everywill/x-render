import { WgslReflect } from "wgsl_reflect/wgsl_reflect.module.js";

function GPUShaderReflect(shaderSource) {
    return new WgslReflect(shaderSource);
}

export {
    GPUShaderReflect,
}

