import { Context } from "./contextPubic";
import { Renderer } from '../renderer/index';
import { LayerStack } from './layer';
import { Global } from "./globalPublic";

export class Application {
    constructor(options) {
        this.layerStack = new LayerStack();
        this.global = Global.Create();
        this.global.setEventCallback(this.onEvent.bind(this));
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

    onEvent(ev) {
        const length = this.layerStack.layers.length;
        for(let i=length-1; i>=0; i--) {
            this.layerStack.layers[i].onEvent(ev);
        }
    }

    run() {
        // for test
        for(let layer of this.layerStack.layers) {
            layer.onUpdate(0);
        }
        requestAnimationFrame(() => {
            this.run();
        })
    }
}
