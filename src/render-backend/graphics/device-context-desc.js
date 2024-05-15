import { TARGET_BUFFER_FLAGS, VALUE_TYPE } from "./graphics-types";

const SET_VERTEX_BUFFERS_FLAGS = {
    // reset the vertex buffers to only the buffers specified in this call
    // all buffers previously bound to the pipeline will be unbound
    SET_VERTEX_BUFFERS_FLAG_RESET: 1,
};

const COMMIT_SHADER_RESOURCES_FLAGS = {
    // If this flag is specified when IDeviceContext::CommitShaderResources() is called,
    // the engine will transition all shader resources to the correct state.
    COMMIT_SHADER_RESOURCES_FLAG_TRANSITION_RESOURCES: 1,

    // The flag is used in debug and development builds to verify
    // that all resources are transitioned to correct states when
    // COMMIT_SHADER_RESOURCES_FLAG_TRANSITION_RESOURCES flag is not set.
    // No resource state validation is performed in release build.
    COMMIT_SHADER_RESOURCES_FLAG_VERIFY_STATES: 2,
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

class RenderPassFlag {
    constructor() {
        // which buffer to clear at the beginning of render pass
        this.clear = TARGET_BUFFER_FLAGS.NONE;
        // when discard, its content is unintializzed
        this.discard_start = TARGET_BUFFER_FLAGS.NONE;
        this.discard_end = TARGET_BUFFER_FLAGS.NONE;
    }
}

class RenderPassAttribs {
    constructor() {
        this.num_render_targets = 0;
        // clear color for clear each attachment, rgba range [0,1]
        this.clear_color = [];
        this.depth_value = 1;
        this.stencil_value = 0;
        this.flags = new RenderPassFlag();
    }
}

class DrawAttribs {
    constructor() {
        // if index buffer will be used to index innput vertices
        this.is_indexed = false;
        // the number of vertics(for non-indexed draw call) or indices(for indexed draw call)
        this.num_vertices_or_indices = 0;
        // location(or index) of the first vertex or index buffer to start reading from
        this.start_vertex_or_index_location = 0;
        // type of element in the index buffer(for indexed draw call)
        // allowed type: UINT8 UINT16 UINT32
        this.index_type = VALUE_TYPE.VT_UNDEFINED;
        // for indexed rendering, a constant which is added to each index before accessing the vertex buffer
        this.base_vertex = 0;
        // when more than 1, instance drawing will be performed
        this.num_instances = 1;
        // location(or index) of the first vertex buffer to start reading from
        this.start_instance_location = 0;
        // if indirect drawing will be performing
        // when true, indirect_draw_attribs must be valid
        this.is_indirect = false;
        // for indirect rendering, offset from the beginning of the buffer to the location of draw command attributes.
        this.indirect_drawargs_offset = 0;
        // indirect draw buffer
        this.indirect_draw_attribs = null;
    }
}

// class DispatchComputeAttribs {
//     constructor() {
//         this.thread_group_count_x = 1;
//         this.thread_group_count_y = 1;
//         this.thread_group_count_z = 1;
//     }
// }

export {
    SET_VERTEX_BUFFERS_FLAGS,
    COMMIT_SHADER_RESOURCES_FLAGS,
    Viewport,
    Rect,
    RenderPassAttribs,
    DrawAttribs,
}
