import React from "react";
import { Link } from "react-router-dom";
import Button from "components/Button/Button";
import { type User } from "types/custom";
import "./index.css";

export default function AuthButton({ user }: { user: User }) {
  return (
    <div className="header__auth">
      {user.isAuthenticated ? (
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
