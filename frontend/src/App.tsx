import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/main.scss";

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
