import React from "react";
import "./Header.css";
import brand from "../../assets/svg/brand.svg";
import AvatarLogo from "../AvatarLogo/AvatarLogo";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

export default function Header() {
  const isAuth = false;
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <img src={brand} alt="Brand logo" className="header__brand--logo" />
          <span className="header__brand--name">b.o.t.e.d</span>
        </div>
        <div className="header__avatar">
          <span className="">Hi, Kimberly</span>
        </div>
        <div className="header__auth">
          {isAuth ? (
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
      </div>
    </header>
  );
}
