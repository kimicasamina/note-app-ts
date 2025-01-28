import React from "react";
import brand from "../../assets/svg/brand.svg";
import CategoryList from "./components/category-container/category-list";
import UserAvatar from "./components/user-avatar";
import "./index.css";
import AuthButton from "./components/auth-btn";
import { User } from "./models";
export default function Sidebar() {
  const [user, setUser] = React.useState<User>({
    id: 1,
    username: "kimi",
    email: "kimi@gmail.com",
  });
  return (
    <div className="sidebar">
      <img src={brand} alt="" className="sidebar__menu--btn" />
      <CategoryList />

      <UserAvatar user={user} />
      <AuthButton user={user} />
    </div>
  );
}
