import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/global.css";
import "./styles/_variables.css";
import "./styles/_utils.css";
import "./styles/_animations.css";
import RouterComponent from "./router";  // Import the router file

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterComponent />  {/* Render the router here */}
      </Suspense>
    </Router>
  );
}
