import React from "react";
import { Link } from "react-router-dom";
import Button from "components/Button/Button";
import { User } from "context/AuthContext";
import "./index.css";
import { CgLogOut } from "react-icons/cg";
import { CgLogIn } from "react-icons/cg";

type AuthButtonProps = {
  user: User | null;
};

export default function AuthButton({ user }: AuthButtonProps) {
  return (
    <div className="header__auth">
      {user ? (
        <button className="">
          Logout
          <span className="">
            <CgLogOut />
          </span>
        </button>
      ) : (
        <>
          <Link
            to="/login"
            className="btn flex  header__auth__btn header__auth__btn--login"
          >
            <span className="">
              <CgLogIn />
            </span>
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
