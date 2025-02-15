import React from "react";
import { Note } from "types/types";
import "./index.css";
import NoteItem from "../note-item";
import { useStore } from "@store/useStore";

interface NotesListProps {
  notes: Note[];
}

const NotesList = ({ notes }: NotesListProps) => {
  const { setSelectedNote, selectedNote, resetState } = useStore();

  const handleSelectNote = (noteId: string) => {
    // resetState();
    setSelectedNote(noteId);
  };

  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <NoteItem
          note={note}
          key={note.id}
          selectedNote={selectedNote}
          onSelect={handleSelectNote}
        />
      ))}
    </ul>
  );
};

export default NotesList;
