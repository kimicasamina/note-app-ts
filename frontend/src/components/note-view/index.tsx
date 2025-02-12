import React from "react";
import "./index.css";

export default function NoteView({ value }: { value: string }) {
  return (
    <div
      className="note-editor-view"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}
