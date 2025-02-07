import React from "react";
import { useQuery } from "react-query";
import { getNotesApi } from "@api/notesApi";
import LoadingDots from "@components/ui/loading-dots";
import NoteItem from "@components/notes/NoteItem";

export default function Notes() {
  // const {
  //   data: notes,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery("notes", getNotesApi);

  // if (isLoading) return <LoadingDots />;
  // if (isError) return <div>{(error as Error).message}</div>;

  return (
    <div className="notes-list">
      Notes
      {/* {notes && notes.map((note) => <NoteItem key={note.id} note={note} />)} */}
    </div>
  );
}
