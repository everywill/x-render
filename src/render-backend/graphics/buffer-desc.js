// taken from diligent, used in buffer creation
const BUFFER_MODE = {
    BUFFER_MODE_UNDEFINED: 0,
    BUFFER_MODE_FORMATTED: 1,  // like 1D texture mostly
    BUFFER_MODE_STRUCTURED: 2,
    BUFFER_MODE_RAW_VIEWS: 3,  // almost like formatted, but can be indexed in bytes
    BUFFER_MODE_NUM_MODES: 4,
};

export {
    BUFFER_MODE,
}
