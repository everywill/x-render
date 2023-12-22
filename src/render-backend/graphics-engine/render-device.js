class RenderDevice {
    // to allocate space only, provide null bufferData 
    // static buffers (USAGE_STATIC) must be initialized at creation time.                  
    CreateBuffer(bufferDesc, bufferData) {
        throw 'implementation needed';
    }

    CreateTexture(textureDesc, textureData) {
        throw 'implementation needed';
    }
    // createPipelineState(pipelineStateDesc) {}
}