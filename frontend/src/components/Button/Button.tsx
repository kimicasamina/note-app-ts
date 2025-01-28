import React, { ReactElement } from "react";

interface ButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export default function Button({
  className,
  onClick,
  children,
}: ButtonProps): ReactElement {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
