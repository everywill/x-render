import { 
    Application,
    RenderApi,
    API,
 } from "../src";
import { ExampleLayer } from "./exampleLayer";

class SandboxApp extends Application {
    async init(options) {
        await super.init(options);
        this.pushLayer(new ExampleLayer());
    } 
}

export async function createApp() {
    const canvas = document.getElementById('canvas');
    RenderApi.CURRENT_TYPE = API.WEBGPU;
    const app = new SandboxApp({ canvas });
    await app.init({});
    return app;
}