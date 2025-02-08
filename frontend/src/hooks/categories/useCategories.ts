import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { queryClient } from "@utils/queryClient";
import { createCategoryApi } from "@api/categoriesService";
import { getCategoriesApi } from "@api/categoriesService";
import { updateCategoryApi } from "@api/categoriesService";
import { deleteCategoryApi } from "@api/categoriesService";

// Hook to fetch all categories
export const useCategories = () => {
  return useQuery("categories", getCategoriesApi, {
    // Do not fetch on focus or edit
    refetchOnWindowFocus: false, // Prevent refetching when the window is refocused
    refetchOnReconnect: true, // Prevent refetching when the app reconnects to the internet
    staleTime: 1000 * 60 * 5, // Data will stay fresh for 5 minutes, no refetch will occur within this period
    onError: (error: any) => {
      console.error("Error fetching categories:", error.message);
    },
  });
};

// Hook to update a category
export const useUpdateCategory = () => {
  return useMutation(
    ({
      categoryId,
      categoryName,
    }: {
      categoryId: string;
      categoryName: string;
    }) => updateCategoryApi(categoryId, categoryName),
    {
      onSuccess: () => {
        // Invalidate the 'categories' query to trigger a refetch after the mutation
        queryClient.invalidateQueries("categories");
        console.log("Category updated successfully!");
      },
      onError: (error: any) => {
        console.error("Error updating category:", error.message);
      },
    }
  );
};

// Hook to create a category
export const useCreateCategory = () => {
  return useMutation(
    (categoryName: string) => createCategoryApi(categoryName),
    {
      onSuccess: () => {
        // Invalidate the 'categories' query to trigger a refetch after the mutation
        queryClient.invalidateQueries("categories");
        console.log("Category created successfully!");
      },
      onError: (error: any) => {
        console.error("Error creating category:", error.message);
      },
    }
  );
};

// Hook to delete a category
export const useDeleteCategory = () => {
  return useMutation((categoryId: string) => deleteCategoryApi(categoryId), {
    onSuccess: () => {
      // Invalidate the 'categories' query to trigger a refetch after the mutation
      queryClient.invalidateQueries("categories");
      console.log("Category deleted successfully!");
    },
    onError: (error: any) => {
      console.error("Error deleting category:", error.message);
    },
  });
};
