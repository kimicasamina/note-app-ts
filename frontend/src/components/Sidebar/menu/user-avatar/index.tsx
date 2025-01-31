import React from "react";
import { User } from "../../../../context/AuthContext";
import { CgProfile } from "react-icons/cg";
import "./index.css";
type UserAvatarProps = {
  user: User;
};

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div className="userAvatar">
      <span className="">
        <CgProfile />
      </span>
      <span className="">{user.username}</span>
    </div>
  );
}
