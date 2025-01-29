import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingDots from "components/LoadingDots/LoadingDots";
// Lazy loading the components
const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Signup = React.lazy(() => import("../pages/Signup"));
const MainLayout = React.lazy(() => import("../layouts/MainLayout/MainLayout"));

export default function router() {
  return (
    <Suspense fallback={<LoadingDots />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route index element={<Login />} />
          <Route index element={<Signup />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
