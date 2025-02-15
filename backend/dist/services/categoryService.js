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
exports.deleteCategoryService = exports.updateCategoryService = exports.getCategoryByIdService = exports.getCategoriesService = exports.createCategoryService = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const customError_1 = require("../utils/customError");
/**
 * Service function to create a category.
 */
const createCategoryService = (name, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Category_1.default.create({ name, user_id });
});
exports.createCategoryService = createCategoryService;
/**
 * Service function to get all categories (for authenticated user).
 */
const getCategoriesService = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.findAll({ where: { user_id } });
        if (categories.length === 0) {
            throw new customError_1.CustomError('No categories found for this user', 404);
        }
        return categories;
    }
    catch (error) {
        throw new customError_1.CustomError('Error fetching categories', 500);
    }
});
exports.getCategoriesService = getCategoriesService;
/**
 * Service function to get a category by its ID (for authenticated user).
 */
const getCategoryByIdService = (categoryId, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.findOne({
            where: { id: categoryId, user_id },
        });
        if (!category) {
            throw new customError_1.CustomError('Category not found', 404);
        }
        return category;
    }
    catch (error) {
        throw new customError_1.CustomError('Error fetching category', 500);
    }
});
exports.getCategoryByIdService = getCategoryByIdService;
/**
 * Service function to update a category by its ID (for authenticated user).
 */
const updateCategoryService = (categoryId, name, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.findOne({
            where: { id: categoryId, user_id },
        });
        if (!category) {
            throw new customError_1.CustomError('Category not found', 404);
        }
        category.name = name;
        yield category.save();
        return category;
    }
    catch (error) {
        throw new customError_1.CustomError('Error updating category', 500);
    }
});
exports.updateCategoryService = updateCategoryService;
/**
 * Service function to delete a category by its ID (for authenticated user).
 */
const deleteCategoryService = (categoryId, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.findOne({
            where: { id: categoryId, user_id },
        });
        if (!category) {
            throw new customError_1.CustomError('Category not found', 404);
        }
        yield category.destroy();
        return category;
    }
    catch (error) {
        throw new customError_1.CustomError('Error deleting category', 500);
    }
});
exports.deleteCategoryService = deleteCategoryService;
