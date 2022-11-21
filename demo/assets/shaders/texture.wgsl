#type vertex
struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) v_texCoord : vec2<f32>,
}
@vertex
fn main(
    @location(0) position : vec3<f32>
    @location(1) texCoord: vec2<f32>
) -> VertexOutput {
    var output: VertexOutput;
    output.Position = vec4(position, 1.0);
    output.v_texCoord = texCoord;
    return output;
}

#type fragment
@group(0) binding(0) var surfaceSampler: sampler;
@group(0) binding(1) var surfaceTexture: texture_2d<f32>
@fragment
fn main(
    @location(0) v_texCoord : vec2<f32>,
) -> @location(0) vec4<f32> {
    vec4 color = textureSample(surfaceTexture, surfaceSampler, v_texCoord);
    return color;
}