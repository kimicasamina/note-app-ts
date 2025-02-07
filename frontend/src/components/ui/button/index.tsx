import React from "react";
import "./index.css";

interface ButtonProps {
  label: string;
  isLoading: boolean;
  type?: "button" | "submit";
  onClick: React.MouseEventHandler<HTMLButtonElement> | null;
}

export default function Button({
  label,
  isLoading,
  type = "submit",
  onClick, // Destructure onClick properly
}: ButtonProps) {
  return (
    <button
      className={`button ${isLoading ? "is-loading" : ""}`}
      type={type}
      disabled={isLoading}
      onClick={onClick ? onClick : undefined}
    >
      {isLoading ? <span className="loading-text">Please wait...</span> : label}
    </button>
  );
}
