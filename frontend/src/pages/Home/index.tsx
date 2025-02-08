import React from "react";
import "./index.css";
import Notes from "@components/notes";
import NoteEditor from "@components/note-editor";
import { useAuth } from "@context/authContext";
import "./index.css";

export default function Home() {
  const { state } = useAuth();

  return (
    <div className="home">
      {state.user ? (
        <>
          <Notes />
          <NoteEditor />
        </>
      ) : null}
    </div>
  );
}
