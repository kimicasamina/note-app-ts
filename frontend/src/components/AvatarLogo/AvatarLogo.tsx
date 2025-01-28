// AvatarLogo.tsx
import React from "react";

// Define the props type for customization options
interface AvatarLogoProps {
  size?: string; // Size of the logo (e.g., 30px, 50px)
  color?: string; // Fill color of the logo (e.g., #ff6347, blue)
  className?: string; // Optional class for additional styles
}

const AvatarLogo: React.FC<AvatarLogoProps> = ({
  size = "30px", // Default size is 30px
  color = "#000", // Default color is black
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
    >
      {/* Avatar Icon */}
      <circle cx="50" cy="50" r="45" fill={color} />
      <circle cx="50" cy="40" r="12" fill="#fff" />
      <rect x="40" y="58" width="20" height="30" rx="5" ry="5" fill="#fff" />
    </svg>
  );
};

export default AvatarLogo;
