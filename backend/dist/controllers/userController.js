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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const userService_1 = require("../services/userService");
const customError_1 = require("../utils/customError");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        // res.status(201).json(user);
        res.status(200).json({ user, message: 'User created successfully.' });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getAllUsersService)();
        // res.status(200).json(users);
        res.status(200).json({ users, message: 'Users retrieved succcessfully' });
    }
    catch (error) {
        next(new customError_1.CustomError('Internal Server Error', 500));
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield (0, userService_1.getUserByEmailService)(userId);
        if (!user) {
            throw new customError_1.CustomError('User not found', 404);
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { username, email, password } = req.body;
        if (!username && !email && !password) {
            throw new customError_1.CustomError('No data to update', 400);
        }
        const updatedUser = yield (0, userService_1.updateUserService)(userId, username, email, password);
        if (!updatedUser) {
            throw new customError_1.CustomError('User not found', 404);
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const result = yield (0, userService_1.deleteUserService)(userId);
        if (!result) {
            throw new customError_1.CustomError('User not found', 404);
        }
        res.status(204).send({ message: 'User successfully deleted.' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
