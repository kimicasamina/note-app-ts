import React from "react";
import { Link } from "react-router-dom";
import Button from "@components/Button/Button"; // Import Button component
import { User } from "types/types";

import "./index.css";
import { useAuth } from "@context/authContext";

type AuthButtonProps = {
  user: User | null;
};

export default function AuthButton({ user }: AuthButtonProps) {
  const { logout, loading } = useAuth();

  return (
    <div className="auth">
      {user ? (
        <Button
          type="submit"
          label="Logout"
          isLoading={loading}
          onClick={logout}
        />
      ) : (
        <>
          <Link to="/login" className="button-link auth__btn ">
            Login
          </Link>
          <Link to="/signup" className="button-link auth__btn">
            Signup
          </Link>
        </>
      )}
    </div>
  );
}
