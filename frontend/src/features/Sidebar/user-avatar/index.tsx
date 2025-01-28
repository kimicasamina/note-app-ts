import React from "react";
import { UserProps } from "features/Sidebar/models";

export default function UserAvatar({ user }: UserProps) {
  return (
    <div className="">
      <span className="">Hello, {user.username}</span>
    </div>
  );
}
