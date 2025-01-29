import React, { ReactNode } from "react";
import "./index.css";
// import CategoryList from "./category-container/category-list";
// import UserAvatar from "./user-avatar";
// import AuthButton from "./auth-btn";

import { User } from "context/AuthContext";
import { useAuthContext } from "context/AuthContext";
import HamburgerIcon from "../../assets/svg/HambugerIcon";
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

type SidebarProps = {
  user: User | null;
};

export default function Sidebar({ user }: SidebarProps) {
  const [selectedMenu, setSelectedMenu] =
    React.useState<string>("View Categories");
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  function handleOpenMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleSelectCategory(categoryName: string): void {
    setSelectedMenu(categoryName);
  }

  return (
    <div className="sidebar">
      <span className="icon--small" onClick={handleOpenMenu}>
        menu
      </span>
      {isMenuOpen ? (
        <Menu user={user} onSelectMenu={handleSelectCategory} />
      ) : null}
    </div>
  );
}
