import axiosClient from "./apiClient";
import { User } from "types/types";

// Define the response types for login, register, etc.
interface AuthResponse {
  user: User;
  token: string;
}

interface GetCurrentUserResponse {
  user: User | null;
}

export const login = async (loginValues: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await axiosClient.post("/api/auths/login", loginValues, {
    withCredentials: true,
  });
  return response.data; // We expect response.data to contain user and token
};

export const register = async (registerValues: {
  email: string;
  username: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await axiosClient.post(
    "/api/auths/register",
    registerValues,
    { withCredentials: true }
  );
  return response.data; // We expect response.data to contain user and token
};

export const getCurrentUser =
  async (): Promise<GetCurrentUserResponse | null> => {
    try {
      const response = await axiosClient.get("/api/auths/me", {
        withCredentials: true,
      });
      return response.data; // We expect response.data to contain the current user or null
    } catch (error) {
      console.error("Error fetching user:", error);
      return null; // If not authenticated, return null
    }
  };

export const logout = async (): Promise<any> => {
  try {
    const response = await axiosClient.delete("/api/auths/logout", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
