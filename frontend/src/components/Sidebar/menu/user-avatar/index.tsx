import React from "react";
import { User } from "../../../../context/AuthContext";
import { CgProfile } from "react-icons/cg";

type UserAvatarProps = {
  user: User;
};

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div className="">
      <span className="">
        <CgProfile />
      </span>
      <span className="">Hello, {user.username}</span>
    </div>
  );
}
