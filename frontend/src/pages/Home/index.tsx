import React from "react";
import "./index.css";
import Editor from "../../features/note/editor";
import NoteList from "../../features/note/note-list";
import "./index.css";
export default function Home() {
  return (
    <div className="home">
      <NoteList />
      <Editor />
    </div>
  );
}
