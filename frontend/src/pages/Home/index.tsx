import React from "react";
import "./index.css";
import Notes from "@components/notes";
import NoteEditor from "@components/note-editor";
import { useAuth } from "@services/context/authContext";
import "./index.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      {user ? (
        <>
          <Notes />
          <NoteEditor />
        </>
      ) : null}
    </div>
  );
}
