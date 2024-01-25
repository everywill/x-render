import { GetValueSize } from "../graphics-accessories/graphics-accessories";
import { MAX_BUFFER_SLOTS } from "../graphics/device-caps";
import { VALUE_TYPE } from "../graphics/graphics-types";

class PipelineState {
    constructor(renderDevice, pipelineStateDesc) {
        this.desc = pipelineStateDesc;
        this.strides = [];
        this.buffer_slots_used = 0;
        for(let i=0; i<MAX_BUFFER_SLOTS; i++) {
            this.strides[i] = 0;
        }

        // calculate relative offset automatically
        let bAutoCalcLayout = true;
        // stride must be defined
        let bDefineAllStride = true;

        for(let elem=0; elem<this.desc.input_layout_desc.layout_elements.length; elem++) {
            const inputElem = this.desc.input_layout_desc.layout_elements[elem];
            bAutoCalcLayout &= inputElem.relative_offset == 0;
            bDefineAllStride &= inputElem.stride != 0
        }

        if(!bDefineAllStride) {
            throw 'stride should not be 0';
        }

        const tightStrides = [];
        for(let elem=0; elem<this.desc.input_layout_desc.layout_elements.length; elem++) {
            const inputElem = this.desc.input_layout_desc.layout_elements[elem];
            if(inputElem.value_type >= VALUE_TYPE.VT_FLOAT16) {
                inputElem.is_normalized = false;
            }
            const bufferSlot = inputElem.buffer_slot;
            if(bufferSlot > this.strides.length) {
                throw 'Buffer slot exceeds the limit';
            }

            this.buffer_slots_used = Math.max(this.buffer_slots_used, bufferSlot+1);
            if(inputElem.relative_offset < tightStrides[bufferSlot]) {
                if(inputElem.relative_offset == 0) {
                    inputElem.relative_offset = tightStrides[bufferSlot];
                } else {
                    throw 'layout element overlapping';
                }
            }

            if(this.strides[bufferSlot] != 0) {
                if(this.strides[bufferSlot] != inputElem.stride) {
                    console.warn('inconsistent strides specified for buffer slot');
                }
                this.strides[bufferSlot] = inputElem.stride;
            }

            tightStrides[bufferSlot] += GetValueSize(inputElem.num_components) * inputElem.num_components;
        }

        for(let elem=0; elem<this.desc.input_layout_desc/layout_elements.length; elem++) {
            const inputElem = this.desc.input_layout_desc.layout_elements[elem];
            const bufferSlot = inputElem.buffer_slot;
            if(this.strides[bufferSlot] < tightStrides[bufferSlot]) {
                throw `stride(${bufferSlot}) explicitly specified is smaller than the total size of elements`;
            }
            if(this.strides[bufferSlot] != inputElem.stride) {
                throw 'inconsistent stride between input elements in the same buffer slot';
            }
        }

        if(this.desc.is_compute_pipeline) {
            const computePipelineDesc = this.desc.compute_pipeline_desc;
            this.program = computePipelineDesc.program;
            if(!this.program || !this.program.GetCS()) {
                throw 'compute shader not provided';
            }
        } else {
            const graphicsPipelineDesc = this.desc.graphics_pipeline_desc;
            this.program = graphicsPipelineDesc.program;
            if(!this.program || this.program.GetCS()) {
                throw 'graphics shader not provided';
            }
        }
    }

    GetDesc() { return this.desc; }

    GetProgram() { return this.program; }

    CreateShaderResourceBinding() { throw 'implementation needed'; }

    GetNumBufferSlotUsed() { return this.buffer_slots_used; }
}

export { 
    PipelineState,
}
