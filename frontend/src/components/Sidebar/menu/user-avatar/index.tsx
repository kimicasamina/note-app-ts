import React from "react";
import { CgProfile } from "react-icons/cg";
import { User } from "types/types";
import "./index.css";
type UserAvatarProps = {
  user: User | null;
};

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div className="userAvatar">
      <span className="">
        <CgProfile />
      </span>
      <span className="">{user?.username}</span>
    </div>
  );
}
