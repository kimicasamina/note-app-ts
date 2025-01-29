import React, { ReactNode } from "react";
import { AuthContextType } from "context/AuthContext";
import UserAvatar from "./user-avatar";
import AuthButton from "./auth-btn";
import "./index.css";
import CategoryList from "./category-list";
import { User } from "context/AuthContext";

const Menus = [
  {
    id: 1,
    name: "view",
    label: "View Categories",
  },
  {
    id: 2,
    name: "edit",
    label: "Edit Categories",
  },
  {
    id: 3,
    name: "delete",
    label: "Delete Categories",
  },
];

type MenuProps = {
  user: User | null;
  onSelectMenu: (categoryName: string) => void;
};

export default function Menu({ user, onSelectMenu }: MenuProps): ReactNode {
  return (
    <div className="menu">
      {user ? (
        <>
          <CategoryList
            items={Menus}
            render={(item) => <div>{item.label}</div>}
            onSelectMenu={onSelectMenu} // Pass the handler directly
          />
          <UserAvatar user={user} />
          <AuthButton user={user} />
        </>
      ) : (
        <>
          <h3 className="menu__title">
            <span className="menu__title--heading">Welcome!</span>
            <span className="menu__title--subheading">
              sign in to start and create a new note.
            </span>
          </h3>
          <AuthButton user={user} />
        </>
      )}
    </div>
  );
}
