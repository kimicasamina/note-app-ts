import React from "react";
// import styles from "./LoadingSpinner.scss";

interface LoadingSpinnerProps {
  size?: string; // Optional size for the spinner (default: 40px)
  color?: string; // Optional color for the spinner (default: #3498db)
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "40px",
  color = "#3498db",
}) => {
  return (
    <div
      // className={styles.loadingSpinner}
      style={{ width: size, height: size }}
    >
      <div
        // className={styles.spinnerCircle}
        style={{ borderColor: color }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
