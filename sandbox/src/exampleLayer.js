import { 
    Layer, 
    VertexBuffer, BufferLayout, ShaderDataType, IndexBuffer,
    VertexArray,
    Shader, ShaderLibrary,
    Renderer,
    RenderCommand,
    MASKTYPE,
} from "../../src";

export class ExampleLayer extends Layer {
    constructor() {
        super('example_layer');
        this.shaderLibrary = new ShaderLibrary();
    } 

    async initResource() {
        const vertexArray = VertexArray.Create();

        const vertices = [
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            0, 0.5, 0
        ];

        const vertexBuffer = VertexBuffer.Create(vertices);
        const layout = new BufferLayout([
            {type: ShaderDataType.Float3, name: 'a_Position'}
        ]);
        vertexBuffer.setLayout(layout);
        vertexArray.addVertexBuffer(vertexBuffer);

        const indices = [0, 1, 2];
        const indexBuffer = IndexBuffer.Create(indices);
        vertexArray.setIndexBuffer(indexBuffer);
        this.vertexArray = vertexArray;
        await this.shaderLibrary.load('triangle', 'assets/shaders/triangle.glsl');
    }

    onUpdate(timestep) {
        RenderCommand.SetClearColor({ r: 0.1, g: 0.1, b: 0.1, a: 1.0 });
        RenderCommand.Clear({
            [MASKTYPE.COLOR]: true,
            [MASKTYPE.DEPTH]: false,
            [MASKTYPE.STENCIL]: false,
        });

        Renderer.Submit(this.shaderLibrary.get('triangle'), this.vertexArray);
    }
}