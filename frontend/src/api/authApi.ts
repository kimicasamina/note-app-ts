import apiClient from "./apiClient";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthResponse {
  user: User;
}

// Login function
export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await apiClient.post("/api/auths/login", credentials, {
    withCredentials: true, // Make sure cookies are included in the request
  });
  return response.data;
};

// Register function
export const register = async (credentials: {
  email: string;
  username: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await apiClient.post("/api/auths/register", credentials, {
    withCredentials: true, // Make sure cookies are included in the request
  });
  return response.data;
};

// Get current user function (will use the cookie)
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await apiClient.get("/api/auths/me", {
      withCredentials: true, // Make sure cookies are included
    });
    return response.data; // Return user if the token is valid
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null; // If the token is invalid, return null
  }
};
