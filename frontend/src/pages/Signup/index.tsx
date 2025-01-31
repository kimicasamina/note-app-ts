import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@utils/validations/authSchema";
import { useRegister } from "@hooks/useAuth"; // Assume useRegister hook is set up
import InputField from "@components/InputField";
import Button from "@components/Button/Button";

interface SignupFormValues {
  email: string;
  username: string;
  password: string;
}

export default function Signup() {
  const { mutate: register, isLoading, isError, error } = useRegister();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormValues) => {
    register(data); // Call the register mutation
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Signup</h2>

      <InputField
        label="Username"
        type="text"
        value=""
        onChange={() => {}}
        errorMessage={errors.username?.message}
        {...formRegister("username")}
      />
      <InputField
        label="Email"
        type="email"
        value=""
        onChange={() => {}}
        errorMessage={errors.email?.message}
        {...formRegister("email")}
      />
      <InputField
        label="Password"
        type="password"
        value=""
        onChange={() => {}}
        errorMessage={errors.password?.message}
        {...formRegister("password")}
      />

      <Button label="Signup" isLoading={isLoading} />
      {isError && <p style={{ color: "red" }}>{error?.message}</p>}
    </form>
  );
}
