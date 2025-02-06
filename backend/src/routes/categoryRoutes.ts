// src/routes/categoryRoutes.ts
import { Router } from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

/**
 * Routes for category management.
 */
router.post('/', authenticate, createCategory); // Create a category
router.get('/', authenticate, getCategories); // Get all categories for authenticated user
router.get('/:id', authenticate, getCategoryById); // Get a specific category by ID
router.put('/:id', authenticate, updateCategory); // Update a category by ID
router.delete('/:id', authenticate, deleteCategory); // Delete a category by ID

export default router;
