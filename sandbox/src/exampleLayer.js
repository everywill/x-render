import { 
    Layer, 
    VertexBuffer, BufferLayout, ShaderDataType, IndexBuffer,
    VertexArray,
    ShaderLibrary,
    Texture,
    OrthoCameraController,
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

        this.cameraController = new OrthoCameraController(2, false);

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

        // const shader = await this.shaderLibrary.load('texture', 'assets/shaders/texture.glsl');
        const shader = await this.shaderLibrary.load('texture', 'assets/shaders/texture.wgsl');
        
        const image = await decodeNetworkImage('assets/textures/four_part.png');
        // const image = await decodeNetworkImage('assets/textures/xmas.png');

        const texture = Texture.Create('u_Texture', image.width, image.height);
        texture.setData(image.pixels);
        
        shader.bind();
        shader.setTexture(texture);
    }

    onEvent(ev) {
        this.cameraController.onEvent(ev);
    }

    onUpdate(timestep) {
        RenderCommand.SetClearColor({ r: 0.1, g: 0.1, b: 0.1, a: 1.0 });
        RenderCommand.Clear({
            [MASKTYPE.COLOR]: true,
            [MASKTYPE.DEPTH]: false,
            [MASKTYPE.STENCIL]: false,
        });

        Renderer.BeginScene(this.cameraController.camera);
        // Renderer.Submit(this.shaderLibrary.get('triangle'), this.vertexArray);
        Renderer.Submit(this.shaderLibrary.get('texture'), this.vertexArray);
        Renderer.EndScene();
    }
}