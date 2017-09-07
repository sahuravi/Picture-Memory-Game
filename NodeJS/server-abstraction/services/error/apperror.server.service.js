'use strict';

const ExtendableError = require('./extendableerror.server.service');

/*
 Usage example in express: next(new ErrorHandler(ErrorHandler.getERROR_CODES().OTHER,'Could not get result',err));
 */

var defaultErrorMessage = 'Something went wrong!';

class AppError extends ExtendableError {

    constructor(message, causedBy) {
        super(`${message || defaultErrorMessage} \n Caused By: ${causedBy || causedBy.stack}`);
    }

}

class BadRequestError extends AppError {

    constructor(message, causedBy) {
        super(message, causedBy);
    }
}

class InternalServerError extends AppError {

    constructor(message, causedBy) {
        super(message,causedBy);
    }
}

module.exports.AppError = AppError;
module.exports.BadRequestError = BadRequestError;
module.exports.InternalServerError = InternalServerError;