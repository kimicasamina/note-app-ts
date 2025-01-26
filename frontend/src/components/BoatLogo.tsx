import React from "react";

const BoatLogo: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100"
      height="100"
    >
      <path
        d="M10,60 Q50,80 90,60 Q70,50 50,50 Q30,50 10,60 Z"
        fill="#4CAF50"
      />

      <rect x="47" y="20" width="6" height="40" fill="#795548" />
      <polygon points="50,20 50,50 70,35" fill="#FFC107" />
      <path
        d="M10,60 C30,65 70,65 90,60"
        stroke="#2196F3"
        stroke-width="2"
        fill="none"
      />
    </svg>
  );
};

export default BoatLogo;
