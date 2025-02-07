import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { CgMenuLeft } from "react-icons/cg";

import { useAuth } from "@context/authContext";
import CategoryList from "@components/CategoriesList";
import UserAvatar from "@components/UserAvatar";
import AuthButton from "@components/AuthButton";
import Brand from "@components/Brand";
import LoadingDots from "@components/LoadingDots/LoadingDots";

const menus = [
  {
    id: 1,
    label: "categories",
    name: "categories",
  },
  {
    id: 2,
    label: "create new notes",
    name: "new",
  },
  {
    id: 3,
    label: "edit",
    name: "edit notes",
  },
];

export default function Sidebar() {
  const { user, loading } = useAuth();
  const [isSidebar, setIsSidebar] = useState(false);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setIsSidebar((prev) => (prev = !prev));
  };

  if (loading) {
    return <h1 className="">Loading Sidebar...</h1>;
  }

  return (
    <div className="sidebar">
      <span className="sidebar__icon" onClick={handleToggleSidebar}>
        <CgMenuLeft />
      </span>
      {isSidebar ? (
        <>
          {/* <Brand /> */}
          <div className="sidebar__container">
            {user ? (
              <>
                <CategoryList />
                <UserAvatar user={user} />
                <AuthButton user={user} />
              </>
            ) : (
              <>
                <div className="sidebar__welcome">
                  <h1 className="sidebar__welcome--title">
                    Welcome to our App!
                  </h1>
                  <p className="sidebar__welcome--subtitle">
                    Sign up and log in to access all the features and start
                    managing your notes.
                  </p>
                </div>
                <AuthButton user={user} />
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
