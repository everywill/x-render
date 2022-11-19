import { 
    Layer, 
    VertexBuffer, BufferLayout, ShaderDataType, IndexBuffer,
    VertexArray,
    ShaderLibrary,
    Texture,
    OrthoCamera,
    Renderer,
    RenderCommand,
    MASKTYPE,
    decodeNetworkImage
} from "../../src";

export class ExampleLayer extends Layer {
    constructor() {
        super('example_layer');
        this.shaderLibrary = new ShaderLibrary();
    } 

    async initResource() {
        const vertexArray = VertexArray.Create();

        const vertices = [
            -0.5, -0.5, 0, 0, 0,
            0.5, -0.5, 0, 1.0, 0,
            0.5, 0.5, 0, 1.0, 1.0,
            -0.5, 0.5, 0, 0, 1.0,
        ];

        this.camera = new OrthoCamera(-2, 2, -1, 1);

        const vertexBuffer = VertexBuffer.Create(vertices);
        const layout = new BufferLayout([
            { type: ShaderDataType.Float3, name: 'a_Position' },
            { type: ShaderDataType.Float2, name: 'a_TexCoord' }
        ]);
        vertexBuffer.setLayout(layout);
        vertexArray.addVertexBuffer(vertexBuffer);

        const indices = [0, 1, 2, 2, 3, 0];
        const indexBuffer = IndexBuffer.Create(indices);
        vertexArray.setIndexBuffer(indexBuffer);
        this.vertexArray = vertexArray;
        
        // await this.shaderLibrary.load('triangle', 'assets/shaders/triangle.glsl');
        // await this.shaderLibrary.load('triangle', 'assets/shaders/triangle.wgsl');
        const image = await decodeNetworkImage('assets/textures/four_part.png');
        const texture = Texture.Create(image.width, image.height);
        texture.setData(image.pixels);
        const shader = await this.shaderLibrary.load('texture', 'assets/shaders/texture.glsl');
        shader.bind();
        const slot = 0;
        texture.bind(slot);
        shader.allocVar('u_Texture');
        shader.allocVar('u_ViewProjection');
        shader.setInt('u_Texture', slot);
    }

    onEvent(ev) {
        // debugger;
    }

    onUpdate(timestep) {
        RenderCommand.SetClearColor({ r: 0.1, g: 0.1, b: 0.1, a: 1.0 });
        RenderCommand.Clear({
            [MASKTYPE.COLOR]: true,
            [MASKTYPE.DEPTH]: false,
            [MASKTYPE.STENCIL]: false,
        });

        Renderer.BeginScene(this.camera);
        Renderer.Submit(this.shaderLibrary.get('texture'), this.vertexArray);
        Renderer.EndScene();
    }
}