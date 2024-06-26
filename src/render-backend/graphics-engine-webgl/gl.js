import { COMPARISON_FUNCTION } from "../graphics/graphics-types";
import { BLEND_FACTOR, BLEND_OPERATION, STENCIL_OP } from "../graphics/pipelinestate-desc";
import { GetCurrentContext } from "./gl-context";

// const canvas = document.createElement('canvas');
// const gl = canvas.getContext('webgl2');
// document.body.appendChild(canvas);

function CompareFuncToGLCompare(func) {
    const gl = GetCurrentContext();
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
let GL_STENCIL_OPS_INITED = false;

function StencilOpToGLStencilOp(stencilOp) {
    if(!GL_STENCIL_OPS_INITED) {
        GL_STENCIL_OPS_INITED = true;
        const gl = GetCurrentContext();
        GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_KEEP] = gl.KEEP;
        GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_ZERO] = gl.ZERO;
        GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_REPLACE] = gl.REPLACE;
        GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_INCR_SAT] = gl.INCR;
        GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_DECR_SAT] = gl.DECR;
        GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_INVERT] = gl.INVERT;
        GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_INCR_WRAP] = gl.INCR_WRAP;
        GL_STENCIL_OPS[STENCIL_OP.STENCIL_OP_DECR_WRAP] = gl.DECR_WRAP;
    }
    if(stencilOp>STENCIL_OP.STENCIL_OP_UNDEFINED && stencilOp<STENCIL_OP.STENCIL_OP_NUM_OPS) {
        const gl_stencil_op = GL_STENCIL_OPS[stencilOp];
        return gl_stencil_op;
    } else {
        throw `stencil operation is out of range`;
    }
}


const GL_BLEND = [];
let GL_BLEND_INITED = false;

function BlendFactorToGLBlend(blendFactor) {
    if(!GL_BLEND_INITED) {
        const gl = GetCurrentContext();
        GL_BLEND_INITED = true;
        GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_ZERO] = gl.ZERO;
        GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_ONE] = gl.ONE;
        GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_SRC_COLOR] = gl.SRC_COLOR;
        GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_INV_SRC_COLOR] = gl.ONE_MINUS_SRC_COLOR;
        GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_SRC_ALPHA] = gl.SRC_ALPHA;
        GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_INV_SRC_ALPHA] = gl.ONE_MINUS_SRC_ALPHA;
        GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_DEST_COLOR] = gl.DST_COLOR;
        GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_INV_DEST_COLOR] = gl.ONE_MINUS_DST_COLOR;
        GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_DEST_ALPHA] = gl.DST_ALPHA;
        GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_INV_DEST_ALPHA] = gl.ONE_MINUS_DST_ALPHA;
        GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_SRC_ALPHA_SAT] = gl.SRC_ALPHA_SATURATE;
        GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_BLEND_FACTOR] = gl.CONSTANT_COLOR;
        GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_INV_BLEND_FACTOR] = gl.ONE_MINUS_CONSTANT_COLOR;
        // GL_BLEND[BLEND_FACTOR.BLEND_FACTOR_SRC1_COLOR] = 
    }
    if(blendFactor>BLEND_FACTOR.BLEND_FACTOR_UNDEFINED && blendFactor<BLEND_FACTOR.BLEND_FACTOR_NUM_FACTORS) {
        return GL_BLEND[blendFactor];
    } else {
        throw 'Incorrect blend factor';
    }
}
const GL_BLEND_OP = [];
let GL_BLEND_OP_INITED = false;

function BlendOperation2GLBlendOp(blendOp) {
    if(!GL_BLEND_OP_INITED) {
        const gl = GetCurrentContext();
        GL_BLEND_OP_INITED = true;
        GL_BLEND_OP[BLEND_OPERATION.BLEND_OPERATION_ADD] = gl.FUNC_ADD;
        GL_BLEND_OP[BLEND_OPERATION.BLEND_OPERATION_SUBTRACT] = gl.FUNC_SUBTRACT;
        GL_BLEND_OP[BLEND_OPERATION.BLEND_OPERATION_REV_SUBTRACT] = gl.FUNC_REVERSE_SUBTRACT;
        GL_BLEND_OP[BLEND_OPERATION.BLEND_OPERATION_MIN] = gl.MIN;
        GL_BLEND_OP[BLEND_OPERATION.BLEND_OPERATION_MAX] = gl.MAX;
    }
    if(blendOp>BLEND_OPERATION.BLEND_OPERATION_UNDEFINED && blendOp<BLEND_OPERATION.BLEND_OPERATION_NUM_OPERATIONS) {
        return GL_BLEND_OP[blendOp];
    } else {
        throw 'Incorrect blend operation';
    }
}

// 16MB
// const Memory = new ArrayBuffer(16 * 1024 * 1024);

// const HEAP8 = new Int8Array(Memory);
// const HEAPU8 = new Uint8Array(Memory);
// const HEAP16 = new Int16Array(Memory);
// const HEAPU16 = new Uint16Array(Memory);
// const HEAPF32 = new Float32Array(Memory);

export {
    CompareFuncToGLCompare,
    StencilOpToGLStencilOp,
    BlendFactorToGLBlend,
    BlendOperation2GLBlendOp,
    // HEAP8, HEAPU8, HEAP16, HEAPU16, HEAPF32
}
