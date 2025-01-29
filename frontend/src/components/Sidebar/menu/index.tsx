import React, { ReactNode } from "react";
import { type User } from "types/custom";
import UserAvatar from "./user-avatar";
import AuthButton from "./auth-btn";
import "./index.css";
import CategoryList from "./category-list";

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

export default function Menu({
  user,
  onSelectMenu,
}: {
  user: User;
  onSelectMenu: (categoryName: string) => void;
}): ReactNode {
  return (
    <div className="menu">
      {user.isAuthenticated ? (
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
