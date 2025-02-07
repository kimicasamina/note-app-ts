import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useGetCurrentUser } from "@hooks/useUser";
import { useNavigate } from "react-router-dom";
import "./MainLayout.css";
import { queryClient } from "@utils/queryClient";
import { useAuth } from "@context/authContext";

export default function MainLayout() {
  const { user } = useAuth();
  return (
    <div className="main__layout">
      <Sidebar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
