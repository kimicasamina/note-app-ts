import Sidebar from "../../components/Sidebar";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import "./MainLayout.css";
import { useAuth } from "../../context/AuthContext";
import { type User } from "types/custom";
export default function MainLayout() {
  const { state } = useAuth();

  return (
    <div className="mainLayout">
      <Sidebar user={state} />
      <Outlet />
    </div>
  );
}
