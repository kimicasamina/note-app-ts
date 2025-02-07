import React from "react";
import "./index.css";
import Notes from "@features/notes";
import Editor from "@features/editor";

import "./index.css";
import useCategory from "@hooks/useCategory";
import { useAuth } from "@context/authContext";
export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      {user ? (
        <>
          <Notes />
          <Editor />
        </>
      ) : null}
    </div>
  );
}
