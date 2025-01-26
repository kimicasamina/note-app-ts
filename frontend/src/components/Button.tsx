// src/components/Button.tsx
import React from "react";
import "../styles/components/_button.scss";

interface ButtonProps {
  color?: string;
  size?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  color = "primary",
  size = "medium",
  onClick,
  children,
}) => {
  return (
    <button className={`button ${color} ${size}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
