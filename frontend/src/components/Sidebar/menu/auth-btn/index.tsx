import React from "react";
import { Link } from "react-router-dom";
import Button from "components/Button/Button";
import { User } from "context/AuthContext";

import "./index.css";

type User = {
  id: string;
  email: string;
  username: string;
};

type AuthButtonProps = {
  user: User | null;
};

export default function AuthButton({ user }: AuthButtonProps) {
  return (
    <div className="header__auth">
      {user ? (
        <button className="">Logout</button>
      ) : (
        <>
          <Link
            to="/login"
            className="btn flex  header__auth__btn header__auth__btn--login"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="btn flex header__auth__btn header__auth__btn--signup"
          >
            Signup
          </Link>
        </>
      )}
    </div>
  );
}
