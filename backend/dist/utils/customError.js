"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
// custom-error.ts
class CustomError extends Error {
    constructor(message, status) {
        super(message); // Call the parent constructor with the message
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace
    }
}
exports.CustomError = CustomError;
