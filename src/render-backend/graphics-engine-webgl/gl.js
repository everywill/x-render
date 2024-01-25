import { COMPARISON_FUNCTION } from "../graphics/graphics-types";
import 
    import { STENCIL_OP } from "../graphics/pipelinestate-desc";

const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl2');

function CompareFuncToGLCompare(func) {
    switch(func) {
        case COMPARISON_FUNCTION.COMPARISON_FUNC_NEVER:
            return gl.NEVER;
        case COMPARISON_FUNCTION.COMPARISON_FUNC_LESS:
            return gl.LESS;
        case COMPARISON_FUNCTION.COMPARISON_FUNC_EQUAL:
            return gl.EQUAL;
        case COMPARISON_FUNCTION.COMPARISON_FUNC_LESS_EQUAL:
            return gl.LEQUAL;
        case COMPARISON_FUNCTION.COMPARISON_FUNC_GREATER:
            return gl.GREATER;
        case COMPARISON_FUNCTION.COMPARISON_FUNC_GREATER_EQUAL:
            return gl.GEQUAL;
        case COMPARISON_FUNCTION.COMPARISON_FUNC_NOT_EQUAL:
            return gl.NOTEQUAL;
        case COMPARISON_FUNCTION.COMPARISON_FUNC_ALWAYS:
            return gl.ALWAYS;
        default:
            console.warn('unknown comparison func');
            return gl.ALWAYS;
    }
}

const GL_STENCIL_OPS = [];
GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_KEEP] = gl.KEEP;
GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_ZERO] = gl.ZERO;
GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_REPLACE] = gl.REPLACE;
GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_INCR_SAT] = gl.INCR;
GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_DECR_SAT] = gl.DECR;
GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_INVERT] = gl.INVERT;
GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_INCR_WRAP] = gl.INCR_WRAP;
GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_DECR_WRAP] = gl.DECR_WRAP;

function StencilOpToGLStencilOp(stencilOp) {
    if(stencilOp>STENCIL_OP.STENCIL_OP_UNDEFINED && stencilOp<STENCIL_OP.STENCIL_OP_NUM_OPS) {
        const gl_stencil_op = GL_STENCIL_OPS[stencilOp];
        return gl_stencil_op;
    } else {
        throw `stencil operation is out of range`;
    }
}

export {
    gl,
    CompareFuncToGLCompare,
    StencilOpToGLStencilOp,
}