import React, { useEffect, useState } from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@utils/validations/authSchema";
import { useAuth } from "@context/authContext";
import InputField from "@components/ui/input-field";
import Button from "@components/ui/button";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@api/authService";

// Define action types
enum ActionType {
  SET_USER = "SET_USER",
  SET_LOADING = "SET_LOADING",
  RESET_USER = "RESET_USER",
}
interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const { state, dispatch } = useAuth();
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
    dispatch({ type: ActionType.SET_LOADING, payload: true }); // Set loading to true before making the request

    try {
      // API call for login
      const user = await loginApi(data.email, data.password);
      console.log("USER", user);
      if (user) {
        dispatch({ type: ActionType.SET_USER, payload: user });
        navigate("/"); // Redirect to home after successful login
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    } finally {
      dispatch({ type: ActionType.SET_LOADING, payload: false }); // Stop loading after request completes
    }
  };

  // Redirect if the user is already authenticated
  useEffect(() => {
    if (state.user && !state.loading) {
      navigate("/"); // Redirect to home if the user is already logged in
    }
  }, [state.user, state.loading, navigate]);

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

      <Button
        label="Login"
        type="submit"
        isLoading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
