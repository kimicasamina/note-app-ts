import React from "react";
import "../styles/components/_header.scss";
import brand from "../assets/svg/brand.svg";
import AvatarLogo from "./AvatarLogo";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <img src={brand} alt="Brand logo" className="header__brand-logo" />
          <span className="header__brand-name">B.O.A.T.E.D</span>
        </div>

        <div className="header__user">
          <div className="header__user-avatar">
            <AvatarLogo />
          </div>
          <span className="header__user-name">Kimberly</span>
        </div>

        <div className="header__auth">
          <Link to="/login" className="button">
            Login
          </Link>
          <Link to="/signup" className="button">
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
}
