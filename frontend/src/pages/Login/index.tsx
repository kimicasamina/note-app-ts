import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const { dispatch } = useAuth();

  const handleLogin = () => {
    // Perform authentication logic (e.g., API call)
    dispatch({ type: "LOGIN" });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
