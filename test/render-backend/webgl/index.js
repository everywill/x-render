import { BLEND_FACTOR, CULL_MODE, PipelineStateDesc, RenderTargetBlendDesc } from '../../../src/render-backend/graphics/pipelinestate-desc';
import { GraphicsDriver } from '../../../src/render-backend/graphics/graphics-driver';
import { DEVICE_TYPE, DeviceCaps } from '../../../src/render-backend/graphics/device-caps';
import { CONTEXT_CREATION_TYPE, PRIMITIVE_TOPOLOGY, TEXTURE_FORMAT, VALUE_TYPE } from '../../../src/render-backend/graphics/graphics-types';
import { LayoutElement } from '../../../src/render-backend/graphics/input-layout';

const deviceCaps = new DeviceCaps();
deviceCaps.dev_type = DEVICE_TYPE.DEVICE_TYPE_OPENGLES;

const driver = GraphicsDriver.Create(deviceCaps, CONTEXT_CREATION_TYPE.CREATE);

const psoDesc = new PipelineStateDesc(deviceCaps.reversedz_perspective);
psoDesc.is_compute_pipeline = false;
psoDesc.graphics_pipeline_desc.num_render_targets = 1;
// not used in WebGL
psoDesc.graphics_pipeline_desc.RTV_formats[0] = TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN;

psoDesc.graphics_pipeline_desc.primitive_topology = PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_TRIANGLE_LIST;
psoDesc.graphics_pipeline_desc.rasterizer_state_desc.cull_mode = CULL_MODE.CULL_MODE_NONE;
psoDesc.graphics_pipeline_desc.input_layout_desc.num_elements = 2;
psoDesc.graphics_pipeline_desc.input_layout_desc.layout_elements[0] = new LayoutElement(0, 0, 3, VALUE_TYPE.VT_FLOAT32);
psoDesc.graphics_pipeline_desc.input_layout_desc.layout_elements[1] = new LayoutElement(1, 0, 2, VALUE_TYPE.VT_FLOAT32);
const blendDesc = psoDesc.graphics_pipeline_desc.blend_state_desc.render_targets[0];
blendDesc.blend_enable = false;
blendDesc.src_blend = BLEND_FACTOR.BLEND_FACTOR_ONE;
blendDesc.src_blend_alpha = BLEND_FACTOR.BLEND_FACTOR_ONE;
blendDesc.dest_blend = BLEND_FACTOR.BLEND_FACTOR_ZERO;
blendDesc.dest_blend_alpha = BLEND_FACTOR.BLEND_FACTOR_ZERO;

psoDesc.graphics_pipeline_desc.blend_state_desc.render_targets[0] = new RenderTargetBlendDesc();