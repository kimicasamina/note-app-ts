import { useMutation } from "react-query";
import { login as apiLogin, register as apiRegister } from "../api/authApi";

export const useLogin = () => {
  return useMutation(
    async (credentials: { email: string; password: string }) => {
      const response = await apiLogin(credentials);
      return response;
    },
    {
      onError: (error) => {
        console.error("Login error:", error);
      },
    }
  );
};

export const useRegister = () => {
  return useMutation(
    async (credentials: {
      email: string;
      username: string;
      password: string;
    }) => {
      const response = await apiRegister(credentials); // Perform the register
      // No need to store token in localStorage because it's in the cookie
      return response; // Return the response (or user data) if necessary
    },
    {
      onError: (error) => {
        console.error("Registration error:", error);
      },
    }
  );
};
