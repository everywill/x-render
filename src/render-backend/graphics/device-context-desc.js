const SET_VERTEX_BUFFERS_FLAGS = {
    // reset the vertex buffers to only the buffers specified in this call
    // all buffers previously bound to the pipeline will be unbound
    SET_VERTEX_BUFFERS_FLAG_RESET: 1,
};

class Viewport {
    constructor() {
        this.top_left_x = 0;
        this.top_left_y = 0;
        this.width = 0;
        this.height = 0;
        // range from 0 to 1
        this.min_depth = 0;
        // range from 0 to 1
        this.max_depth = 1;
    }
}

class Rect {
    constructor() {
        this.left = 0;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
    }
}

export {
    SET_VERTEX_BUFFERS_FLAGS,
    Viewport,
    Rect,
}