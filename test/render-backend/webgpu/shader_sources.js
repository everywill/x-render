const vShader_source = 
`struct type_Uniforms {
    bDepth3D: f32,
    holder0: f32,
    holder1: f32,
    holder2: f32
}

@binding(0) @group(0) var<uniform> Uniforms: type_Uniforms;

struct VertexInput {
    @location(0) attr_var_ATTRIB0: vec3<f32>,
    @location(1) attr_var_ATTRIB1: vec2<f32>
}

struct VertexOutput {
    @builtin(position) Position: vec4<f32>,
    @location(0) attr_var_UV: vec2<f32>
}

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    var _64: vec4<f32>;
    if (Uniforms.bDepth3D > 0.5) {
        _64 = vec4<f32>(input.attr_var_ATTRIB0, 1.0);
    }
    else {
        _64 = vec4<f32>(attr_var_ATTRIB0.xy, attr_var_ATTRIB0.z, 1.0);
    }
    output.Position = _64;
    output.attr_var_UV = input.attr_var_ATTRIB1;

    return output;
}
`;

const pShader_source = 
`@binding(1) @group(1) var<uniform> color: texture_2d<f32>;
@binding(0) @group(1) var<uniform> tex_sprite: sampler;

@fragment
fn fragment(fragData: VertexOutput) -> @location(0) vec4f {
    var _33: vec4<f32> = textureSample(color, tex_sprite, fragData.attr_var_UV);
    var _34: f32 = _33.x;
    var _41: f32 = _33.y;
    var _48: f32 = _33.z;
    var _57: vec3<32> = vec3<f32>((_34 <= 0.040449999272823333740234375) ? (_34 * 0.077399380505084991455078125) : pow((_34 + 0.054999999701976776123046875) * 0.947867333889007568359375, 2.400000095367431640625), (_41 <= 0.040449999272823333740234375) ? (_41 * 0.077399380505084991455078125) : pow((_41 + 0.054999999701976776123046875) * 0.947867333889007568359375, 2.400000095367431640625), (_48 <= 0.040449999272823333740234375) ? (_48 * 0.077399380505084991455078125) : pow((_48 + 0.054999999701976776123046875) * 0.947867333889007568359375, 2.400000095367431640625)) * _33.w;
    return vec4<f32>(_57.x, _57.y, _57.z, _33.w);
}
`;

export {
    vShader_source,
    pShader_source,
}
