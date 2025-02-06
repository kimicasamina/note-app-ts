import { useMutation, useQuery } from "react-query";
import { login, register, getCurrentUser } from "../api/authApi";
import { queryClient } from "@utils/queryClient";
import { User } from "../types/types";

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

// export const useLogin = () => {
//   return useMutation(login, {
//     onSuccess: (data) => {
//       console.log("Login successful:", data);
//       // You can store the user data in React Query cache or localStorage if needed
//       // queryClient.invalidateQueries("user"); // This will refetch the user data
//       // window.location.reload();
//     },
//     onError: (error: any) => {
//       console.error("Login failed:", error.message);
//     },
//   });
// };

// export const useRegister = () => {
//   return useMutation(register, {
//     onSuccess: (data) => {
//       console.log("Registration successful:", data);
//       // Optionally, store data in cache
//     },
//     onError: (error: any) => {
//       console.error("Registration failed:", error.message);
//     },
//   });
// };

// Get current user
// export const useGetCurrentUser = () => {
//   return useQuery<GetCurrentUserResponse | null>("user", getCurrentUser, {
//     onError: (error) => {
//       console.error("Error fetching user:", error);
//     },
//     onSuccess: (data) => {
//       // Only the user object or null is cached
//       const user = data?.user || null;
//       queryClient.setQueryData("user", user);
//     },
//     retry: false,
//     refetchOnWindowFocus: false,
//     select: (data) => {
//       // Return the `data` directly as it already matches the required type
//       return data ? { user: data.user } : null;
//     },
//   });
// };

// // Login hook
// export const useLogin = () => {
//   return useMutation(login, {
//     onSuccess: (data) => {
//       console.log("Login successful:", data);
//       queryClient.setQueryData("user", data); // Store the user data in the query cache
//     },
//     onError: (error: MutationError) => {
//       console.error("Login error:", error.message);
//     },
//   });
// };

// // Register hook
// export const useRegister = () => {
//   return useMutation(register, {
//     onSuccess: (data) => {
//       console.log("Registration successful:", data);
//       queryClient.setQueryData("user", data); // Store the user data in the query cache
//     },
//     onError: (error: MutationError) => {
//       console.error("Registration error:", error.message);
//     },
//   });
// };
