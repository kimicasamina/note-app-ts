import React, { useEffect, useState } from "react";
import "./index.css";
import { useQuery } from "react-query";
import { getNotesApi } from "@api/notesApi";
import LoadingDots from "@components/LoadingDots/LoadingDots";
import { useSelectedItem } from "@context/selectedItemContext";

interface NotesProps {
  selectedCategory: string | null;
}

interface Note {
  category_id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  title: string;
  user_id: string;
}

export default function Notes() {
  const { selectedCategory, onSelectNote } = useSelectedItem();
  const { data, isLoading, isError, error } = useQuery("notes", getNotesApi);
  const [notes, setNotes] = useState<Note[] | null>(null);

  useEffect(() => {
    // Update notes based on the selected category when data is available
    if (data && selectedCategory) {
      const filteredNotes = data.filter(
        (note: Note) => note.category_id == selectedCategory
      );
      setNotes(filteredNotes);
    }
  }, [data, selectedCategory]);

  // Loading state
  if (isLoading) {
    return <LoadingDots />;
  }

  // Error handling
  if (isError) {
    return <h1>Unable to retrieve notes... {(error as Error).message}</h1>;
  }

  // If no notes found
  if (!notes || notes.length === 0) {
    return <h3>No notes available for this category.</h3>;
  }

  return (
    <ul className="notes">
      {notes.map((note) => (
        <li
          className="note"
          key={note.id}
          onClick={() => onSelectNote(note.id)}
        >
          <h3 className="note__title">{note.title}</h3>
          <p className="note__content">{note.content}</p>
        </li>
      ))}
    </ul>
  );
}
