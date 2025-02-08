import React from "react";
import "./index.css"; // Make sure to import the CSS file

interface LoadingDotsProps {
  size?: string; // Optional size for the dots (default: 30px)
  color?: string; // Optional color for the dots (default: #3498db)
  className?: string; // Optional custom class for external styles
  styles?: React.CSSProperties; // Optional styles for inline customization
}

const LoadingDots: React.FC<LoadingDotsProps> = ({
  size = "30px",
  color = "#3498db",
  className,
  styles,
}) => {
  return (
    <div
      className={`loading-dots-container ${className}`}
      style={{ width: size, height: size, ...styles }} // Merge passed styles
    >
      <div
        className="loading-dot"
        style={{
          backgroundColor: color,
          width: size,
          height: size,
          ...styles, // Allow additional styles for individual dots
        }}
      ></div>
      <div
        className="loading-dot"
        style={{
          backgroundColor: color,
          width: size,
          height: size,
          ...styles, // Allow additional styles for individual dots
        }}
      ></div>
      <div
        className="loading-dot"
        style={{
          backgroundColor: color,
          width: size,
          height: size,
          ...styles, // Allow additional styles for individual dots
        }}
      ></div>
    </div>
  );
};

export default LoadingDots;
