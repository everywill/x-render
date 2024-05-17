import { WgslReflect } from "wgsl_reflect/wgsl_reflect.module.js";
import { vShader_source, pShader_source, cShader_source } from './shader_sources';

const vReflect = new WgslReflect(vShader_source);
const pReflect = new WgslReflect(pShader_source);
const cReflect = new WgslReflect(cShader_source);

debugger
