import React from "react";
import "../styles/components/_loadingSpinner.scss";

interface LoadingSpinnerProps {
  size?: string; // Optional size for the spinner (default: 40px)
  color?: string; // Optional color for the spinner (default: #3498db)
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "40px",
  color = "#3498db",
}) => {
  return (
    <div className="loading-spinner" style={{ width: size, height: size }}>
      <div className="spinner-circle" style={{ borderColor: color }}></div>
    </div>
  );
};

export default LoadingSpinner;
