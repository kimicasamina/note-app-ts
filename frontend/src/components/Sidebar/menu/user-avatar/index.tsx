import React from "react";
import { User } from "../../../../context/AuthContext";

type UserAvatarProps = {
  user: User;
};

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div className="">
      <span className="">Hello, {user.username}</span>
    </div>
  );
}
