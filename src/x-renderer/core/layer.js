export class Layer {
    constructor(name) {
        this.name = name;
    }
    onAttach() {}
    onDetach() {}
    onUpdate(timestep) {}
    onEvent(ev) {}
}

export class LayerStack {
    constructor() {
        this.layers = [];
        this.toInsertIndex = 0;
    }

    pushOverLayer(layer) {
        layer.onAttach();
        this.layers.push(layer);
    }

    popOverLayer(layer) {
        const index = this.layers.indexOf(layer, this.toInsertIndex+1);
        if(index !== -1) {
            layer.onDetach();
            this.layers.splice(index, 1);
        }
    }

    pushLayer(layer) {
        layer.onAttach();
        this.layers.splice(this.toInsertIndex, 0, layer);
        this.toInsertIndex++;
    }

    popLayer(layer) {
        const index = this.layers.indexOf(layer);
        if(index !== -1 && index < this.toInsertIndex) {
            layer.onDetach();
            this.layers.splice(index, 1);
            this.toInsertIndex--;
        }
    }
}