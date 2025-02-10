import React from "react";
import { CgSearch } from "react-icons/cg";
import "./index.css";

type SearchBarProps = {
  noteTitle: string | undefined;
  handleSearchNote: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({
  noteTitle,
  handleSearchNote,
}: SearchBarProps) {
  return (
    <div className="searchbar">
      <CgSearch className="search-icon" />

      <input
        type="text"
        value={noteTitle || ""}
        onChange={handleSearchNote}
        placeholder="Search notes..."
        className="searchbar-input"
      />
    </div>
  );
}
