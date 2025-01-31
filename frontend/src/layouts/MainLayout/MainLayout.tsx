import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useCurrentUser } from "@hooks/useUser";
import { useNavigate } from "react-router-dom";
import "./MainLayout.css";

export default function MainLayout() {
  const { data: user, isLoading, isError } = useCurrentUser();

  console.log("FECTHING...", user);

  // Loading state
  if (isLoading) {
    return <h1>Loading user data...</h1>;
  }
  if (!isLoading) {
    console.log("DONE FETCHING...", user);
  }

  // Error state (e.g., invalid token)
  // if (isError || !user) {
  //   return <h1>Error loading user data. Please log in again.</h1>;
  // }
  return (
    <div className="main__layout">
      <Sidebar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
