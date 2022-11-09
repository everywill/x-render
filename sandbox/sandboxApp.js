import { 
    Application,
    RenderApi,
    API,
 } from "../src";
import { ExampleLayer } from "./exampleLayer";

class SandboxApp extends Application {
    constructor(options) {
        super(options);
        this.pushLayer(new ExampleLayer());
    }
}

export function createApp() {
    const canvas = document.getElementById('canvas');
    RenderApi.CURRENT_TYPE = API.WEBGL;
    return new SandboxApp({ canvas });
}