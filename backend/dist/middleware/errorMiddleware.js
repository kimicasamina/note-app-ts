"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500; // Type assertion
    res.status(status).json({
        message: err.message || 'Internal Server Error',
        stack: err.stack,
    });
};
exports.errorMiddleware = errorMiddleware;
