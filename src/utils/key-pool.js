class KeyPool {
    constructor(creater) {
        this.pool = [];
        this.key_creater = creater;
    }

    GetKey() {
        if(this.pool.length > 0) {
            return this.pool.pop();
        }
        return this.key_creater();
    }

    ReleaseKey(key) {
        this.pool.push(key);
    }
}

export {
    KeyPool,
}
