import { Request, Response, NextFunction } from 'express';
import {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from '../services/categoryService';
import { CustomError } from '../utils/customError';

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name } = req.body;
    const userId = req.user!.id; // Assuming user is authenticated and added to request

    const newCategory = await createCategoryService(name, userId);

    res
      .status(201)
      .json({ message: 'Category created successfully', newCategory });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const categories = await getCategoriesService();
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const category = await getCategoryByIdService(categoryId);

    if (!category) {
      throw new CustomError('Category not found', 404);
    }

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;

    const updatedCategory = await updateCategoryService(categoryId, name);

    if (!updatedCategory) {
      throw new CustomError('Category not found', 404);
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const result = await deleteCategoryService(categoryId);

    if (!result) {
      throw new CustomError('Category not found', 404);
    }

    res.status(204).send({ message: 'Category successfully deleted.' });
  } catch (error) {
    next(error);
  }
};
