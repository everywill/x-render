import { Context } from "./contextPubic";
import { Renderer } from '../renderer/index';
import { LayerStack } from './layer';

export class Application {
    constructor(options) {
        this.layerStack = new LayerStack();
        Context.Create(options);
    }

    async init(options) {
        await Renderer.Init(options);
    }

    pushLayer(layer) {
        this.layerStack.pushLayer(layer);
    }

    pushOverLayer(layer) {
        this.layerStack.pushOverLayer(layer);
    }

    popLayer(layer) {
        this.layerStack.popLayer(layer);
    }

    popOverLayer(layer) {
        this.layerStack.popOverLayer(layer);
    }

    run() {
        // for test
        for(let layer of this.layerStack.layers) {
            layer.onUpdate(0);
        }
        // requestAnimationFrame(() => {
        //     this.run();
        // })
    }
}
