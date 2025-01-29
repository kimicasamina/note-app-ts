import React from "react";
import { type User } from "types/custom";
import UserAvatar from "./user-avatar";
import AuthButton from "./auth-btn";
import "./index.css";

export default function Menu({
  user,
  onSelect,
}: {
  user: User;
  onSelect: () => string;
}) {
  return (
    <div className="menu">
      {user.isAuthenticated ? (
        <>
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
