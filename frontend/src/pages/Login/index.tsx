import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@utils/validations/authSchema";
import { useLogin } from "@hooks/useAuth"; // assuming you have a useLogin hook
import InputField from "@components/InputField";
import Button from "@components/Button/Button";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const { mutate: login, isLoading, isError, error } = useLogin(); // Assume login mutation is set up with react-query
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data); // Call the login mutation
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>

      <InputField
        label="Email"
        type="email"
        value=""
        onChange={() => {}}
        errorMessage={errors.email?.message}
        {...register("email")}
      />
      <InputField
        label="Password"
        type="password"
        value=""
        onChange={() => {}}
        errorMessage={errors.password?.message}
        {...register("password")}
      />

      <Button label="Login" isLoading={isLoading} />
      {isError && <p style={{ color: "red" }}>{error?.message}</p>}
    </form>
  );
}
