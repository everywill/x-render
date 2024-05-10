const vShader_source = 
`#version 300 es
layout(std140) uniform type_Uniforms {
    float bDepth3D;
    float holder0;
    float holder1;
    float holder2;
}
Uniforms;
layout(location = 0) in vec3 attr_var_ATTRIB0;
layout(location = 1) in vec2 attr_var_ATTRIB1;
out vec2 attr_var_UV;
void main() {
    vec4 _64;
    if (Uniforms.bDepth3D > 0.5) {
        _64 = vec4(attr_var_ATTRIB0, 1.0);
    }
    else {
        _64 = vec4(attr_var_ATTRIB0.xy, attr_var_ATTRIB0.z, 1.0);
    }
    gl_Position = _64;
    attr_var_UV = attr_var_ATTRIB1;
}`

const pShader_source = 
`#version 300 es
precision mediump float;
precision highp int;
uniform highp sampler2D tex_sprite;
in highp vec2 attr_var_UV;
layout(location = 0) out highp vec4 attr_var_SV_TARGET;
void main() {
    highp vec4 _33 = texture(tex_sprite, attr_var_UV);
    highp float _34 = _33.x;
    highp float _41 = _33.y;
    highp float _48 = _33.z;
    highp vec3 _57 = vec3((_34 <= 0.040449999272823333740234375) ? (_34 * 0.077399380505084991455078125) : pow((_34 + 0.054999999701976776123046875) * 0.947867333889007568359375, 2.400000095367431640625), (_41 <= 0.040449999272823333740234375) ? (_41 * 0.077399380505084991455078125) : pow((_41 + 0.054999999701976776123046875) * 0.947867333889007568359375, 2.400000095367431640625), (_48 <= 0.040449999272823333740234375) ? (_48 * 0.077399380505084991455078125) : pow((_48 + 0.054999999701976776123046875) * 0.947867333889007568359375, 2.400000095367431640625)) * _33.w;
    attr_var_SV_TARGET = vec4(_57.x, _57.y, _57.z, _33.w);
}`

export {
    vShader_source,
    pShader_source,
}
