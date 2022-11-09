import { 
    Layer, 
    VertexBuffer, BufferLayout, ShaderDataType, IndexBuffer,
    VertexArray,
    Shader,
    Renderer,
    RenderCommand,
    MASKTYPE,
} from "../src";

export class ExampleLayer extends Layer {
    constructor() {
        super('example_layer');
        const vertexArray = VertexArray.Create();

        const vertices = new Float32Array([
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            0, 0.5, 0
        ]);

        const vertexBuffer = VertexBuffer.Create(vertices);
        const layout = new BufferLayout([
            {type: ShaderDataType.Float3, name: 'a_Position'}
        ]);
        vertexBuffer.setLayout(layout);
        vertexArray.addVertexBuffer(vertexBuffer);

        const indices = new Uint16Array([0, 1, 2]);
        const indexBuffer = IndexBuffer.Create(indices);
        vertexArray.setIndexBuffer(indexBuffer);

        const vertexShaderSource = 
            `#version 300 es

            layout(location = 0) in vec3 a_Position;
            
            out vec3 v_Position;

            void main()
			{
				v_Position = a_Position;
				gl_Position = vec4(a_Position, 1.0);	
			}`;

        const fragmentShaderSource = 
            `#version 300 es

            precision highp float;

            layout(location = 0) out vec4 color;
            
            in vec3 v_Position;

            void main()
			{
				color = vec4(v_Position * 0.5 + 0.5, 1.0);
			}`;

        const shader = Shader.Create('VertexPosColor', vertexShaderSource, fragmentShaderSource);

        this.vertexArray = vertexArray;
        this.shader = shader;
    } 

    onUpdate(timestep) {
        RenderCommand.SetClearColor({ r: 0.1, g: 0.1, b: 0.1, a: 1 });
        RenderCommand.Clear({
            [MASKTYPE.COLOR]: true,
            [MASKTYPE.DEPTH]: false,
            [MASKTYPE.STENCIL]: false,
        });

        Renderer.Submit(this.shader, this.vertexArray);
    }
}