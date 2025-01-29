import React from "react";

// import CategoryList from "./category-container/category-list";
// import UserAvatar from "./user-avatar";
// import AuthButton from "./auth-btn";

import { type User } from "types/custom";
import HamburgerIcon from "../../assets/svg/HambugerIcon";
import Menu from "./menu";

const menus = [
  {
    id: 1,
    label: "notes",
    name: "notes",
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

export default function Sidebar({ user }: { user: User }) {
  const [selectedMenu, setSelectedMenu] = React.useState<string>("notes");
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelectMenu = (e: string) => {
    setSelectedMenu(e);
  };

  return (
    <div className="sidebar">
      <span className="icon--small" onClick={handleOpenMenu}>
        menu
        {/* <HamburgerIcon fill="red" className="" /> */}
      </span>
      {isMenuOpen ? <Menu user={user} onSelect={handleSelectMenu} /> : null}

      {/* <CategoryList />

      <UserAvatar user={user} />
      <AuthButton user={user} /> */}
    </div>
  );
}
