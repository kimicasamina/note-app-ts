import React from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@utils/validations/authSchema";
import { useLogin } from "@hooks/useAuth";
import InputField from "@components/InputField";
import Button from "@components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@hooks/useUser";
interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const { mutate: login, isLoading, isError, error } = useLogin();
  const navigate = useNavigate();
  const { data: user, isLoading: isFetching } = useCurrentUser();

  if (user) {
    navigate("/", { replace: true });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data, {
      onSuccess: () => {
        // After reload, navigate to the home page
        // navigate("/", { replace: true });
        // Refresh the page
        window.location.reload();
      },
    });
  };

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

      <Button label="Login" isLoading={isLoading} />

      {isError && <p style={{ color: "red" }}>{error?.message}</p>}
    </form>
  );
}
