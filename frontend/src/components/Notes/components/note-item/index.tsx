import React from "react";
import { Note } from "types/types";
import "./index.css";

interface NoteItemProps {
  note: Note;
  selectedNote: string | null;
  onSelect: (noteId: string) => void;
}

const NoteItem = ({ note, selectedNote, onSelect }: NoteItemProps) => {
  return (
    <div
      className={`note-item ${selectedNote === note.id ? "active" : ""}`}
      onClick={() => onSelect(note.id)}
    >
      <h3 className="note-title">{note.title}</h3>
    </div>
  );
};

export default NoteItem;
