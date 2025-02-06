import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { CgMenuLeft } from "react-icons/cg";
import { User } from "types/types";
import Menu from "./menu";

const menus = [
  {
    id: 1,
    label: "categories",
    name: "categories",
  },
  {
    id: 2,
    label: "create new notes",
    name: "new",
  },
  {
    id: 3,
    label: "edit",
    name: "edit notes",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("View Categories");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleOpenMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleSelectCategory(categoryName: string): void {
    setSelectedMenu(categoryName);
  }

  return (
    <div className="sidebar">
      <span className="icon--small" onClick={handleOpenMenu}>
        <CgMenuLeft />
      </span>
      {isMenuOpen ? <Menu onSelectMenu={handleSelectCategory} /> : null}
    </div>
  );
}
