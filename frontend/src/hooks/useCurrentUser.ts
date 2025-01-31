import { useQuery } from "react-query";
import { getCurrentUser } from "../api/authApi";

export const useCurrentUser = () => {
  return useQuery("user", getCurrentUser, {
    enabled: !!localStorage.getItem("auth_token"), // Only fetch if the token exists
    onError: (error) => {
      console.error("Error fetching current user:", error);
    },
  });
};
