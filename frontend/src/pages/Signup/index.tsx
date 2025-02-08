import React, { useState } from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@utils/validations/authSchema";
import InputField from "@components/ui/input-field";
import Button from "@components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/authContext";
import { registerApi } from "@api/authService";

// Define the signup form values type
interface SignupFormValues {
  email: string;
  username: string;
  password: string;
}

// You can use the ActionType enum here as you did before
enum ActionType {
  SET_USER = "SET_USER",
  SET_LOADING = "SET_LOADING",
  RESET_USER = "RESET_USER",
}

export default function Signup() {
  const { dispatch } = useAuth(); // Use dispatch to interact with AuthContext
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Form handling using react-hook-form
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  // On form submit, attempt to register the user
  const onSubmit = async (data: SignupFormValues) => {
    setError(null); // Reset any previous errors
    dispatch({ type: ActionType.SET_LOADING, payload: true }); // Set loading state to true

    try {
      // Call the register API function (register API call)
      const user = await registerApi(data.email, data.username, data.password);

      // Set user data in context after successful registration
      dispatch({ type: ActionType.SET_USER, payload: user });

      navigate("/"); // Redirect to home page after successful signup
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
    } finally {
      dispatch({ type: ActionType.SET_LOADING, payload: false }); // Set loading to false
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

      <Button
        label="Signup"
        type="submit"
        isLoading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
