# x-render
Universal render engine for web platform backed by WebGL and WebGPU 

# How to use
An application is passed to x-render engine to run, this app passed in can contain more than one layer which will be rendered by order in the stack.
```
import run, { Application, RenderApi, API, LogLevels } from 'x-render';

class SandboxApp extends Application {
    async init(options) {
        await super.init(options);
        this.pushLayer(new ExampleLayer()); // Layer is responsible for describing rendering actions
    } 
}

export async function createApp() {
    const canvas = document.getElementById('canvas');
    RenderApi.CURRENT_TYPE = API.WEBGPU;  // WEBGL or WEBGPU
    const app = new SandboxApp({ canvas });  // designate the canvas to render
    await app.init({});
    return app;
}

run(createApp, LogLevels.INFO);  // make engine begin rendering loop
```