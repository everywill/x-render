import { DEVICE_TYPE } from "../graphics/device-caps"
import { gl } from "./gl";

class AppGLState {
    constructor(renderDevice) {
        this.is_OpenGLES = renderDevice.GetDeviceCaps().dev_type == DEVICE_TYPE.DEVICE_TYPE_OPENGLES;
        this.unpack_row_length = 0;
        this.draw_fbo = null;
        this.read_fbo = null;
        this.vao = null;
        this.vbo = null;
        this.context_ubo = null;
        this.bind_points_ubo = []; 
        this.MAX_UBO_BINDING_NUM = 24;
        this.active_texture = null;
        this.texture_binding_2D = null;
        this.texture_binding_2D_array = null;
        this.program = null;
        this.viewport = null;
        this.polygon_offset_factor = null;
        this.polygon_offset_units = null;
        this.depth_mask = false;
        this.depth_func = null;
        this.cull_face = null;
        this.cull_face_mode = null;
        this.front_face = null;
        this.scissor_test = null;
        this.depth_test = false;
        this.stencil_test = false;
        this.sample_coverage = null;
        this.sample_alpha_to_coverage = null;
        this.blend = null;
        this.blend_src_rgb = null;
        this.blend_src_alpha = null;
        this.blend_dst_rgb = null;
        this.blend_dst_alpha = null;
        this.blend_equation_rgb = null;
        this.blend_equation_alpha = null;
        this.blend_color = null;
        this.color_write_mask = null;
        this.clear_color = null;
        this.MAX_SAMPLER_TEXTURE_NUM = 8;
        this.bind_sampler = [];
        this.bind_texture_2D = [];
    }

    Save() {
        this.unpack_row_length = gl.getParameter(gl.UNPACK_ROW_LENGTH);
        this.draw_fbo = gl.getParameter(gl.DRAW_FRAMEBUFFER_BINDING);
        this.read_fbo = gl.getParameter(gl.READ_FRAMEBUFFER_BINDING);
        this.vao = gl.getParameter(gl.VERTEX_ARRAY_BINDING);
        this.vbo = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
        this.context_ubo = gl.getParameter(gl.UNIFORM_BUFFER_BINDING)
        if(this.is_OpenGLES) {
            this.bind_points_ubo[0] = this.context_ubo;
        }
        this.active_texture = gl.getParameter(gl.ACTIVE_TEXTURE);
        this.texture_binding_2D = gl.getParameter(gl.TEXTURE_BINDING_2D);
        this.texture_binding_2D_array = gl.getParameter(gl.TEXTURE_BINDING_2D_ARRAY);
        this.program = gl.getParameter(gl.CURRENT_PROGRAM);
        this.viewport = gl.getParameter(gl.VIEWPORT);
        this.polygon_offset_factor = gl.getParameter(gl.POLYGON_OFFSET_FACTOR);
        this.polygon_offset_units = gl.getParameter(gl.POLYGON_OFFSET_UNITS);
        this.depth_mask = gl.getParameter(gl.DEPTH_WRITEMASK);
        this.depth_func = gl.getParameter(gl.DEPTH_FUNC);
        this.cull_face = gl.getParameter(gl.CULL_FACE);
        this.cull_face_mode = gl.getParameter(gl.CULL_FACE_MODE);
        this.front_face = gl.getParameter(gl.FRONT_FACE);
        this.scissor_test = gl.getParameter(gl.SCISSOR_TEST);
        this.depth_test = gl.getParameter(gl.DEPTH_TEST);
        this.stencil_test = gl.getParameter(gl.STENCIL_TEST);
        this.sample_coverage = gl.getParameter(gl.SAMPLE_COVERAGE);
        this.sample_alpha_to_coverage = gl.getParameter(gl.SAMPLE_ALPHA_TO_COVERAGE);
        this.blend = gl.getParameter(gl.BLEND);
        this.blend_src_rgb = gl.getParameter(gl.BLEND_SRC_RGB);
        this.blend_src_alpha = gl.getParameter(gl.BLEND_SRC_ALPHA);
        this.blend_dst_rgb = gl.getParameter(gl.BLEND_DST_RGB);
        this.blend_dst_alpha = gl.getParameter(gl.BLEND_DST_ALPHA);
        this.blend_equation_rgb = gl.getParameter(gl.BLEND_EQUATION_RGB);
        this.blend_equation_alpha = gl.getParameter(gl.BLEND_EQUATION_ALPHA);
        this.blend_color = gl.getParameter(gl.BLEND_COLOR);
        this.color_write_mask = gl.getParameter(gl.COLOR_WRITEMASK);
        this.clear_color = gl.getParameter(gl.COLOR_CLEAR_VALUE);
        for(let i=0; i<this.MAX_SAMPLER_TEXTURE_NUM; i++) {
            gl.activeTexture(gl.TEXTURE0+i);
            this.bind_sampler[i] = gl.getParameter(gl.SAMPLER_BINDING);
            this.bind_texture_2D[i] = gl.getParameter(gl.TEXTURE_BINDING_2D);
        }
        gl.activeTexture(this.active_texture);
    }

    Restore() {
        for(let i=0; i<this.MAX_SAMPLER_TEXTURE_NUM; i++) {
            gl.activeTexture(gl.TEXTURE0+i);
            gl.bindSampler(i, this.bind_sampler[i]);
            gl.bindTexture(gl.TEXTURE_2D, this.bind_texture_2D[i]);
        }
        gl.pixelStorei(gl.UNPACK_ROW_LENGTH, this.unpack_row_length);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.draw_fbo);
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.read_fbo);
        gl.bindVertexArray(this.vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bindBuffer(gl.UNIFORM_BUFFER, this.context_ubo);
        for(let i=0; i<this.MAX_UBO_BINDING_NUM; i++) {
            gl.bindBufferBase(gl.UNIFORM_BUFFER, i, this.bind_points_ubo[i]);
        }
        gl.activeTexture(this.active_texture);
        gl.bindTexture(gl.TEXTURE_2D, this.texture_binding_2D);
        gl.bindTexture(gl.TEXTURE_BINDING_2D_ARRAY, this.texture_binding_2D_array);
        gl.useProgram(this.program);
        gl.viewport(this.viewport[0], this.viewport[1], this.viewport[2], this.viewport[3])
        gl.polygonOffset(this.polygon_offset_factor, this.polygon_offset_units);
        this.EnableState(this.cull_face, gl.CULL_FACE);
        gl.cullFace(this.cull_face_mode);
        gl.frontFace(this.front_face);
        this.EnableState(this.scissor_test, gl.SCISSOR_TEST);
        this.EnableState(this.depth_test, gl.DEPTH_TEST);
        this.EnableState(this.stencil_test, gl.STENCIL_TEST);
        this.EnableState(this.sample_coverage, gl.SAMPLE_COVERAGE);
        this.EnableState(this.sample_alpha_to_coverage, gl.SAMPLE_ALPHA_TO_COVERAGE);
        gl.depthMask(this.depth_mask);
        gl.depthFunc(this.depth_func);
        gl.blendFuncSeparate(this.blend_src_rgb, this.blend_dst_rgb, this.blend_src_alpha, this.blend_dst_alpha);
        gl.blendEquationSeparate(this.blend_equation_rgb, this.blend_equation_alpha);
        gl.blendColor(this.blend_color[0], this.blend_color[1], this.blend_color[2], this.blend_color[3]);
        gl.colorMask(this.color_write_mask[0], this.color_write_mask[1], this.color_write_mask[2], this.color_write_mask[3]);
        gl.clearColor(this.clear_color[0], this.clear_color[1], this.clear_color[2], this.clear_color[3])
    }

    EnableState(isEnable, cap) {
        if(isEnable) {
            gl.enable(cap);
        } else {
            gl.disable(cap);
        }
    }
}

export {
    AppGLState,
}