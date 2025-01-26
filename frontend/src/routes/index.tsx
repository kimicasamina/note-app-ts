import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));
const PrivateLayout = lazy(() => import("../layouts/PrivateLayout"));
const GuestLayout = lazy(() => import("../layouts/GuestLayout"));
import LoadingDots from "../components/LoadingDots";

const AppRoutes = () => (
  <Suspense fallback={<LoadingDots />}>
    <Routes>
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>

      <Route element={<PrivateLayout />}></Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
