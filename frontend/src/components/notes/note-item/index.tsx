import React from "react";
import { Note } from "types/types";
import "./index.css";
import { useStore } from "@store/useStore";

interface NoteItemProps {
  note: Note;
}

const NoteItem = ({ note }: NoteItemProps) => {
  const { setSelectedNote, resetState } = useStore();

  const handleSelectNote = () => {
    resetState();
    setSelectedNote(note.id);
  };

  return (
    <div className="note-item">
      <h3 className="note-title" onClick={handleSelectNote}>
        {note.title}
      </h3>
    </div>
  );
};

export default NoteItem;
