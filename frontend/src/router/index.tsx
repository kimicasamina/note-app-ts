import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@context/authContext";
// import Home from "@pages/Home";
// import Login from "@pages/Login";
// import Signup from "@pages/Signup";
// import MainLayout from "@layouts/MainLayout";

// Lazy loading the components
const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Signup = React.lazy(() => import("../pages/Signup"));
const MainLayout = React.lazy(() => import("../layouts/MainLayout"));

export default function RouterComponent() {
  const { state } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="/login"
          element={state.user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={state.user ? <Navigate to="/" /> : <Signup />}
        />
      </Route>
    </Routes>
  );
}
