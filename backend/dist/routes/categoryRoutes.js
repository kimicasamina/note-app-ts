"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/categoryRoutes.ts
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
/**
 * Routes for category management.
 */
router.post('/', authMiddleware_1.authenticate, categoryController_1.createCategory); // Create a category
router.get('/', authMiddleware_1.authenticate, categoryController_1.getCategories); // Get all categories for authenticated user
router.get('/:id', authMiddleware_1.authenticate, categoryController_1.getCategoryById); // Get a specific category by ID
router.put('/:id', authMiddleware_1.authenticate, categoryController_1.updateCategory); // Update a category by ID
router.delete('/:id', authMiddleware_1.authenticate, categoryController_1.deleteCategory); // Delete a category by ID
exports.default = router;
