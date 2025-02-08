import axiosClient from "@utils/axiosClient";
import { Category } from "types/types";

// **Error Response Interface**
interface ErrorResponse {
  message: string;
}

// **Create Category API**
export const createCategoryApi = async (
  categoryName: string
): Promise<Category> => {
  try {
    const response = await axiosClient.post("/api/categories", {
      name: categoryName,
    });
    return response.data.category;
  } catch (error: any) {
    // Handle errors (e.g. 400 Bad Request)
    throw new Error(
      error.response?.data?.message || "Failed to create category"
    );
  }
};

// **Get All Categories API**
export const getCategoriesApi = async (): Promise<Category[]> => {
  try {
    const response = await axiosClient.get("/api/categories");
    return response.data.categories;
  } catch (error: any) {
    // Handle errors (e.g. 500 Internal Server Error)
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
};

// **Update Category API**
export const updateCategoryApi = async (
  categoryId: string,
  categoryName: string
): Promise<Category> => {
  try {
    const response = await axiosClient.put(`/api/categories/${categoryId}`, {
      name: categoryName,
    });
    return response.data.category;
  } catch (error: any) {
    // Handle errors (e.g. 400 Bad Request)
    throw new Error(
      error.response?.data?.message || "Failed to update category"
    );
  }
};

// **Delete Category API**
export const deleteCategoryApi = async (categoryId: string): Promise<void> => {
  try {
    await axiosClient.delete(`/api/categories/${categoryId}`);
  } catch (error: any) {
    // Handle errors (e.g. 404 Not Found, 500 Internal Server Error)
    throw new Error(
      error.response?.data?.message || "Failed to delete category"
    );
  }
};
