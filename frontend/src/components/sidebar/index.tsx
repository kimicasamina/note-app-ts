import Brand from "@components/sidebar/components/brand";
import UserProfile from "@components/sidebar/components/user-profile";
import AddButton from "@components/ui/add-button";
import { useAuth } from "@context/authContext";
import React, { useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import AuthButton from "./components/auth-button";
import CategoryList from "./components/category-list";
import CategoryNew from "./components/category-list/category-create";
import NoteIcon from "@components/ui/note-icon";
import "./index.css";

const Sidebar = () => {
  const { state } = useAuth();
  const { user, loading } = state;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="sidebar">
        <h1>Loading Sidebar...</h1>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <span className="sidebar__icon" onClick={toggleSidebar}>
        <CgMenuLeft />
      </span>
      {isSidebarOpen && (
        <div className="sidebar__container">
          {user ? (
            <>
              <CategoryList />
              <UserProfile user={user} />
              <AuthButton user={user} />
            </>
          ) : (
            <>
              <div className="sidebar__welcome">
                <h1 className="sidebar__welcome--title">Welcome to our App!</h1>
                <p className="sidebar__welcome--subtitle">
                  Sign up and log in to access all the features and start
                  managing your notes.
                </p>
              </div>
              <AuthButton user={user} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
