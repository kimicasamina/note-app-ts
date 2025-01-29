import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingDots from "components/LoadingDots/LoadingDots";

// Lazy loading the components
const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Signup = React.lazy(() => import("../pages/Signup"));
const MainLayout = React.lazy(() => import("../layouts/MainLayout/MainLayout"));

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
