import { Program } from "../graphics-engine/program";
import { DEVICE_TYPE } from "../graphics/device-caps";
import { SHADER_RESOURCE_VARIABLE_TYPE } from "../graphics/shader-desc";
import { GLProgram } from "./gl-program";
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
        this.gl_program = new GLProgram();
        for(let i=0; i<this.num_shaders; i++) {
            const currShader = this.GetShader(i);
            currShader.CompileShader();
            gl.attachShader(this.gl_program.native_handle, currShader);
        }
        gl.linkProgram(this.gl_program.native_handle);
    }

    LinkFailed() {
        const info = gl.getProgramInfoLog();
        console.error('failed to link program');
        console.error(info);
        this.gl_program.Release();
    }

    CheckLinkStateAndReflection() {
        if(!this.checked_link_status) {
            this.checked_link_status = true;

            for(let i=0; i<this.num_shaders; i++) {
                const currShader = this.shaders[i];
                currShader.CheckCompileStateAndReflection();
            }

            const isLinked = gl.getProgramParameter(this.gl_program.native_handle, gl.LINK_STATUS);

            if(!isLinked) {
                this.LinkFailed();
                return;
            }

            // not supported in WebGL
            // if(this.shader_binary_supported) { } 

            // reflection
            const mergedVarTypesArray = [];
            const mergedStaticSamplersArray = [];
            let defaultVarType = SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_STATIC;

            for(let i=0; i<this.num_shaders; i++) {
                const currShader = this.GetShader(i);
                const shaderDesc = currShader.GetDesc();
                if(i == 0) {
                    // for compute shader 
                    defaultVarType = shaderDesc.default_variable_type;
                    for(let v=0; v<shaderDesc.variable_desc.length; v++) {
                        mergedVarTypesArray.push(shaderDesc.variable_desc[v]);
                    }
                    for(let s=0; s<shaderDesc.static_sampler_desc.length; s++) {
                        mergedStaticSamplersArray.push(shaderDesc.static_sampler_desc[s]);
                    }
                    
                } else {
                    if(defaultVarType != shaderDesc.default_variable_type) {
                        console.error('inconsistent default variable types for shaders in one program');
                    }
                }
            }
        }
    }

    GetVSShaderReflection() {
        CheckLinkStateAndReflection();
        if(!this.p_vs) {
            return null;
        }
        if(this.separable_program_supported) {
            return this.p_vs.GetShaderReflection();
        }
        return this.gl_program.GetShaderReflection()
    }

    GetPSShaderReflection() {
        CheckLinkStateAndReflection();
        if(!this.p_ps) {
            return null;
        }
        if(this.separable_program_supported) {
            return this.p_ps.GetShaderReflection();
        }
        return this.gl_program.GetShaderReflection();
    }

    GetGSShaderReflection() {
        CheckLinkStateAndReflection();
        if(!this.p_gs) {
            return null;
        }
        if(this.separable_program_supported) {
            return this.p_gs.GetShaderReflection();
        }
        return this.gl_program.GetShaderReflection();
    }

    GetHSShaderReflection() {
        CheckLinkStateAndReflection();
        if(!this.p_hs) {
            return null;
        }
        if(this.separable_program_supported) {
            return this.p_hs.GetShaderReflection();
        }
        return this.gl_program.GetShaderReflection();
    }

    GetDSShaderReflection() {
        CheckLinkStateAndReflection();
        if(!this.p_ds) {
            return null;
        }
        if(this.separable_program_supported) {
            return this.p_ds.GetShaderReflection();
        }
        return this.gl_program.GetShaderReflection();
    }

    GetCSShaderReflection() {
        CheckLinkStateAndReflection();
        if(!this.p_cs) {
            return null;
        }
        if(this.separable_program_supported) {
            return this.p_cs.GetShaderReflection();
        }
        return this.gl_program.GetShaderReflection();
    }
}

export {
    ProgramGL,
}
