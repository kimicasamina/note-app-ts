import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@components/sidebar";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { queryClient } from "@utils/axiosClient";
import { useAuth } from "@services/context/authContext";

export default function MainLayout() {
  const { state } = useAuth();

  // TODO: replace with loading dots or add to the context
  if (state.loading) {
    return <h1 className="">Loading...</h1>;
  }

  return (
    <div className="main__layout">
      <Sidebar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
