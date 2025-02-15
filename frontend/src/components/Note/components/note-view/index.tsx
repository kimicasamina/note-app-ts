import React from "react";
import "./index.css";

export default function NoteView({
  value,
  title,
}: {
  value: string;
  title: string;
}) {
  return (
    <div className="note-editor-view">
      <h2 className="note-header-title">{title}</h2>
      <div
        className="note-editor-view-content"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
