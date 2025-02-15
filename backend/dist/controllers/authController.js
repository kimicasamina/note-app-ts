"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = exports.logout = exports.login = exports.register = void 0;
const jwtUtils_1 = require("../utils/jwtUtils");
const userService_1 = require("../services/userService");
const customError_1 = require("../utils/customError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new customError_1.CustomError('Missing required fields: username, email, or password', 400);
        }
        const existingUser = yield (0, userService_1.getUserByEmailService)(email);
        if (existingUser) {
            throw new customError_1.CustomError('User already exists.', 401);
        }
        const user = yield (0, userService_1.createUserService)(username, email, password);
        // Generate JWT token and set it in a cookie
        const token = (0, jwtUtils_1.generateToken)(user.id, user.email, user.username);
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            // maxAge: 60 * 60 * 24 * 7 * 1000, // 1 week
        });
        res.status(200).json({
            user: { email: user.email, username: user.username, id: user.id },
            message: 'User registered successfully.',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new customError_1.CustomError('Email and password are required.', 400);
        }
        const user = yield (0, userService_1.getUserByEmailService)(email);
        if (!user) {
            throw new customError_1.CustomError('Invalid email or password.', 401);
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new customError_1.CustomError('Invalid email or password.', 401);
        }
        // Generate JWT token and set it in a cookie
        const token = (0, jwtUtils_1.generateToken)(user.id, user.email, user.username);
        // Set token in HTTP-only cookie
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res
            .status(200)
            .json({
            user: { id: user.id, username: user.username, email: user.email },
            message: 'Logged in successfully.',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('auth_token');
        res.status(200).json({ message: 'Logged out successfully.' });
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
const getUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw new customError_1.CustomError('User not authenticated', 401);
        }
        const userId = req.user.id; // Safely access user data
        const user = yield (0, userService_1.getUserByIdService)(userId);
        if (!user) {
            throw new customError_1.CustomError('User not found', 404);
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserDetails = getUserDetails;
