import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="main__layout">
      <Sidebar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
