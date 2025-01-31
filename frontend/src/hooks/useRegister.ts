import { useMutation } from "react-query";
import { register as apiRegister } from "../api/authApi";

export const useRegister = () => {
  return useMutation(apiRegister, {
    onError: (error) => {
      console.error("Registration error:", error);
    },
    onSuccess: (data) => {
      // After successful registration, you can handle navigation or other actions
      console.log("Registered successfully:", data);
      window.location.reload();
    },
  });
};
