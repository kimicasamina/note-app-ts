import React, { useState } from "react";
import InputField from "@components/InputField";
import Button from "@components/Button/Button";

interface AuthFormProps {
  onSubmit: (credentials: {
    email: string;
    password: string;
    username?: string; // Allow username to be optional
  }) => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  isRegisterForm: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  isLoading,
  isError,
  errorMessage,
  isRegisterForm,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [formError, setFormError] = useState<string | undefined>(undefined); // Changed to undefined

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegisterForm && !username) {
      setFormError("Username is required for registration");
      return;
    }

    setFormError(undefined); // Reset the error
    onSubmit({
      email,
      password,
      username: isRegisterForm ? username : undefined, // username is optional for login
    });
  };

  return (
    <div>
      <h2>{isRegisterForm ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegisterForm && (
          <InputField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            errorMessage={formError}
          />
        )}
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          label={isRegisterForm ? "Register" : "Login"}
          isLoading={isLoading}
        />
        {isError && errorMessage && (
          <p style={{ color: "red" }}>{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
