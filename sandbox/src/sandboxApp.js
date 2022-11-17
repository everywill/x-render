import { 
    Application,
    RenderApi,
    API,
 } from "../../src";
import { ExampleLayer } from "./exampleLayer";

class SandboxApp extends Application {
    async init(options) {
        await super.init(options);
        const exampleLayer = new ExampleLayer();
        await exampleLayer.initResource()
        this.pushLayer(exampleLayer);
    } 
}

export async function createApp() {
    const canvas = document.getElementById('canvas');
    RenderApi.CURRENT_TYPE = API.WEBGL;
    const app = new SandboxApp({ canvas });
    await app.init({});
    return app;
}