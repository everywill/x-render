import { BLEND_FACTOR, CULL_MODE, PipelineStateDesc } from '../../../src/render-backend/graphics/pipelinestate-desc';
import { GraphicsDriver } from '../../../src/render-backend/graphics/graphics-driver';
import { DEVICE_TYPE, DeviceCaps } from '../../../src/render-backend/graphics/device-caps';
import { COMPARISON_FUNCTION, CONTEXT_CREATION_TYPE, PRIMITIVE_TOPOLOGY, TEXTURE_FORMAT, VALUE_TYPE } from '../../../src/render-backend/graphics/graphics-types';
import { LayoutElement } from '../../../src/render-backend/graphics/input-layout';
import { ProgramDesc } from '../../../src/render-backend/graphics/program-desc';
import { SHADER_RESOURCE_VARIABLE_TYPE, SHADER_TYPE, ShaderCreationAttribs } from '../../../src/render-backend/graphics/shader-desc';
import { vShader_source, pShader_source } from './shader_sources';

const deviceCaps = new DeviceCaps();
deviceCaps.dev_type = DEVICE_TYPE.DEVICE_TYPE_OPENGLES;

const driver = GraphicsDriver.Create(deviceCaps, CONTEXT_CREATION_TYPE.CREATE);

const swapchainDesc = driver.GetSwapchainDesc(driver.GetSwapChain());

const psoDesc = new PipelineStateDesc(deviceCaps.reversedz_perspective);
psoDesc.is_compute_pipeline = false;
psoDesc.graphics_pipeline_desc.num_render_targets = 1;
// not used in WebGL
psoDesc.graphics_pipeline_desc.RTV_formats[0] = TEXTURE_FORMAT.TEX_FORMAT_UNKNOWN;

psoDesc.graphics_pipeline_desc.primitive_topology = PRIMITIVE_TOPOLOGY.PRIMITIVE_TOPOLOGY_TRIANGLE_LIST;
psoDesc.graphics_pipeline_desc.rasterizer_state_desc.cull_mode = CULL_MODE.CULL_MODE_NONE;
psoDesc.graphics_pipeline_desc.input_layout_desc.num_elements = 2;
const elem1 = new LayoutElement(0, 0, 3, VALUE_TYPE.VT_FLOAT32);
const elem2 = new LayoutElement(1, 0, 2, VALUE_TYPE.VT_FLOAT32);
elem1.stride = 3 * 4 + 2 * 4;
elem2.stride = 3 * 4 + 2 * 4;
psoDesc.graphics_pipeline_desc.input_layout_desc.layout_elements[0] = elem1;
psoDesc.graphics_pipeline_desc.input_layout_desc.layout_elements[1] = elem2;
psoDesc.graphics_pipeline_desc.input_layout_desc.layout_elements
const blendDesc = psoDesc.graphics_pipeline_desc.blend_state_desc.render_targets[0];
blendDesc.blend_enable = false;
blendDesc.src_blend = BLEND_FACTOR.BLEND_FACTOR_ONE;
blendDesc.src_blend_alpha = BLEND_FACTOR.BLEND_FACTOR_ONE;
blendDesc.dest_blend = BLEND_FACTOR.BLEND_FACTOR_ZERO;
blendDesc.dest_blend_alpha = BLEND_FACTOR.BLEND_FACTOR_ZERO;

psoDesc.graphics_pipeline_desc.DSV_format = swapchainDesc.depth_buffer_format;
psoDesc.graphics_pipeline_desc.depth_stencil_state_desc.depth_enable = true;

const vShaderDesc = new ShaderCreationAttribs();
vShaderDesc.source = vShader_source;
vShaderDesc.shader_desc.shader_type = SHADER_TYPE.SHADER_TYPE_VERTEX;
vShaderDesc.shader_desc.default_variable_type = SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_DYNAMIC;
vShaderDesc.shader_desc.variable_desc = [];
vShaderDesc.shader_desc.static_sampler_desc = [];

const vShader = driver.CreateShader(vShaderDesc);

const pShaderDesc = new ShaderCreationAttribs();
pShaderDesc.source = pShader_source;
pShaderDesc.shader_desc.shader_type = SHADER_TYPE.SHADER_TYPE_PIXEL;
pShaderDesc.shader_desc.default_variable_type = SHADER_RESOURCE_VARIABLE_TYPE.SHADER_RESOURCE_VARIABLE_TYPE_DYNAMIC;
pShaderDesc.shader_desc.variable_desc = [];
pShaderDesc.shader_desc.static_sampler_desc = [];

const pShader = driver.CreateShader(pShaderDesc);

const programDesc = new ProgramDesc({pVS: vShader, pPS: pShader});

const program = driver.CreateProgram(programDesc);

psoDesc.graphics_pipeline_desc.program = program;
psoDesc.graphics_pipeline_desc.depth_stencil_state_desc.stencil_enable = true;
// psoDesc.graphics_pipeline_desc.depth_stencil_state_desc.stencil_read_mask = (0x01 << 5) - 1;
// psoDesc.graphics_pipeline_desc.depth_stencil_state_desc.stencil_write_mask = 
psoDesc.graphics_pipeline_desc.depth_stencil_state_desc.front_face.stencil_func = COMPARISON_FUNCTION.COMPARISON_FUNC_EQUAL;
psoDesc.graphics_pipeline_desc.depth_stencil_state_desc.back_face.stencil_func = COMPARISON_FUNCTION.COMPARISON_FUNC_EQUAL;

const pso = driver.CreatePipelineState(psoDesc);
const srb = driver.CreateShaderResourceBinding(pso);

// for non-slice9 images, only use a rectangle
        //      3---2
        //      |  /|
        //      | / |
        //      |/  |
        //      0---1
        // for slice9 images, use 9 rectangles
        //      4---15--14--13
        //      |  /|  /|  /|
        //      | / | / | / |
        //      |/  |/  |/  |
        //      5---3---2---12
        //      |  /|  /|  /|
        //      | / | / | / |
        //      |/  |/  |/  |
        //      6---0---1---11
        //      |  /|  /|  /|
        //      | / | / | / |
        //      |/  |/  |/  |
        //      7---8---9---10

const uniformBuffer = driver.CreateDefaultVertexBuffer()

const spriteVertex = driver



