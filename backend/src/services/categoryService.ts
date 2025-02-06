import Category from '../models/Category';
import { CustomError } from '../utils/customError';

/**
 * Service function to create a category.
 */
export const createCategoryService = async (name: string, userId: string) => {
  return await Category.create({ name, user_id: userId });
};

/**
 * Service function to get all categories (for authenticated user).
 */
export const getCategoriesService = async (userId: string) => {
  try {
    const categories = await Category.findAll({ where: { user_id: userId } });
    if (categories.length === 0) {
      throw new CustomError('No categories found for this user', 404);
    }
    return categories;
  } catch (error) {
    throw new CustomError('Error fetching categories', 500);
  }
};

/**
 * Service function to get a category by its ID (for authenticated user).
 */
export const getCategoryByIdService = async (
  categoryId: string,
  userId: string,
) => {
  try {
    const category = await Category.findOne({
      where: { id: categoryId, user_id: userId },
    });
    if (!category) {
      throw new CustomError('Category not found', 404);
    }
    return category;
  } catch (error) {
    throw new CustomError('Error fetching category', 500);
  }
};

/**
 * Service function to update a category by its ID (for authenticated user).
 */
export const updateCategoryService = async (
  categoryId: string,
  name: string,
  userId: string,
) => {
  try {
    const category = await Category.findOne({
      where: { id: categoryId, user_id: userId },
    });
    if (!category) {
      throw new CustomError('Category not found', 404);
    }
    category.name = name;
    await category.save();
    return category;
  } catch (error) {
    throw new CustomError('Error updating category', 500);
  }
};

/**
 * Service function to delete a category by its ID (for authenticated user).
 */
export const deleteCategoryService = async (
  categoryId: string,
  userId: string,
) => {
  try {
    const category = await Category.findOne({
      where: { id: categoryId, user_id: userId },
    });
    if (!category) {
      throw new CustomError('Category not found', 404);
    }
    await category.destroy();
    return category;
  } catch (error) {
    throw new CustomError('Error deleting category', 500);
  }
};
