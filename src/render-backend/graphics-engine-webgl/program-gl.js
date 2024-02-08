import { Program } from "../graphics-engine/program";
import { DEVICE_TYPE } from "../graphics/device-caps";
import { gl } from "./gl";

class ProgramGL extends Program {
    constructor(renderDevice, programDesc) {
        super(renderDevice, programDesc);

        this.gl_program = null;
        this.checked_link_status = false;

        const deviceCaps = this.render_device.GetDeviceCaps();
        if(deviceCaps.dev_type == DEVICE_TYPE.DEVICE_TYPE_UNDEFINED) {
            throw 'device caps is not initialzed';
        }

        this.separable_program_supported = deviceCaps.eparable_program_supported;
        this.shader_binary_supported = deviceCaps.shader_binary_supported;

        if(!this.separable_program_supported) {
            if(!this.shader_binary_supported) {
                this.LinkProgram();
            } else { 
                // not supported in WebGL
            }
        }
    }

    LinkProgram() {
        this.gl_program = gl.createProgram();
        for(let i=0; i<this.num_shaders; i++) {
            const currShader = this.GetShader(i);
            currShader.CompileShader();
            gl.attachShader(this.gl_program, currShader);
        }
        gl.linkProgram(this.gl_program);
    }

    LinkFailed() {
        const info = gl.getProgramInfoLog();
    }

    CheckLinkStateAndReflection() {}

    GetVSShaderReflection() {
        CheckLinkStateAndReflection();
        if(!this.p_vs) {
            return null;
        }
        if(this.separable_program_supported) {
            return this.p_vs.GetShaderReflection();
        }
        // return this.gl_program.GetShaderReflection()
    }

    GetPSShaderReflection() {
        CheckLinkStateAndReflection();
        if(!this.p_ps) {
            return null;
        }
        if(this.separable_program_supported) {
            return this.p_ps.GetShaderReflection();
        }
    }
}

export {
    ProgramGL,
}
