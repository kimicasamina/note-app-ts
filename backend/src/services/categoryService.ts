import Category from '../models/Category';

export const createCategoryService = async (name: string, user_id: string) => {
  return await Category.create({ name, user_id });
};

export const getCategoriesService = async () => {
  return await Category.findAll();
};

export const getCategoryByIdService = async (id: string) => {
  return await Category.findByPk(id);
};

export const updateCategoryService = async (id: string, name: string) => {
  const category = await Category.findByPk(id);
  if (!category) return null;

  category.name = name;
  await category.save();
  return category;
};

export const deleteCategoryService = async (id: string) => {
  const category = await Category.findByPk(id);
  if (!category) return null;

  await category.destroy();
  return category;
};
