import { TARGET_BUFFER_FLAGS } from "../graphics/graphics-types";

function TypeToGPUType(valueType) {
    let gpuType;
    switch(valueType) {
        case VALUE_TYPE.VT_UNDEFINED:
            gpuType = undefined;
            break;
        // case VALUE_TYPE.VT_INT8:
        //     gpuType = 'int8';
        //     break;
        // case VALUE_TYPE.VT_UINT8:
        //     gpuType = 'uint8';
        //     break;
        // case VALUE_TYPE.VT_INT16:
        //     gpuType = 'int16';
        //     break;
        case VALUE_TYPE.VT_UINT16:
            gpuType = 'uint16';
            break;
        // case VALUE_TYPE.VT_INT32:
        //     gpuType = 'int32';
        //     break;
        case VALUE_TYPE.VT_UINT32:
            gpuType = 'uint32';
            break;
        // case VALUE_TYPE.VT_FLOAT16:
        //     gpuType = undefined;
        //     break;
        // case VALUE_TYPE.VT_FLOAT32:
        //     gpuType = 'float32';
        //     break;
        default:
            throw 'unexpected value type';
    }
    return gpuType;
}

class CommandEncoder {
    constructor(renderDevice) {
        this.command_encoder = renderDevice.GetWebGPUDevice().createCommandEncoder();
        this.pass_encoder = null;
    }

    BeginRenderPass(numRenderTargets, renderTargets, depthStencil, renderPassAttribs) {
        const { flags, clear_color, depth_value, stencil_value } = renderPassAttribs;

        const colorAttachments = [];
        for(let i=0; i<numRenderTargets; i++) {
            const attachment = {};
            attachment.view = renderTargets[i].GetNativeHandle();
            if((1<<i) & flags.clear) {
                attachment.clearValue = clear_color[i];
                attachment.loadOp = "clear";
            } else {
                attachment.loadOp = "load";
            }
            if((1<<i) & flags.discard_end) {
                attachment.storeOp = "discard";
            } else {
                attachment.storeOp = "store";
            }
            colorAttachments[i] = attachment;
        }

        const depthStencilAttachment = {};
        if(depthStencil) {
            attachment = depthStencilAttachment;
            attachment.view = depthStencil.GetNativeHandle();
            if(TARGET_BUFFER_FLAGS.DEPTH & flags.clear) {
                attachment.depthClearValue = depth_value;
                attachment.depthLoadOp = 'clear';
            } else {
                attachment.depthLoadOp = 'load';
            }
            if(TARGET_BUFFER_FLAGS.DEPTH & flags.discard_end) {
                attachment.depthStoreOp = "discard";
            } else {
                attachment.depthStoreOp = "store";
            }

            if(TARGET_BUFFER_FLAGS.STENCIL & flags.clear) {
                attachment.stencilClearValue  = stencil_value;
                attachment.stencilLoadOp = 'clear';
            } else {
                attachment.stencilLoadOp = 'load';
            }
            if(TARGET_BUFFER_FLAGS.STENCIL & flags.discard_end) {
                attachment.stencilStoreOp  = "discard";
            } else {
                attachment.stencilStoreOp  = "store";
            }
        }

        const renderPassDesc = { colorAttachments, depthStencilAttachment };
        this.pass_encoder = this.command_encoder.beginRenderPass(renderPassDesc);
    }
    
    EndRenderPass() {
        this.pass_encoder.end();
    }

    SetIndexBuffer(indexBuffer, byteOffset) {
        
    }

    CopyBufferToBuffer(srcBuffer, srcOffset, dstBuffer, dstOffset, size) {
        this.command_encoder.copyBufferToBuffer(
            srcBuffer.GetNativeHandle(), srcOffset,
            dstBuffer.GetNativeHandle(), dstOffset,
            size
        );
    }
}

export {
    CommandEncoder,
}
