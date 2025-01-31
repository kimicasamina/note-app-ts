import apiClient from "./apiClient";
import { User, Category, Note } from "types/types";

interface AuthResponse {
  user: User;
}

// Login function
export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<any> => {
  const response = await apiClient.post("/api/auths/login", credentials);
  return response.data;
};

// Register function
export const register = async (credentials: {
  email: string;
  username: string;
  password: string;
}): Promise<any> => {
  const response = await apiClient.post("/api/auths/register", credentials);
  return response.data;
};

// Fetch current user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await apiClient.get("/api/auths/me", {
      withCredentials: true,
    });
    return response.data; // Return user data
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// Notes API
export const addNote = async (noteData: Omit<Note, "id">): Promise<Note> => {
  const response = await apiClient.post("/api/notes", noteData);
  return response.data;
};

export const updateNote = async (
  noteId: string,
  noteData: Partial<Note>
): Promise<Note> => {
  const response = await apiClient.put(`/api/notes/${noteId}`, noteData);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<void> => {
  await apiClient.delete(`/api/notes/${noteId}`);
};

// Categories API
export const addCategory = async (
  categoryData: Omit<Category, "id">
): Promise<Category> => {
  const response = await apiClient.post("/api/categories", categoryData);
  return response.data;
};

export const updateCategory = async (
  categoryId: string,
  categoryData: Partial<Category>
): Promise<Category> => {
  const response = await apiClient.put(
    `/api/categories/${categoryId}`,
    categoryData
  );
  return response.data;
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  await apiClient.delete(`/api/categories/${categoryId}`);
};
