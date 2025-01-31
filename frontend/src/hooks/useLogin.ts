import { useMutation } from "react-query";
import { login as apiLogin } from "../api/authApi";

export const useLogin = () => {
  return useMutation(apiLogin, {
    onError: (error) => {
      console.error("Login error:", error);
    },
    onSuccess: (data) => {
      // After successful login, you can store additional user data or handle redirect
      console.log("Logged in successfully:", data);
      // For example, navigate to homepage or refresh page
      window.location.reload();
    },
  });
};
