import React from "react";
import "../styles/components/_loadingDots.scss";

interface LoadingDotsProps {
  size?: string; // Optional size for the dots (default: 30px)
  color?: string; // Optional color for the dots (default: #3498db)
}

const LoadingDots: React.FC<LoadingDotsProps> = ({
  size = "30px",
  color = "#3498db",
}) => {
  return (
    <div className="loading-dots" style={{ width: size, height: size }}>
      <div className="dot" style={{ backgroundColor: color }}></div>
      <div className="dot" style={{ backgroundColor: color }}></div>
      <div className="dot" style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default LoadingDots;
