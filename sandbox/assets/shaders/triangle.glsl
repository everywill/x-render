#type vertex
#version 300 es

layout(location = 0) in vec3 a_Position;

out vec3 v_Position;

void main()
{
    v_Position = a_Position;
    gl_Position = vec4(a_Position, 1.0);	
}

#type fragment
#version 300 es

precision highp float;

layout(location = 0) out vec4 color;

in vec3 v_Position;

void main()
{
    color = vec4(v_Position * 0.5 + 0.5, 1.0);
}