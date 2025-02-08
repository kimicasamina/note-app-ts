// src/controllers/categoryController.ts
import { Request, Response, NextFunction } from 'express';
import {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from '../services/categoryService';
import { CustomError } from '../utils/customError';

/**
 * Controller to create a category.
 */
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name } = req.body;
    const userId = req.user!.id; // User ID from the decoded JWT token

    const newCategory = await createCategoryService(name, userId);

    res
      .status(201)
      .json({ message: 'Category created successfully', newCategory });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get all categories for the authenticated user.
 */
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user!.id; // User ID from the decoded JWT token
    const categories = await getCategoriesService(userId);
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a category by ID for the authenticated user.
 */
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const userId = req.user!.id; // User ID from the decoded JWT token

    const category = await getCategoryByIdService(categoryId, userId);
    res.status(200).json({ category });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a category by ID for the authenticated user.
 */
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;
    const userId = req.user!.id; // User ID from the decoded JWT token

    const updatedCategory = await updateCategoryService(
      categoryId,
      name,
      userId,
    );
    res.status(200).json({ updatedCategory });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a category by ID for the authenticated user.
 */
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const userId = req.user!.id; // User ID from the decoded JWT token
    console.log('REQ', req);
    const result = await deleteCategoryService(categoryId, userId);
    res.status(204).json({ message: 'Category successfully deleted.' });
  } catch (error) {
    next(error);
  }
};
