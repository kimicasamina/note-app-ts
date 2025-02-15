import React from "react";
import "./index.css";

import Note from "@components/Note";
import Notes from "@components/Notes";
import { useAuth } from "@context/authContext";
import "./index.css";
import { Navigate } from "react-router-dom";
import LoadingDots from "@components/ui/loading-dots";

export default function Home() {
  const { state } = useAuth();
  const { user, loading } = state;

  if (loading) {
    <LoadingDots />;
  }

  return user ? (
    <div className="home">
      <Notes />
      <Note />
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
