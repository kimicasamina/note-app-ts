import React from "react";
import { Link } from "react-router-dom";
import Button from "@components/ui/button";
import { User } from "types/types";
import { useAuth } from "@context/authContext";

import "./index.css";

export enum ActionType {
  SET_USER = "SET_USER",
  SET_LOADING = "SET_LOADING",
  RESET_USER = "RESET_USER",
}

type AuthButtonProps = {
  user: User | null;
};

export default function AuthButton({ user }: AuthButtonProps) {
  const { state, dispatch } = useAuth();
  const { loading } = state;

  return (
    <div className="auth">
      {user ? (
        <Button
          type="submit"
          label="Logout"
          isLoading={loading}
          onClick={() => dispatch({ type: ActionType.RESET_USER })}
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
