#type vertex
struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) fragPosition : vec3<f32>,
}
@vertex
fn main(
    @location(0) position : vec3<f32>
) -> VertexOutput {
    var output: VertexOutput;
    output.Position = vec4(position, 1.0);
    output.fragPosition = position;
    return output;
}

#type fragment
@fragment
fn main(
    @location(0) fragPosition : vec3<f32>,
) -> @location(0) vec4<f32> {
    return vec4(fragPosition * 0.5 + 0.5, 1.0);
}