import React from "react";
import { Link } from "react-router-dom";
import Button from "components/Button/Button";
import { type User } from "types/custom";

export default function AuthButton({ user }: { user: User }) {
  return (
    <div className="header__auth">
      {user ? (
        <button className="">Logout</button>
      ) : (
        <>
          <Link to="/login" className="header__auth--login">
            Login
          </Link>
          <Link to="/signup" className="header__auth--signup">
            Signup
          </Link>
        </>
      )}
    </div>
  );
}
