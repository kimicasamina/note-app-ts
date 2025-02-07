import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "@utils/validations/authSchema";

export function useAuthForm(type: "login" | "signup") {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(type === "login" ? loginSchema : signupSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      // handle login/signup
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return { register, handleSubmit, errors, isSubmitting, error, onSubmit };
}
