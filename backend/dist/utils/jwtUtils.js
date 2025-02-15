"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customError_1 = require("./customError");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const generateToken = (id, email, username) => {
    return jsonwebtoken_1.default.sign({ id, email, username }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        throw new customError_1.CustomError('Invalid or expired token', 401);
    }
};
exports.verifyToken = verifyToken;
