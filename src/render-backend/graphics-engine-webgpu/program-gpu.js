import { Program } from "../graphics-engine/program";

class ProgramGPU extends Program {
    constructor(renderDevice, programDesc) {
        super(renderDevice, programDesc);
    }

    GetVSShaderReflection() {
        if(this.p_vs) {
            return this.p_vs.GetShaderReflection();
        }
    }

    GetPSShaderReflection() {
        if(this.p_ps) {
            return this.p_ps.GetShaderReflection();
        }
    }

    GetGSShaderReflection() {
        if(this.p_gs) {
            return this.p_gs.GetShaderReflection();
        }
    }

    GetHSShaderReflection() {
        if(this.p_hs) {
            return this.p_hs.GetShaderReflection();
        }
    }

    GetDSShaderReflection() {
        if(this.p_ds) {
            return this.p_ds.GetShaderReflection();
        }
    }

    GetCSShaderReflection() {
        if(this.p_cs) {
            return this.p_cs.GetShaderReflection();
        }
    }
}

export {
    ProgramGPU,
}
