import React, { useEffect, useState } from "react";
import { useNotes, useUpdateNote } from "@hooks/notes/useNotes";
import LoadingDots from "@components/ui/loading-dots";
import { CgEye, CgPen } from "react-icons/cg";
import TextEditor from "./text-editor";
import { useStore } from "@store/useStore";
import { Note } from "types/types";
import "./index.css";
import NoteView from "@components/note-view";

interface UpdateNoteProps {
  note_id: string;
  note: Note;
}

export default function NoteEditor() {
  const { selectedNote } = useStore();
  const { data, isLoading, error } = useNotes();

  const [note, setNote] = useState<Note | null>(null);
  const { mutate: updateNote } = useUpdateNote();
  const [editorValue, setEditorValue] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Early return to handle loading and error states
  if (isLoading) return <LoadingDots />;
  if (error) return <h1>Error: {error.message}</h1>;

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

  if (!note) {
    return <h1>Select a note to edit</h1>;
  }

  return (
    <div className="note-editor">
      <NoteHeader
        title={note.title}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        handleSave={handleSave}
        isSaving={isSaving}
      />

      {isSaving ? (
        <h1 className="">Loading...</h1>
      ) : (
        <div>
          {isEditMode ? (
            <TextEditor value={editorValue} onChange={handleTextChange} />
          ) : (
            <NoteView value={editorValue} />
          )}
        </div>
      )}
    </div>
  );
}

function NoteHeader({
  title,
  isEditMode,
  setIsEditMode,
  handleSave,
  isSaving,
}: {
  title: string;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: () => void;
  isSaving: boolean;
}) {
  return (
    <div className="note-header">
      <h2>{title}</h2>

      <div className="note-header-buttons">
        <div>
          <button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
        {isEditMode ? (
          <CgEye
            className="note-editor-icon"
            onClick={() => setIsEditMode(false)}
          />
        ) : (
          <CgPen
            className="note-editor-icon"
            onClick={() => setIsEditMode(true)}
          />
        )}
      </div>
    </div>
  );
}
