const GRAPHICS_HANDLE_TYPE = {
    UNDEFINED: 0,
    BUFFER: 1,
    BUFFER_VIEW: 2,
    COMMAND_LIST: 3,
    PIPELINE_STATE: 4,
    PROGRAM: 5,
    SAMPLER: 6,
    SHADER: 7,
    SHADER_RESOURCE_BINDING: 8,
    SWAPCHAIN: 9,
    TEXTURE: 10,
    TEXTURE_VIEW: 11,
};

// class GraphicsHandle {
//     constructor() {
//         this.type = GRAPHICS_HANDLE_TYPE.UNDEFINED;
//         this.value = nullptr;
//     }
// }

export {
    GRAPHICS_HANDLE_TYPE,
    // GraphicsHandle,
}