import { OrthoCamera } from "./orthoCamera";
import { EventDispatcher, EventType } from "../event/event";

export class OrthoCameraController {
    constructor(aspectRatio, canRotate) {
        this.zoomLevel = 1;
        this.aspectRatio = aspectRatio;
        this.canRotate = canRotate;
        this.camera = new OrthoCamera(-this.aspectRatio * this.zoomLevel, this.aspectRatio * this.zoomLevel, -this.zoomLevel, this.zoomLevel);
    }

    onEvent(ev) {
        const dispatcher = new EventDispatcher(ev, EventType.MOUSE_WHEEL);
        dispatcher.dispatch(this.onMouseWheel.bind(this));
    }

    onMouseWheel(ev) {
        let offset = 0.25 * (ev.yOffset > 0 ? 1 : -1);
        this.zoomLevel += offset;
        
        this.camera.setProjection(-this.aspectRatio * this.zoomLevel, this.aspectRatio * this.zoomLevel, -this.zoomLevel, this.zoomLevel);
        return false;
    }
}
