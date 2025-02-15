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
exports.deleteUserService = exports.updateUserService = exports.getUserByIdService = exports.getUserByEmailService = exports.getAllUsersService = exports.createUserService = void 0;
const models_1 = require("../models");
const customError_1 = require("../utils/customError");
const createUserService = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.create({ username, email, password });
        return user;
    }
    catch (error) {
        throw new customError_1.CustomError('Failed to create user', 500);
    }
});
exports.createUserService = createUserService;
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.findAll();
        return users;
    }
    catch (error) {
        throw new customError_1.CustomError('Failed to retrieve users', 500);
    }
});
exports.getAllUsersService = getAllUsersService;
const getUserByEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findOne({ where: { email } });
        return user;
    }
    catch (error) {
        throw new customError_1.CustomError('Failed to retrieve user', 500);
    }
});
exports.getUserByEmailService = getUserByEmailService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Attempt to find the user by ID with associated notes and categories
        const user = yield models_1.User.findOne({
            where: { id },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'], // Exclude these fields from the user model
            },
            include: [
                {
                    model: models_1.Note,
                    as: 'notes',
                    include: [
                        {
                            model: models_1.Category,
                            as: 'category', // Include category for each note
                        },
                    ],
                },
                {
                    model: models_1.Category,
                    as: 'categories', // Include user's associated categories
                    // include: [
                    //   {
                    //     model: Note,
                    //     as: 'notes', // Include category for each note
                    //   },
                    // ],
                },
            ],
        });
        // If no user is found, throw a custom error
        if (!user) {
            throw new customError_1.CustomError('User not found', 404);
        }
        console.log('User found:', user); // Log the retrieved user
        return user;
    }
    catch (error) {
        // Log the error for debugging purposes
        console.error(error);
        // Rethrow as custom error
        throw new customError_1.CustomError('Failed to retrieve user', 500);
    }
});
exports.getUserByIdService = getUserByIdService;
const updateUserService = (id, username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findByPk(id);
        if (!user) {
            return null; // If user doesn't exist, return null
        }
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        if (password)
            user.password = password;
        yield user.save();
        return user;
    }
    catch (error) {
        throw new customError_1.CustomError('Failed to update user', 500);
    }
});
exports.updateUserService = updateUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findByPk(id);
        if (!user) {
            return false; // User doesn't exist
        }
        yield user.destroy();
        return true;
    }
    catch (error) {
        throw new customError_1.CustomError('Failed to delete user', 500);
    }
});
exports.deleteUserService = deleteUserService;
