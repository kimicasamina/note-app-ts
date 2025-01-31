import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@utils/queryClient";
import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
);
