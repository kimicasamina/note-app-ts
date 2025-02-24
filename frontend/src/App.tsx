import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/global.css";
import "./styles/_variables.css";
import "./styles/_utils.css";
import "./styles/_animations.css";
import RouterComponent from "./router";
import LoadingDots from "@components/ui/loading-dots";

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingDots />}>
        <RouterComponent /> {/* Render the router here */}
      </Suspense>
    </Router>
  );
}
