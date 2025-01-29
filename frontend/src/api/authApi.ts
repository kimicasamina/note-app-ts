// src/api/authApi.ts
import apiClient from "./apiClient";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Register request
export const register = async (
  credentials: RegisterCredentials
): Promise<any> => {
  const response = await apiClient.post("/auths/register", credentials);
  return response.data;
};

// Login request
export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await apiClient.post("/auths/login", credentials);
  return response.data;
};

// Fetch current user details
export const getCurrentUser = async (): Promise<AuthResponse["user"]> => {
  const response = await apiClient.get("/auths/me");
  return response.data;
};

// Logout request
export const logout = async (): Promise<any> => {
  const response = await apiClient.delete("/auths/logout");
  return response.data;
};
