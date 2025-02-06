import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@utils/queryClient";
import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";
import AuthProvider from "@context/authContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
