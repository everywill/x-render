import { Event, EventCategory, EventType } from "./event";

EventCategory.MOUSE_EVENT = 'MOUSE_EVENT';

EventType.MOUSE_WHEEL = 'MOUSE_WHEEL';
export class MouseWheelEvent extends Event {
    constructor(xOffset, yOffset) {
        super();
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.category = EventCategory.MOUSE_EVENT;
        this.type = EventType.MOUSE_WHEEL;
    }
}
