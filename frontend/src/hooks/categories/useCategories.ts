import { useMutation, useQuery, useQueryClient } from "react-query";
import { addCategory, updateCategory, deleteCategory } from "@api/authApi";
import { Category } from "types/types";
import { getCurrentUser } from "@api/authApi";

export const useCategories = () => {
  const queryClient = useQueryClient();

  // Fetch categories for the current user
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery<Category[], Error>(["categories"], async () => {
    const user = await getCurrentUser();
    return user ? user.categories : [];
  });

  // Add category
  const { mutate: addNewCategory } = useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  // Update category
  const { mutate: updateExistingCategory } = useMutation(updateCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  // Delete category
  const { mutate: deleteExistingCategory } = useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  return {
    categories,
    isLoading,
    isError,
    addNewCategory,
    updateExistingCategory,
    deleteExistingCategory,
  };
};
