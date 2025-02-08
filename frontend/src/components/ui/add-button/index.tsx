import React from "react";
import "./index.css";

interface AddButtonProps {
  onClick: () => void; // The function to handle button click
  size?: string; // Optional size (default: 60px)
  color?: string; // Optional background color (default: #ff5733)
}

export default function AddButton({
  onClick,
  size = "60px",
  color = "#ff5733", // Red color by default
}: AddButtonProps) {
  // Fixed here, removed the extra "<>"
  return (
    <div
      className="floatingAddButton" // Fixed typo here
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: `${parseInt(size) / 2}px`, // Make button circular
        backgroundColor: color,
      }}
    >
      <span className="add-icon">+</span>
    </div>
  );
}
