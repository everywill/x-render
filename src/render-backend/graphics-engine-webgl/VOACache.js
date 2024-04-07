import { gl } from "./gl";

class StreamAttribs {
    constructor(indexBuffer, stride, offset) {
        this.index_buffer = indexBuffer;
        this.stride = stride;
        this.offset = offset;
    }
    equal(streamAttribs) {
        return this.index_buffer == streamAttribs.index_buffer
                && this.stride == streamAttribs.stride
                && this.offset == streamAttribs.offset;
    }
}

class VAOCacheKey {
    constructor(pipelineState, indexBuffer) {
        this.pso = pipelineState;
        this.index_buffer = indexBuffer;
        this.num_used_slots = 0;
        this.streams = [];
    }

    equal(cacheKey) {
        if(this.pso != cacheKey.pso) {
            return false;
        }
        if(this.index_buffer != cacheKey.index_buffer) {
            return false;
        }
        if(this.num_used_slots != this.num_used_slots) {
            return false;
        }
        for(let i=0; i<this.num_used_slots; i++) {
            if(!this.streams[i].equal(cacheKey.stream[i])) {
                return false;
            }
        }
        return true;
    }
}

class VAOCache {
    constructor() {
        this.empty_vao = gl.createVertexArray();
        this.cache = new Map();
    }

    GetVAO(pipelineState, indexBuffer, vertexStreams, numVertexSteams, glContextState) {
        
    }
}

export {
    VAOCache,
}
