import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getCurrentUser } from "../api/authApi";

// Define the type for the user object
export interface User {
  id: string;
  email: string;
  username: string;
}

// AuthContext type definition
export interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
  isError: boolean;
  error: any;
}

// Define the props for the AuthProvider component, including children
interface AuthProviderProps {
  children: React.ReactNode;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch current user details using react-query
  const { data, error, isLoading, isError } = useQuery("user", getCurrentUser, {
    enabled: true, // Always try to fetch user details when the app loads
    onSuccess: (userData) => {
      setUser(userData);
    },
    onError: () => {
      setUser(null); // Clear user if fetching fails
    },
  });

  const login = (user: User): void => {
    // Optionally, store the token in localStorage if needed for session state
    // localStorage.setItem('auth_token', token);
    // User is already authenticated if the token is in the cookie
    setUser(user); // Set user when token is verified and fetched
  };

  const logout = (): void => {
    setUser(null);
    // Optional: Clear localStorage token if you are using it
    // localStorage.removeItem('auth_token');
    // You can also add a logout endpoint on the backend to clear cookies
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        isError,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
