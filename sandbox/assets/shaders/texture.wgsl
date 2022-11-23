#type vertex
struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) v_texCoord : vec2<f32>,
}
@group(0) @binding(2) var<uniform> u_ViewProjection: mat4x4<f32>;
@vertex
fn main(
    @location(0) position : vec3<f32>,
    @location(1) texCoord : vec2<f32>,
) -> VertexOutput {
    var output: VertexOutput;
    output.Position = u_ViewProjection * vec4(position, 1.0);
    output.v_texCoord = texCoord;
    return output;
}

#type fragment
@group(0) @binding(0) var surfaceTexture: texture_2d<f32>;
@group(0) @binding(1) var surfaceSampler: sampler;
@fragment
fn main(
    @location(0) v_texCoord : vec2<f32>,
) -> @location(0) vec4<f32> {
    return textureSample(surfaceTexture, surfaceSampler, v_texCoord);
}