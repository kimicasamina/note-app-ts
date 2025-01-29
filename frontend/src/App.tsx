import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/global.css";
import "./styles/_variables.css";
import "./styles/_utils.css";
import "./styles/_animations.css";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
