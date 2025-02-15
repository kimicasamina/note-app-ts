import React, { useEffect, useState } from "react";
import { useDeleteNote, useNotes, useUpdateNote } from "@hooks/notes/useNotes";
import LoadingDots from "@components/ui/loading-dots";
import { CgEye, CgPen } from "react-icons/cg";
import { BiSave } from "react-icons/bi";

import { ContentEditor } from "./components/content-editor";
import { useStore } from "@store/useStore";
import { Note as NoteType } from "types/types";
import "./index.css";
import NoteView from "./components/note-view";
import NoteHeader from "./components/note-header";

export default function Note() {
  const { selectedNote } = useStore();
  const { data, isLoading, error } = useNotes();

  const [note, setNote] = useState<NoteType | null>(null);
  const { mutate: updateNote } = useUpdateNote();
  const { mutate: deleteNote, isLoading: isDeleting } = useDeleteNote();
  const [editorValue, setEditorValue] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data && selectedNote) {
      const selected = data.find((note) => note.id === selectedNote);
      if (selected) {
        setNote(selected);
        setEditorValue(selected.content || "");
      }
    }
  }, [data, selectedNote]);

  const handleTextChange = (newValue: string) => {
    setEditorValue(newValue);
  };

  const handleSave = async () => {
    if (!note) return;

    try {
      setIsSaving(true);
      await updateNote({
        note_id: note.id,
        note: {
          ...note,
          content: editorValue,
        },
      });
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
      alert("Failed to save the note.");
    }
  };

  const handleDelete = async () => {
    if (note) {
      try {
        await deleteNote(note.id);
        // alert("Note deleted successfully.");
      } catch (error) {
        console.error("Failed to delete note:", error);
        // alert("Error deleting the note.");
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        handleSave();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [note, editorValue]);

  // Early return to handle loading and error states
  if (isLoading) return <LoadingDots />;
  if (error) return <h1>Error: {error.message}</h1>;
  if (!note) {
    return <h2 className="info-message">Note not found</h2>;
  }
  if (!selectedNote) {
    return <h2 className="info-message">Please select a note</h2>;
  }

  return (
    <div className="note">
      <NoteHeader
        title={note.title}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        handleSave={handleSave}
        isSaving={isSaving}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
      />

      {isSaving ? (
        <LoadingDots />
      ) : (
        <div className="note-container">
          {isEditMode ? (
            <ContentEditor
              title={note.title}
              value={editorValue}
              onChange={handleTextChange}
            />
          ) : (
            <NoteView value={editorValue} title={note.title} />
          )}
        </div>
      )}
    </div>
  );
}
