"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.handleResponse = exports.errorMiddleware = void 0;
const customError_1 = require("./customError");
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500; // Type assertion
    res.status(status).json({
        message: err.message || 'Internal Server Error',
        stack: err.stack,
    });
};
exports.errorMiddleware = errorMiddleware;
const handleResponse = (res, statusCode, message, data = {}) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
exports.handleResponse = handleResponse;
const handleError = (error, next) => {
    console.log('ERROR FROM HANDLE ERROR: ', error);
    if (error instanceof Error) {
        console.log('TYPE', error.name);
        return next(error);
    }
    //   return next(new Error(error.message, error.statusCode));
    return next(new customError_1.CustomError(error.message, error.statusCode));
};
exports.handleError = handleError;
