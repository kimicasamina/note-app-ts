import { useMutation, useQuery } from "react-query";
import {
  login as apiLogin,
  register as apiRegister,
  getCurrentUser,
} from "../api/authApi";
import { User } from "../types/types";

// Define the error type
interface MutationError {
  message: string;
}

// Login hook
export const useLogin = () => {
  return useMutation(apiLogin, {
    onSuccess: (data) => {
      // Server should handle token in cookies automatically
    },
    onError: (error: MutationError) => {
      console.error("Login error:", error.message);
    },
  });
};

// Register hook
export const useRegister = () => {
  return useMutation(apiRegister, {
    onSuccess: (data) => {
      // Server should handle token in cookies automatically
    },
    onError: (error: MutationError) => {
      console.error("Login error:", error.message);
    },
  });
};

// Current User hook
export const useCurrentUser = () => {
  return useQuery<User | null>("currentUser", getCurrentUser, {
    enabled: true, // Always fetch user on page load (if token exists)
    retry: false, // Don't retry on error
    select: (data) => data ?? null, // Return `null` if no user
    onError: () => {
      console.error("Failed to verify token");
    },
  });
};
