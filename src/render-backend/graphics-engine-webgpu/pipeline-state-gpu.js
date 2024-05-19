import { PipelineState } from "../graphics-engine/pipelinestate";
import { COMPARISON_FUNCTION, PRIMITIVE_TOPOLOGY, VALUE_TYPE } from "../graphics/graphics-types";
import { INPUT_ELEMENT_FREQUENCY } from "../graphics/input-layout";
import { BLEND_FACTOR, BLEND_OPERATION, COLOR_MASK, CULL_MODE } from "../graphics/pipelinestate-desc";
import { ShaderResourceBindingGPU } from "./shader-resource-binding-gpu";
import { FORMAT_GPU_INTERNAL_FORMAT_MAP } from "./texture-gpu";

const FREQUENCY_TO_GPU_STEPMODE = [];
FREQUENCY_TO_GPU_STEPMODE[INPUT_ELEMENT_FREQUENCY.INPUT_ELEMENT_FREQUENCY_PER_VERTEX] = 'vertex';
FREQUENCY_TO_GPU_STEPMODE[INPUT_ELEMENT_FREQUENCY.INPUT_ELEMENT_FREQUENCY_PER_INSTANCE] = 'instance';

const FACTOR_TO_GPU_FACTOR = [];
FACTOR_TO_GPU_FACTOR[BLEND_FACTOR.BLEND_FACTOR_BLEND_FACTOR] = 'constant';
FACTOR_TO_GPU_FACTOR[BLEND_FACTOR.BLEND_FACTOR_INV_BLEND_FACTOR] = 'one-minus-constant';
FACTOR_TO_GPU_FACTOR[BLEND_FACTOR.BLEND_FACTOR_ONE] = 'one';
FACTOR_TO_GPU_FACTOR[BLEND_FACTOR.BLEND_FACTOR_ZERO] = 'zero';
FACTOR_TO_GPU_FACTOR[BLEND_FACTOR.BLEND_FACTOR_SRC_COLOR] = 'src';
FACTOR_TO_GPU_FACTOR[BLEND_FACTOR.BLEND_FACTOR_INV_SRC_COLOR] = 'one-minus-src';
FACTOR_TO_GPU_FACTOR[BLEND_FACTOR.BLEND_FACTOR_SRC_ALPHA] = 'src-alpha';
FACTOR_TO_GPU_FACTOR[BLEND_FACTOR.BLEND_FACTOR_INV_SRC_ALPHA] = 'one-minus-src-alpha';
FACTOR_TO_GPU_FACTOR[BLEND_FACTOR.BLEND_FACTOR_DEST_COLOR] = 'dst';
FACTOR_TO_GPU_FACTOR[BLEND_FACTOR.BLEND_FACTOR_INV_DEST_COLOR] = 'one-minus-dst';
FACTOR_TO_GPU_FACTOR[BLEND_FACTOR.BLEND_FACTOR_DEST_ALPHA] = 'dst-alpha';
FACTOR_TO_GPU_FACTOR[BLEND_FACTOR.BLEND_FACTOR_INV_DEST_ALPHA] = 'one-minus-dst-alpha';
FACTOR_TO_GPU_FACTOR[BLEND_FACTOR.BLEND_FACTOR_SRC_ALPHA_SAT] = 'src-alpha-saturated';

const OPERATION_TO_GPU_OPERATION = [];
OPERATION_TO_GPU_OPERATION[BLEND_OPERATION.BLEND_OPERATION_ADD] = 'add';
OPERATION_TO_GPU_OPERATION[BLEND_OPERATION.BLEND_OPERATION_MAX] = 'max';
OPERATION_TO_GPU_OPERATION[BLEND_OPERATION.BLEND_OPERATION_MIN] = 'min';
OPERATION_TO_GPU_OPERATION[BLEND_OPERATION.BLEND_OPERATION_REV_SUBTRACT] = 'reverse-subtract';
OPERATION_TO_GPU_OPERATION[BLEND_OPERATION.BLEND_OPERATION_SUBTRACT] = 'subtract';

const CULLMODE_TO_GPU_CULLMODE = [];
CULLMODE_TO_GPU_CULLMODE[CULL_MODE.CULL_MODE_NONE] = 'none';
CULLMODE_TO_GPU_CULLMODE[CULL_MODE.CULL_MODE_FRONT] = 'front';
CULLMODE_TO_GPU_CULLMODE[CULL_MODE.CULL_MODE_BACK] = 'back';

const TOPOLOGY_TO_GPU_TOPOLOGY = [];
TOPOLOGY_TO_GPU_TOPOLOGY[PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_TRIANGLE_LIST] = 'triangle-list';
TOPOLOGY_TO_GPU_TOPOLOGY[PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP] = 'triangle-strip';
TOPOLOGY_TO_GPU_TOPOLOGY[PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_POINT_LIST] = 'point-list';
TOPOLOGY_TO_GPU_TOPOLOGY[PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_LINE_LIST] = 'line-list';
TOPOLOGY_TO_GPU_TOPOLOGY[PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_LINE_STRIP] = 'line-strip';

// const COLOR_MASK_TO_WRITE_MASK = [];
// COLOR_MASK_TO_WRITE_MASK[COLOR_MASK.COLOR_MASK_NONE] = 0;
// COLOR_MASK_TO_WRITE_MASK[COLOR_MASK.COLOR_MASK_RED] = GPUFlagsConstant.RED;

function GetAttributeFormat(valueType, isNormalized, numComponents) {
    if(valueType==VALUE_TYPE.VT_UINT8) {
        if(isNormalized) {
            let format = 'unorm8';
            return `${format}x${numComponents}`;
        } else {
            let format = 'uint8';
            return `${format}x${numComponents}`;
        }
    }
    if(valueType==VALUE_TYPE.VT_INT8) {
        if(isNormalized) {
            let format = 'snorm8';
            return `${format}x${numComponents}`;
        } else {
            let format = 'sint8';
            return `${format}x${numComponents}`;
        }
    }
    if(valueType==VALUE_TYPE.VT_UINT16) {
        if(isNormalized) {
            let format = 'unorm16';
            return `${format}x${numComponents}`;
        } else {
            let format = 'uint16';
            return `${format}x${numComponents}`;
        }
    }
    if(valueType==VALUE_TYPE.VT_INT16) {
        if(isNormalized) {
            let format = 'snorm16';
            return `${format}x${numComponents}`;
        } else {
            let format = 'sint16';
            return `${format}x${numComponents}`;
        }
    }
    if(valueType==VALUE_TYPE.VT_UINT32) {
        if(isNormalized) {
            let format = 'unorm32';
            return `${format}x${numComponents}`;
        } else {
            let format = 'uint32';
            return `${format}x${numComponents}`;
        }
    }
    if(valueType==VALUE_TYPE.VT_INT32) {
        if(isNormalized) {
            let format = 'snorm32';
            return `${format}x${numComponents}`;
        } else {
            let format = 'sint32';
            return `${format}x${numComponents}`;
        }
    }
    if(valueType==VALUE_TYPE.VT_FLOAT16) {
        let format = 'float16';
        return `${format}x${numComponents}`;
    }
    if(valueType==VALUE_TYPE.VT_FLOAT32) {
        let format = 'float32';
        return `${format}x${numComponents}`;
    }
}

const DEPTH_COMPARE_TO_GPU_COMPARE =[];
DEPTH_COMPARE_TO_GPU_COMPARE[COMPARISON_FUNCTION.COMPARISON_FUNC_NEVER] = 'never';
DEPTH_COMPARE_TO_GPU_COMPARE[COMPARISON_FUNCTION.COMPARISON_FUNC_LESS] = 'less';
DEPTH_COMPARE_TO_GPU_COMPARE[COMPARISON_FUNCTION.COMPARISON_FUNC_LESS_EQUAL] = 'less-equal';
DEPTH_COMPARE_TO_GPU_COMPARE[COMPARISON_FUNCTION.COMPARISON_FUNC_GREATER] = 'greater';
DEPTH_COMPARE_TO_GPU_COMPARE[COMPARISON_FUNCTION.COMPARISON_FUNC_NOT_EQUAL] = 'not-equal';
DEPTH_COMPARE_TO_GPU_COMPARE[COMPARISON_FUNCTION.COMPARISON_FUNC_GREATER_EQUAL] = 'greater-equal';
DEPTH_COMPARE_TO_GPU_COMPARE[COMPARISON_FUNCTION.COMPARISON_FUNC_ALWAYS] = 'always';

class PipelineStateGPU extends PipelineState {
    constructor(renderDevice, pipelineStateDesc) {
        super(renderDevice, pipelineStateDesc);
        // const deviceCaps = this.render_device.GetDeviceCaps();

        const gpuDevice = this.render_device.GetWebGPUDevice();

        this.gpu_pipeline_desc = {};

        this.gpu_pipeline_desc.layout = gpuDevice.createPipelineLayout({
            bindGroupLayouts: pipelineStateDesc.program.GetBindGroupLayouts(),
        });

        if(pipelineStateDesc.is_compute_pipeline) {
            const pCS = pipelineStateDesc.program.GetCS();
            this.gpu_pipeline_desc.compute = {
                module: pCS.GetNativeHandle(),
                entryPoint: pCS.GetEntry(),
            }

            this.gpu_pipeline = gpuDevice.createComputePipeline(this.gpu_pipeline_desc);
        } else {
            const pVS = pipelineStateDesc.program.GetVS();
            const pPS = pipelineStateDesc.program.GetPS();

            const attributes = [];
            for(let i=0; i<pipelineStateDesc.graphics_pipeline_desc.input_layout_desc.num_elements; i++) {
                const attribute = {};
                const elem = pipelineStateDesc.graphics_pipeline_desc.input_layout_desc.layout_elements[i];
                
                if(i=0) {
                    buffer.arrayStride = elem.stride;
                    buffer.stepMode = FREQUENCY_TO_STEPMODE[elem.frequency];
                }
                
                attribute.shaderLocation = elem.semantic_index;
                attribute.offset = elem.relative_offset;
                attribute.format = GetAttributeFormat(elem.value_type, elem.is_normalized, elem.num_components);

                attributes[i] = attribute;
            }

            this.gpu_pipeline_desc.vertex = {
                module: pVS.GetNativeHandle(),
                entryPoint: pVS.GetEntry(),
                buffers: attributes,
            }

            this.gpu_pipeline_desc.fragment = {
                module: pPS.GetNativeHandle(),
                entryPoint: pPS.GetEntry(),
            }

            const targets = [];
            for(let i=0; i<pipelineStateDesc.graphics_pipeline_desc.num_render_targets; i++) {
                const blendDesc = pipelineStateDesc.graphics_pipeline_desc.blend_state_desc.render_targets[i];

                const target = {};
                target.color = {
                    srcFactor: FACTOR_TO_GPU_FACTOR[blendDesc.src_blend],
                    dstFactor: FACTOR_TO_GPU_FACTOR[blendDesc.dest_blend],
                    operation: OPERATION_TO_GPU_OPERATION[blendDesc.blend_op],
                };
                target.alpha = {
                    srcFactor: FACTOR_TO_GPU_FACTOR[blendDesc.src_blend_alpha],
                    dstFactor: FACTOR_TO_GPU_FACTOR[blendDesc.dest_blend_alpha],
                    operation: OPERATION_TO_GPU_OPERATION[blendDesc.blend_op_alpha],
                };

                // target.writeMask not supported
                target.format = FORMAT_GPU_INTERNAL_FORMAT_MAP[pipelineStateDesc.graphics_pipeline_desc.RTV_formats[i]];

                targets[i] = target;
            }

            const rasterizerStateDesc = pipelineStateDesc.graphics_pipeline_desc.rasterizer_state_desc;
            const depthStencilStateDesc = pipelineStateDesc.graphics_pipeline_desc.depth_stencil_state_desc;

            this.gpu_pipeline_desc.multisample = {
                alphaToCoverageEnabled: pipelineStateDesc.graphics_pipeline_desc.blend_state_desc.alpha_to_coverage_enable,
                count: pipelineStateDesc.graphics_pipeline_desc.sample_desc.count,
                mask: pipelineStateDesc.graphics_pipeline_desc.sample_mask,
            };

            this.gpu_pipeline_desc.primitive = {
                cullMode: CULLMODE_TO_GPU_CULLMODE[rasterizerStateDesc.cull_mode],
                frontFace: rasterizerStateDesc.front_counter_clock_wise ? 'ccw' : 'cw',
                // todo: related with primitive restart
                // stripIndexFormat: 
                topology: TOPOLOGY_TO_GPU_TOPOLOGY[pipelineStateDesc.graphics_pipeline_desc.primitive_topology],
                // todo: related with GPUDevice feature 
                // unclippedDepth:
            };

            this.gpu_pipeline_desc.depthStencil = {
                depthBias: rasterizerStateDesc.depth_bias,
                depthBiasClamp: rasterizerStateDesc.depth_bias_clamp,
                depthBiasSlopeScale: rasterizerStateDesc.slope_scaled_depth_bias,
                depthCompare: DEPTH_COMPARE_TO_GPU_COMPARE[depthStencilStateDesc.depth_func],
                depthWriteEnabled: depthStencilStateDesc.depth_write_enable,
                format: FORMAT_GPU_INTERNAL_FORMAT_MAP[pipelineStateDesc.graphics_pipeline_desc.DSV_format],
                stencilFront: {

                },
                stencilBack: {
                    
                }
            };

            this.gpu_pipeline = gpuDevice.createRenderPipeline(this.gpu_pipeline_desc);
        }
    }

    Release() { }

    CreateShaderResourceBinding() {
        return new ShaderResourceBindingGPU(this);
    }
}

export {
    PipelineStateGPU
}
