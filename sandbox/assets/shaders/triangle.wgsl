#type vertex
struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) v_Position : vec3<f32>,
};
@group(0) @binding(0) var<uniform> u_ViewProjection: mat4x4<f32>;

@vertex
fn main(
    @location(0) position : vec3<f32>
) -> VertexOutput {
    var output: VertexOutput;
    output.Position = u_ViewProjection * vec4(position, 1.0);
    output.v_Position = position;
    return output;
}

#type fragment
@fragment
fn main(
    @location(0) v_Position : vec3<f32>,
) -> @location(0) vec4<f32> {
    return vec4(v_Position * 0.5 + 0.5, 1.0);
}