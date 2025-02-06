import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingDots from "components/LoadingDots/LoadingDots";
import { useAuth } from "@context/authContext";

// Lazy loading the components
const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Signup = React.lazy(() => import("../pages/Signup"));
const MainLayout = React.lazy(() => import("../layouts/MainLayout/MainLayout"));

export default function Router() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
      </Route>
    </Routes>
  );
}
