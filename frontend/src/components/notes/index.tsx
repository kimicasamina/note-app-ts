import React, { useEffect, useState } from "react";
import "./index.css";
import NotesList from "./note-list";
import { Note } from "types/types";
import AddButton from "@components/ui/add-button";
import { useCreateNote, useNotes } from "@hooks/notes/useNotes";
import { useStore } from "@store/useStore";
import { CgSearch } from "react-icons/cg";

import useModal from "@hooks/useModal";
import NoteForm from "./note-form";
import Modal from "@components/ui/modal";
import SearchBar from "./search-bar";

export default function Notes() {
  const { selectedCategory } = useStore();
  const { data, isLoading, error } = useNotes();
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteTitle, setNoteTitle] = useState<string | undefined>(undefined);
  const { isOpen, open, close } = useModal();

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

  return (
    <div className="notes">
      <SearchBar noteTitle={noteTitle} handleSearchNote={handleSearchNote} />
      {isLoading && <div className="">Loading notes...</div>}
      {!isLoading && notes.length > 0 ? (
        <NotesList notes={notes} />
      ) : (
        <h1 className="">No notes..</h1>
      )}
      {isOpen ? (
        <Modal onClose={close}>
          <NoteForm close={close} />
        </Modal>
      ) : (
        <AddButton
          onClick={handleAddNote}
          size="38px"
          style={{
            // background: "red",
            bottom: "20px",
            position: "absolute",
            // top: "-0",
          }}
        />
      )}
    </div>
  );
}
