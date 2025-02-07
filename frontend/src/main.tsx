import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@utils/queryClient";
import ErrorBoundary from "@components/ui/error-boundary";
import AuthProvider from "@services/context/authContext";
import { SelectedItemProvider } from "@services/context/selectedItemContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SelectedItemProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </SelectedItemProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
