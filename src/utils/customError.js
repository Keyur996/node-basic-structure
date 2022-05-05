export class CustomError extends Error {

    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'pass';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor)
    }
} 