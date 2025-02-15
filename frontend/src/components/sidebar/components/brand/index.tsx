import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <Link to="/" className="brand">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 120"
        width="32"
        height="32"
        className="brand__logo"
      >
        <rect
          x="10"
          y="10"
          width="80"
          height="100"
          fill="white"
          stroke="black"
          stroke-width="2"
          rx="5"
        />

        <circle cx="20" cy="15" r="2" fill="black" />
        <circle cx="20" cy="25" r="2" fill="black" />
        <circle cx="20" cy="35" r="2" fill="black" />
        <circle cx="20" cy="45" r="2" fill="black" />
        <circle cx="20" cy="55" r="2" fill="black" />
        <circle cx="20" cy="65" r="2" fill="black" />
        <circle cx="20" cy="75" r="2" fill="black" />
        <circle cx="20" cy="85" r="2" fill="black" />
        <circle cx="20" cy="95" r="2" fill="black" />

        <line x1="30" y1="20" x2="85" y2="20" stroke="black" stroke-width="1" />
        <line x1="30" y1="30" x2="85" y2="30" stroke="black" stroke-width="1" />
        <line x1="30" y1="40" x2="85" y2="40" stroke="black" stroke-width="1" />
        <line x1="30" y1="50" x2="85" y2="50" stroke="black" stroke-width="1" />
        <line x1="30" y1="60" x2="85" y2="60" stroke="black" stroke-width="1" />
        <line x1="30" y1="70" x2="85" y2="70" stroke="black" stroke-width="1" />
        <line x1="30" y1="80" x2="85" y2="80" stroke="black" stroke-width="1" />
        <line x1="30" y1="90" x2="85" y2="90" stroke="black" stroke-width="1" />
        <line
          x1="30"
          y1="100"
          x2="85"
          y2="100"
          stroke="black"
          stroke-width="1"
        />
      </svg>

      <span className="brand__name">+pad</span>
    </Link>
  );
}
