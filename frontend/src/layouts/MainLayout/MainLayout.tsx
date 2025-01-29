import React from "react";
import "./MainLayout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useAuthContext } from "../../context/AuthContext";

export default function MainLayout() {
  const { user } = useAuthContext(); // Correct hook usage

  return (
    <div className="main__layout">
      <Sidebar user={user} />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
