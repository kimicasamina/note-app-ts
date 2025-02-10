import React from "react";
import { Note } from "types/types";
import "./index.css";

interface NoteItemProps {
  note: Note;
}

const NoteItem = ({ note }: NoteItemProps) => {
  return (
    <div className="note-item">
      <h3 className="note-title">{note.title}</h3>
      {/* <p>{note.content}</p> */}
    </div>
  );
};

export default NoteItem;
