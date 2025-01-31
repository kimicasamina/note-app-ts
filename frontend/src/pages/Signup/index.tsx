import React from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@utils/validations/authSchema";
import { useRegister } from "@hooks/useAuth";
import { useCurrentUser } from "@hooks/useUser";
import InputField from "@components/InputField";
import Button from "@components/Button/Button";
import { useNavigate } from "react-router-dom";

interface SignupFormValues {
  email: string;
  username: string;
  password: string;
}

export default function Signup() {
  const { mutate: register, isLoading, isError, error } = useRegister();
  const navigate = useNavigate();
  const { data: user, isLoading: isFetching } = useCurrentUser();

  if (user) {
    navigate("/", { replace: true });
  }

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormValues) => {
    register(data, {
      onSuccess: () => {
        // After reload, navigate to the home page
        // navigate("/", { replace: true });
        // Refresh the page
        window.location.reload();
      },
    });
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

      <Button label="Signup" isLoading={isLoading} />

      {isError && <p style={{ color: "red" }}>{error?.message}</p>}
    </form>
  );
}
