import React from "react";

type NoteIconProps = {
  width: string;
  height: string;
};

export default function NoteIcon({ width, height }: NoteIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 400 200"
    >
      <rect
        x="20"
        y="20"
        width={width}
        height={height}
        fill="#f1f1f1"
        stroke="#000"
        stroke-width="2"
        rx="10"
      />

      <line x1="30" y1="40" x2="150" y2="40" stroke="#000" stroke-width="1" />
      <line x1="30" y1="60" x2="150" y2="60" stroke="#000" stroke-width="1" />
      <line x1="30" y1="80" x2="150" y2="80" stroke="#000" stroke-width="1" />
      <line x1="30" y1="100" x2="150" y2="100" stroke="#000" stroke-width="1" />
      <line x1="30" y1="120" x2="150" y2="120" stroke="#000" stroke-width="1" />
      <line x1="30" y1="140" x2="150" y2="140" stroke="#000" stroke-width="1" />
      <line x1="30" y1="160" x2="150" y2="160" stroke="#000" stroke-width="1" />

      <text
        x="180"
        y="100"
        font-family="Arial, serif"
        font-size="52"
        fill="#fff"
      >
        Noted
      </text>
    </svg>
  );
}
