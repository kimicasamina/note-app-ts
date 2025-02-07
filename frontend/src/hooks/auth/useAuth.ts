import { useMutation, useQuery } from "react-query";
import { login, register, getCurrentUser } from "../../api/authApi";
import { queryClient } from "@utils/queryClient";
import { User } from "../../types/types";

interface LoginVariables {
  email: string;
  password: string;
}
interface RegisterVariables {
  username: string;
  email: string;
  password: string;
}

export const useLogin = () => {
  return useMutation(
    async (variables: LoginVariables) => {
      const data = await login(variables);
      return data;
    },
    {
      onSuccess: (data) => {
        // Store the user data and token, the token will be saved as a cookie
        queryClient.setQueryData("user", data.user); // Store user data in React Query cache
      },
      onError: (error) => {
        console.error("Login failed:", error);
      },
    }
  );
};

export const useRegister = () => {
  return useMutation(
    async (variables: RegisterVariables) => {
      const data = await register(variables);
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData("user", data.user); // Store user data in React Query cache
      },
      onError: (error) => {
        console.error("Registration failed:", error);
      },
    }
  );
};
