import React from "react";
import "./index.css";
import Notes from "@features/notes";
import Editor from "@features/editor";

import "./index.css";
export default function Home() {
  return (
    <div className="home">
      <Notes />
      <Editor />
    </div>
  );
}
