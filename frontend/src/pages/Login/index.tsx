import React, { useEffect, useState } from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@utils/validations/authSchema";
import { useAuth } from "@context/authContext";
import InputField from "@components/InputField";
import Button from "@components/Button/Button";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const { login, user, loading: authLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null); // Reset any previous errors

    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    }
  };

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user && !authLoading) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  return (
    <form className="login" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="login__title">Login</h2>

      <InputField
        label="Email"
        type="email"
        name="email"
        errorMessage={errors.email?.message}
        register={register}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        errorMessage={errors.password?.message}
        register={register}
      />

      <Button label="Login" type="submit" isLoading={isSubmitting} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
