import { useQuery } from "react-query";
import { getCurrentUser } from "@api/authApi";
import { queryClient } from "@utils/queryClient";

// export const useGetCurrentUser = () => {
//   return useQuery("user", getCurrentUser, {
//     retry: false,
//     refetchOnWindowFocus: false,
//     onError: (error) => {
//       console.error("Error fetching user data:", error);
//     },
//     onSuccess: (data) => {
//       console.log("DATA", data);
//       const user = data ? data : null;
//       queryClient.setQueryData("user", user);
//     },
//   });
// };
export const useGetCurrentUser = () => {
  return useQuery("user", getCurrentUser, {
    onError: (error) => {
      console.error("Error fetching user:", error);
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: true, // This query is enabled by default; adjust as needed.
  });
};
