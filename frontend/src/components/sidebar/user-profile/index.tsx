import React from "react";
import { CgProfile } from "react-icons/cg";
import { User } from "types/types";
import "./index.css";
type UserAvatarProps = {
  user: User | null;
};

export default function UserProfile({ user }: UserAvatarProps) {
  return (
    <div className="user">
      <CgProfile className="user__icon" />
      <span className="user__name">{user?.username}</span>
    </div>
  );
}
