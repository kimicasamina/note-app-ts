import React from "react";
import { Note } from "types/types";
import "./index.css";
import NoteItem from "../note-item";

interface NotesListProps {
  notes: Note[];
}

const NotesList = ({ notes }: NotesListProps) => {
  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <NoteItem note={note} key={note.id} />
        // <li className="note" key={note.id}>
        //   {note.title}
        // </li>
      ))}
    </ul>
  );
};

export default NotesList;
