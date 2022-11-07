export const LogLevels = {
    OFF: 0,
    INFO: 1,
    LOG: 2,
    DEBUG: 3,
    WARN: 4,
    ERROR: 5,
};

class Logger {
    constructor(options) {
        this.level = options.level || LogLevels.LOG;
    }

    setLevel(level) {
        this.level = level;
    }

    echo(fnName, message, data) {
        if (this.level <= 0 || this.level > 4) {
            return;
        }
        if (this.level === 2 && ['info'].includes(fnName)) {
            return;
        }
        if (this.level === 3 && ['log', 'info'].includes(fnName)) {
            return;
        }
        if (this.level === 4 && ['log', 'info', 'debug'].includes(fnName)) {
            return;
        }
        if (this.level === 5 && fnName !== 'error') {
            return;
        }
    
        const time = (new Date().toLocaleString());

        let arr = [`\x1b[32m${message}\x1b[39m`, ...data, time];
        if (fnName === 'error' || fnName === 'warn') {
            arr = [message, ...data, time];
        }

        console[fnName].apply(console, arr);
    }

    info(fnName, action, ...data) {
        this._log('info', fnName, action, data);
    }

    log(fnName, action, ...data) {
        this._log('log', fnName, action, data);
    }

    debug(fnName, action, ...data) {
        this._log('debug', fnName, action, data);
    }

    warn(fnName, action, ...data) {
        this._log('warn', fnName, action, data);
    }

    error(fnName, action, ...data) {
        this._log('error', fnName, action, data);
    }
}

const logger = new Logger();

export default logger;