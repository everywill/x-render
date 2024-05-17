import { Shader } from "../graphics-engine/shader";
import { SHADER_TYPE } from "../graphics/shader-desc";
import { GetCurrentContext } from "./gl-context";

function GetGLShaderType(shaderType) {
    const gl = GetCurrentContext();
    switch(shaderType) {
        case SHADER_TYPE.SHADER_TYPE_VERTEX:
            return gl.VERTEX_SHADER;
        case SHADER_TYPE.SHADER_TYPE_PIXEL:
            return gl.FRAGMENT_SHADER;
        default:
            throw 'shader type not supported';
    }
}

class ShaderGL extends Shader {
    constructor(renderDevice, shaderCreationAttribs) {
        super(renderDevice, shaderCreationAttribs.shader_desc);

        this.gl_program = null;  // for separable program
        this.gl_shader = null;
        this.gl_source = shaderCreationAttribs.source;
        this.is_shader_compiled = false;
        this.has_checked_compiled_status = false;
    }

    Release() {
        const gl = GetCurrentContext();
        if(this.gl_program) {
            gl.deleteProgram(this.gl_program);
        }
        if(this.gl_shader) {
            gl.deleteShader(this.gl_shader);
        }
    }

    CompileShader() {
        if(!this.is_shader_compiled) {
            this.is_shader_compiled = true;

            const gl = GetCurrentContext();

            const glShaderType = GetGLShaderType(this.desc.shader_type);
            const shader = gl.createShader(glShaderType);
            gl.shaderSource(shader, this.gl_source);

            gl.compileShader(shader);

            const message = gl.getShaderInfoLog(shader);

            if (message.length > 0) {
            /* message may be an error or a warning */
                throw message;
            }

            const deviceCaps = this.render_device.GetDeviceCaps();
            if(deviceCaps.shader_binary_supported) {
                // not supported in WebGL
                // this.gl_program = gl.createProgram();
                // set program to be separable
                // gl.attachShader(this.gl_program, shader);
                // gl.linkProgram(this.gl_program);
                // const isLinked = gl.getProgramParameter(this.gl_program, gl.LINK_STATUS);
                // if(!isLinked) {
                //     const info = gl.getProgramInfoLog(this.gl_program);
                //     console.error('failed to link shader program');
                //     console.error(info);
                // }
                // gl.detachShader(this.gl_program, shader);
                // gl.deleteShader(shader);
            } else {
                this.gl_shader = shader;
            }

            if(deviceCaps.shader_binary_supported) {
                // not supported in WebGL
            }
        }
    }

    CheckCompileStateAndReflection() {
        if(this.has_checked_compiled_status || !this.gl_shader) {
            return;
        }
        const gl = GetCurrentContext();
        this.has_checked_compiled_status = true;

        const compiled = gl.getShaderParameter(this.gl_shader, gl.COMPILE_STATUS);
        
        if(!compiled) {
            console.error('Failed to compile shader file:');
            const info = gl.getShaderInfoLog(this.gl_shader);
            console.error(info);
        }
    }

    GetShaderVariable(name) {
        if(!this.gl_program) {
            throw 'shader variable queries are currently supported for separable programs only'
        }
    } 
}

export {
    ShaderGL,
}
