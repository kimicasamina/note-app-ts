import React, { useState } from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@utils/validations/authSchema";
import InputField from "@components/InputField";
import Button from "@components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/authContext";

interface SignupFormValues {
  email: string;
  username: string;
  password: string;
}

export default function Signup() {
  const { register, user, loading: authLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setError(null);

    try {
      await register(data.email, data.username, data.password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="signup__title">Signup</h2>

      <InputField
        label="Username"
        type="text"
        name="username"
        errorMessage={errors.username?.message}
        register={formRegister}
      />

      <InputField
        label="Email"
        type="email"
        name="email"
        errorMessage={errors.email?.message}
        register={formRegister}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        errorMessage={errors.password?.message}
        register={formRegister}
      />

      <Button label="Signup" type="submit" isLoading={isSubmitting} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
