import React, { useEffect, useState } from "react";
import "./index.css";
import NotesList from "./note-list";
import { Note } from "types/types";
import AddButton from "@components/ui/add-button";
import { useCreateNote, useNotes } from "@hooks/notes/useNotes";
import { useStore } from "@store/useStore";
import useModal from "@hooks/useModal";
import NoteForm from "./note-form";
import Modal from "@components/ui/modal";

export default function Notes() {
  const { selectedCategory } = useStore();
  const { data, isLoading, error } = useNotes();
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteTitle, setNoteTitle] = useState<string | undefined>(undefined);
  const { isOpen, open, close } = useModal();

  // Handle search input change
  const handleSearchNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNoteTitle(value || undefined); // If value is empty, reset the filter
  };

  const handleAddNote = () => {
    open();
  };

  // Filter notes based on category and title
  useEffect(() => {
    if (selectedCategory && data) {
      // Filter notes based on the selected category
      let filtered = data.filter(
        (note) => note.category_id === selectedCategory
      );

      if (noteTitle) {
        // Filter by note title
        filtered = filtered.filter((note) => note.title.includes(noteTitle));
      }

      setNotes(filtered);
    }
  }, [selectedCategory, noteTitle, data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading notes: {error.message}</div>;

  return (
    <div className="notes">
      <input
        type="text"
        value={noteTitle || ""}
        onChange={handleSearchNote}
        placeholder="Search notes..."
        className="notes-filter-input"
      />
      {notes.length > 0 ? (
        <NotesList notes={notes} />
      ) : (
        <h1 className="">No notes..</h1>
      )}
      {isOpen ? (
        <Modal onClose={close}>
          <NoteForm close={close} />
        </Modal>
      ) : (
        <AddButton onClick={handleAddNote} />
      )}
    </div>
  );
}
