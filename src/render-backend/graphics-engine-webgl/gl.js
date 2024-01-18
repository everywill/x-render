import { COMPARISON_FUNCTION } from "../graphics/graphics-types";

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

export {
    gl,
    CompareFuncToGLCompare,
}