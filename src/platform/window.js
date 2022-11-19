import { Global } from '../x-renderer/core/global';
import { KeyUpEvent, KeyDownEvent } from '../x-renderer/event/keyEvent';
import { MouseWheelEvent } from '../x-renderer/event/mouseEvent';

export class GloablWindow extends Global {
    constructor() {
        super();
        this.callbackHandle = () => {};

        window.addEventListener('keyup', (ev) => {
            const keyUpEvent = new KeyUpEvent(ev.key);
            this.callbackHandle(keyUpEvent);
        });

        window.addEventListener('keydown', (ev) => {
            const keyDownEvent = new KeyDownEvent(ev.key);
            this.callbackHandle(keyDownEvent);
        });

        window.addEventListener('wheel', (ev) => {
            const mouseWheelEvent = new MouseWheelEvent(ev.deltaX, ev.deltaY);
            this.callbackHandle(mouseWheelEvent);
        })
    }

    setEventCallback(cb) {
        this.callbackHandle = cb;
    }
}
