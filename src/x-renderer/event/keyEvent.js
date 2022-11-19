import { Event, EventType, EventCategory } from "./event";

EventCategory.KEY_EVENT = 'KEY_EVENT';
class KeyEvent extends Event {
    constructor(key) {
        super();
        this.category = EventCategory.KEY_EVENT;
        this.key = key;
    }
}

EventType.KEY_UP = 'KEY_UP';
export class KeyUpEvent extends KeyEvent {
    constructor(key) {
        super(key);
        this.type = EventType.KEY_UP;
    }
}

EventType.KEY_DOWN = 'KEY_DOWN';
export class KeyDownEvent extends KeyEvent {
    constructor(key) {
        super(key);
        this.type = EventType.KEY_DOWN;
    }
}
