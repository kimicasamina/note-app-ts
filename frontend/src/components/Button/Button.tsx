// components/Button.tsx
import React from "react";

interface ButtonProps {
  label: string;
  isLoading: boolean;
  type?: "button" | "submit";
}

export default function Button({
  label,
  isLoading,
  type = "submit",
}: ButtonProps) {
  return (
    <button type={type} disabled={isLoading}>
      {isLoading ? "Please wait..." : label}
    </button>
  );
}
