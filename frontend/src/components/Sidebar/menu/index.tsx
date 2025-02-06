// components/menu.tsx
import React, { ReactNode, useEffect, useState } from "react";
import UserAvatar from "./user-avatar";
import AuthButton from "./auth-btn";
import CategoryList from "./category-list";
import "./index.css";
import { useAuth } from "@context/authContext";

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
  onSelectMenu,
}: {
  onSelectMenu: (categoryName: string) => void;
}): ReactNode {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1 className="">Loading user data...</h1>;
  }

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
          <AuthButton user={null} />
        </>
      )}
    </div>
  );
}
