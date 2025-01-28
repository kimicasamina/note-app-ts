import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../../components/Button";
import { UserProps } from "features/Sidebar/models";

export default function AuthButton({ user }: UserProps) {
  return (
    <div className="header__auth">
      {user ? (
        <Button className={"button"}>Logout</Button>
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
