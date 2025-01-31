import { useQuery } from "react-query";
import { getCurrentUser } from "@api/authApi";
import { User } from "types/types";

// export const useCurrentUser = () => {
//   return useQuery<User | null, Error>(["currentUser"], getCurrentUser);
// };

// Current User hook
// export const useCurrentUser = () => {
//   return useQuery<User | null>("currentUser", getCurrentUser, {
//     enabled: true, // Always fetch user on page load (if token exists)
//     retry: false, // Don't retry on error
//     select: (data) => data ?? null, // Return `null` if no user
//     onError: () => {
//       console.error("Failed to verify token");
//     },
//   });

// };

// export const useCurrentUser = () => {
//   const {
//     data: user,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryFn: () => getCurrentUser(),
//     queryKey: ["user"],
//   });
//   return { data: user, isLoading, isError };
// };

// Current User hook
export const useCurrentUser = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<User | null, Error>({
    queryKey: ["user"], // You can change the key based on your need, 'user' here as an example
    queryFn: getCurrentUser, // The function that fetches the user data
    enabled: true, // Makes sure this fetch is always triggered, you could add conditions here if needed
    retry: false, // Disable retry on error if you want
    select: (data) => data ?? null, // Return `null` if there's no user data (in case of failed login or no token)
    onError: (err: Error) => {
      console.error("Failed to fetch current user:", err.message);
    },
  });

  return { data: user, isLoading, isError, error };
};
