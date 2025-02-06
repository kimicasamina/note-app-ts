import axiosClient from "./apiClient";

export const getCategoriesApi = async () => {
  try {
    const response = await axiosClient.get("/api/categories/", {
      withCredentials: true,
    });
    console.log("RESPONSE: ", response.data);
    return response.data.categories;
  } catch (error) {
    console.log("Error fetching categories", error);
    throw error; // Ensure the error is thrown so the react-query can catch it
  }
};
