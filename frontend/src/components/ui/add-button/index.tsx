import React from "react";
import "./index.css";

interface AddButtonProps {
  onClick: () => void;
  size?: string;
  color?: string;
  style?: React.CSSProperties;
}

export default function AddButton({
  onClick,
  size = "60px",
  color = "#ff5733",
  style,
}: AddButtonProps) {
  return (
    <div
      className="floatingAddButton"
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: `${parseInt(size) / 2}px`, // Make button circular
        backgroundColor: color,
        ...style,
      }}
    >
      <span className="add-icon">+</span>
    </div>
  );
}
