"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwtUtils_1 = require("../utils/jwtUtils");
const customError_1 = require("../utils/customError");
const authenticate = (req, res, next) => {
    var _a;
    const token = req.cookies.auth_token ||
        ((_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', ''));
    if (!token) {
        throw new customError_1.CustomError('No token provided.', 403);
    }
    try {
        const decoded = (0, jwtUtils_1.verifyToken)(token);
        req.user = decoded; // Attach user data to the request object
        next(); // Pass control to the next handler
    }
    catch (error) {
        next(error);
    }
};
exports.authenticate = authenticate;
