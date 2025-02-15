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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const categoryService_1 = require("../services/categoryService");
/**
 * Controller to create a category.
 */
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const userId = req.user.id; // User ID from the decoded JWT token
        const newCategory = yield (0, categoryService_1.createCategoryService)(name, userId);
        res
            .status(201)
            .json({ message: 'Category created successfully', newCategory });
    }
    catch (error) {
        next(error);
    }
});
exports.createCategory = createCategory;
/**
 * Controller to get all categories for the authenticated user.
 */
const getCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id; // User ID from the decoded JWT token
        const categories = yield (0, categoryService_1.getCategoriesService)(userId);
        res.status(200).json({ categories });
    }
    catch (error) {
        next(error);
    }
});
exports.getCategories = getCategories;
/**
 * Controller to get a category by ID for the authenticated user.
 */
const getCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const userId = req.user.id; // User ID from the decoded JWT token
        const category = yield (0, categoryService_1.getCategoryByIdService)(categoryId, userId);
        res.status(200).json({ category });
    }
    catch (error) {
        next(error);
    }
});
exports.getCategoryById = getCategoryById;
/**
 * Controller to update a category by ID for the authenticated user.
 */
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;
        const userId = req.user.id; // User ID from the decoded JWT token
        const updatedCategory = yield (0, categoryService_1.updateCategoryService)(categoryId, name, userId);
        res.status(200).json({ updatedCategory });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCategory = updateCategory;
/**
 * Controller to delete a category by ID for the authenticated user.
 */
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const userId = req.user.id; // User ID from the decoded JWT token
        console.log('REQ', req);
        const result = yield (0, categoryService_1.deleteCategoryService)(categoryId, userId);
        res.status(204).json({ message: 'Category successfully deleted.' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCategory = deleteCategory;
