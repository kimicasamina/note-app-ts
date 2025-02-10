import React, { useEffect, useState } from "react";
import "./index.css";
import { useStore } from "@store/useStore";
import { useNotes } from "@hooks/notes/useNotes";
import { Note } from "types/types";

export default function NoteEditor() {
  const { selectedNote } = useStore();
  const { data, isLoading, error } = useNotes();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    if (selectedNote && data) {
      const filtered = data.filter((item) => item.id === selectedNote);
      setNote(filtered.length > 0 ? filtered[0] : null); // Set the first matching note or null if not found
    }
  }, [selectedNote, data]); // Ensure the effect runs when selectedNote or data changes

  return (
    <div className="note-editor">
      <h2>Note Editor</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading note</p>
      ) : note ? (
        <div>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ) : (
        <p>No note selected or note not found.</p>
      )}
    </div>
  );
}
