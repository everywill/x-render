const COMPARISON_FUNCTION = {
    COMPARISON_FUNC_UNKNOWN: 0,
    // never pass
    COMPARISON_FUNC_NEVER: 1,  // OpenGL: GL_NEVER
    // pass if less than destination data
    COMPARISON_FUNC_LESS: 2,  // OpenGL: GL_LESS
    // pass if equal
    COMPARISON_FUNC_EQUAL: 3,   // OpenGL: GL_EQUAL
    COMPARISON_FUNC_LESS_EQUAL: 4,  // OpenGL: GL_LEQUAL
    COMPARISON_FUNC_GREATER: 5,  // OpenGL: GL_GREATER
    COMPARISON_FUNC_NOT_EQUAL: 6,  // OpenGL: GL_NOTEQUAL
    COMPARISON_FUNC_GREATER_EQUAL: 7, // OpenGL: GL_GEQUAL
    COMPARISON_FUNC_ALWAYS: 8,  // OpenGL: GL_ALWAYS
    COMPARISON_FUNC_NUM_FUNCTIONS: 9
};

const PRIMITIVE_TOPOLOGY = {
    PRIMITIVE_TOPOLOGY_UNDEFINED: 0,
    PRIMITIVE_TOPOLOGY_TRIANGLE_LIST: 1,  // OpenGL: GL_TRIANGLES
    PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP: 2, // OpenGL: GL_TRIANGLE_STRIP
    PRIMITIVE_TOPOLOGY_POINT_LIST: 3,  // OpenGL: GL_POINTS
    PRIMITIVE_TOPOLOGY_LINE_LIST: 4,   // OpenGL: GL_LINES
    PRIMITIVE_TOPOLOGY_LINE_STRIP: 5,  // OpenGL: GL_LINE_STRIP
    // used in GS
    PRIMITIVE_TOPOLOGY_TRIANGLE_LIST_ADJ: 6,  // OpenGL: GL_TRIANGLES_ADJACENCY
    PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP_ADJ: 7,  // OpenGL: GL_TRIANGLE_STRIP_ADJACENCY
    RIMITIVE_TOPOLOGY_LINE_LIST_ADJ: 8,  // OpenGL: GL_LINES_ADJACENCY
    PRIMITIVE_TOPOLOGY_LINE_STRIP_ADJ: 9,  // OpenGL: GL_LINE_STRIP_ADJACENCY
    // 0~31 
    // PRIMITIVE_TOPOLOGY_1_CONTROL_POINT_PATCHLIST:   GL_PATCHES
}; 

const VALUE_TYPE = {
    // Undefined type
    VT_UNDEFINED: 0,
    // Signed 8-bit integer
    VT_INT8: 1,
    // Signed 16-bit integer       
    VT_INT16: 2,     
    // Signed 32-bit integer    
    VT_INT32: 3,
    // Unsigned 8-bit integer
    VT_UINT8: 4,     
    // Unsigned 16-bit integer    
    VT_UINT16: 5,
    // Unsigned 32-bit integer      
    VT_UINT32: 6,
    // Half-precision 16-bit floating point
    VT_FLOAT16: 7,
    // Full-precision 32-bit floating point
    VT_FLOAT32: 8,
    // VT_FLOAT64: 9,       ///< Double-precision 64-bit floating point
    VT_NUM_TYPES: 9     
}

export {
    COMPARISON_FUNCTION,
    PRIMITIVE_TOPOLOGY,
    VALUE_TYPE,
}