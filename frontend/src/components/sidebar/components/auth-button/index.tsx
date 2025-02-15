import React from "react";
import { Link } from "react-router-dom";
import Button from "@components/ui/button";
import { User } from "types/types";
import { useAuth } from "@context/authContext";

import "./index.css";
import { logoutApi } from "@api/authService";

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

  const handleLogout = async () => {
    try {
      const data = await logoutApi();
      console.log("data", data);
      dispatch({ type: ActionType.RESET_USER });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth">
      {user ? (
        <Button
          type="submit"
          label="Logout"
          isLoading={loading}
          onClick={handleLogout}
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
