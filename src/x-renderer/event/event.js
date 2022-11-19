export const EventCategory = {
    NONE: 'NONE',
};

export const EventType = {
    NONE: 'NONE',
};

export class Event {
    constructor() {
        this.handled = false;
        this.type = EventType.NONE;
        this.category = EventCategory.NONE;
    }

    getEventTypeName() {
        return this.type;
    }
};

export class EventDispatcher {
    constructor(ev, type) {
        this.ev = ev;
        this.type = type;
    }
    dispatch(handler) {
        if(this.type === this.ev.getEventTypeName()) {
            this.ev.handled |= handler(this.ev);
        }
    }
}
