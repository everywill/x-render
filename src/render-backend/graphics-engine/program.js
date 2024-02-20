import { SHADER_TYPE } from "../graphics/shader-desc";

class Program {
    constructor(renderDevice, programDesc) {
        this.render_device = renderDevice;
        this.desc = programDesc;
        this.num_shaders = 0;
        this.shaders = [];
        if(this.desc.p_cs) {
            if(this.desc.p_vs || this.desc.p_ps || this.desc.p_gs || this.desc.p_hs || this.desc.p_ds) {
                console.warn('compute shader provided, no other shader will take effect');
            }
            this.p_cs = this.desc.p_cs;
            this.shaders[0] = this.p_cs;
            this.num_shaders = 1;
            if(this.p_cs.GetDesc().shader_type != SHADER_TYPE.SHADER_TYPE_COMPUTE) {
                throw 'not a shader of COMPUTE type';
            }
        } else {
            if(this.desc.p_vs) {
                this.p_vs = this.desc.p_vs;
                this.shaders[this.num_shaders++] = this.p_vs;
                if(this.p_vs.GetDesc().shader_type != SHADER_TYPE.SHADER_TYPE_VERTEX) {
                    throw 'not a shader of VERTEX type';
                }
            }
            if(this.desc.p_ps) {
                this.p_ps = this.desc.p_ps;
                this.shaders[this.num_shaders++] = this.p_ps;
                if(this.p_ps.GetDesc().shader_type != SHADER_TYPE.SHADER_TYPE_PIXEL) {
                    throw 'not a shader of PIXEL type';
                }
            }
            if(this.desc.p_gs) {
                this.p_gs = this.desc.p_gs;
                this.shaders[this.num_shaders++] = this.p_gs;
                if(this.p_gs.GetDesc().shader_type != SHADER_TYPE.SHADER_TYPE_GEOMETRY) {
                    throw 'not a shader of GEOMETRY type';
                }
            }
            if(this.desc.p_hs) {
                this.p_hs = this.desc.p_hs;
                this.shaders[this.num_shaders++] = this.p_hs;
                if(this.p_hs.GetDesc().shader_type != SHADER_TYPE.SHADER_TYPE_HULL) {
                    throw 'not a shader of HULL type';
                }
            }
            if(this.desc.p_ds) {
                this.p_ds = this.desc.p_ds;
                this.shaders[this.num_shaders++] = this.p_ds;
                if(this.p_ds.GetDesc().shader_type != SHADER_TYPE.SHADER_TYPE_DOMAIN) {
                    throw 'not a shader of DOMAIN type';
                }
            }
        }
    }
    GetDesc() { return this.desc; }

    GetShader(index) { return this.shaders[index]; }
    GetVS() { return this.p_vs; }
    GetPS() { return this.p_ps; }
    GetGS() { return this.p_gs; }
    GetHS() { return this.p_hs; }
    GetDS() { return this.p_ds; }
    GetCS() { return this.p_cs; }

    GetVSShaderReflection() { throw 'implementation needed'; }
    GetPSShaderReflection() { throw 'implementation needed'; }
    GetGSShaderReflection() { throw 'implementation needed'; }
    GetHSShaderReflection() { throw 'implementation needed'; }
    GetDSShaderReflection() { throw 'implementation needed'; }
    GetCSShaderReflection() { throw 'implementation needed'; }
}

export {
    Program,
}
