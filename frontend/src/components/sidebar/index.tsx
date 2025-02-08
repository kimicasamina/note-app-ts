import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { CgMenuLeft } from "react-icons/cg";
import { useAuth } from "@services/context/authContext";
import CategoryList from "./category-list";
import AuthButton from "@components/sidebar/auth-button";
import Brand from "@components/sidebar/brand";
import UserProfile from "@components/sidebar/user-profile";
import CategoryNew from "./category-list/category-create";
import AddButton from "@components/ui/add-button";

const Sidebar = () => {
  const { state } = useAuth();
  const { user, loading } = state;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // if (loading) {
  //   return (
  //     <div className="sidebar">
  //       <h1>Loading Sidebar...</h1>
  //     </div>
  //   );
  // }

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
              {/* <CategoryNew /> */}
              {/* <AddButton onClick={toggleSidebar} size="42px" /> */}
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
