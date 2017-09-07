'use strict'

class ExtendableError extends Error {
    constructor(message) {
        super(message);

        // extending Error is weird and does not propagate `message`
        Object.defineProperty(this, 'message', {
            enumerable : false,
            value : message,
            writable : true,
        });

        Object.defineProperty(this, 'name', {
            enumerable : false,
            value : this.constructor.name,
        });

        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
            return;
        }

        Object.defineProperty(this, 'stack', {
            enumerable : false,
            value : (new Error(message)).stack,
        });
    }
}

module.exports = ExtendableError;