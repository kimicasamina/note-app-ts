import React, { useState, useEffect } from "react";
import "./index.css";
import { useSelectedItem } from "@context/selectedItemContext";
import { queryClient } from "@utils/queryClient";

interface Note {
  category_id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  title: string;
  user_id: string;
}

export default function Editor() {
  const { selectedNote } = useSelectedItem();
  console.log("SELECTEDNOTE", selectedNote);
  // Explicitly type the data as an array of Notes or undefined
  const data = queryClient.getQueryData<Note[]>("notes");
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    // Update notes based on the selected category when data is available
    if (data && selectedNote) {
      // Find a single note based on the selected category
      const selectedNoteData = data.find((note) => note.id === selectedNote);
      console.log("hello", selectedNoteData);
      setNote(selectedNoteData || null); // Set note or null if no note is found
    }
  }, [data, selectedNote]);

  return (
    <div className="note-editor">
      {note ? (
        <div className="note-editor__view">
          <h3 className="note-editor__view--title">{note.title}</h3>
          <p className="note-editor__view--content">{note.content}</p>
        </div>
      ) : (
        <p className="empty-item">No notes available for this category.</p>
      )}
    </div>
  );
}
