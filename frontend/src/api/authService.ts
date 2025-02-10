import axiosClient from "@utils/axiosClient";

interface User {
  id: string;
  username: string;
  email: string;
}

interface ErrorResponse {
  message: string;
}

// **Login API**
export const loginApi = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const response = await axiosClient.post("/api/auths/login", {
      email,
      password,
    });
    return response.data.user;
  } catch (error: any) {
    // Handle errors (e.g. 401 Unauthorized, 500 Internal Server Error)
    throw new Error(
      error.response?.data?.message || "Login failed, please try again"
    );
  }
};

// **Register API**
export const registerApi = async (
  username: string,
  password: string,
  email: string
): Promise<User> => {
  try {
    const response = await axiosClient.post("/api/auths/register", {
      username,
      password,
      email,
    });
    return response.data.user;
  } catch (error: any) {
    // Handle errors (e.g. 400 Bad Request)
    throw new Error(
      error.response?.data?.message || "Registration failed, please try again"
    );
  }
};

// **Verify User API** (This will check if the user is authenticated via token)
export const verifyUserApi = async (): Promise<User | null> => {
  try {
    const response = await axiosClient.get("/api/auths/me");
    return response.data.user;
  } catch (error: any) {
    // Handle errors if the user is not authenticated
    // throw new Error(error.response?.data?.message || "Failed to verify user");
    return null;
  }
};

// **Logout API**
export const logoutApi = async (): Promise<void> => {
  try {
    await axiosClient.delete("/api/auths/logout");
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};
