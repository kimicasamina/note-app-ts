import React from "react";
import { type User } from "types/custom";

export default function UserAvatar({ user }: { user: User }) {
  return (
    <div className="">
      <span className="">Hello, {user.username}</span>
    </div>
  );
}
