import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

// Define the AuthState type, including user's details, loading and error states
type AuthState = {
  isAuthenticated: boolean;
  id: number | null;
  username: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
};

// Define actions: LOGIN with user data, LOGOUT without any data
type AuthAction =
  | { type: "LOGIN"; payload: { id: number; username: string; email: string } }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_ERROR"; error: string | null };

// Initial state with empty user data, loading, and no error
const initialState: AuthState = {
  isAuthenticated: false,
  id: null,
  username: null,
  email: null,
  loading: false,
  error: null,
};

// Reducer function to update the state based on the action
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        id: null,
        username: null,
        email: null,
        loading: false,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

// API function to fetch the user and verify the JWT token
const fetchUser = async (): Promise<{
  id: number;
  username: string;
  email: string;
}> => {
  try {
    const response = await axios.get("/api/user"); // replace with your API endpoint
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

// Create the context
const AuthContext = createContext<
  { state: AuthState; dispatch: React.Dispatch<AuthAction> } | undefined
>(undefined);

// AuthProvider component to wrap the app and provide the context value
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Fetch the user data and verify the JWT token using React Query
  const { isLoading, error, data } = useQuery("user", fetchUser, {
    enabled: state.isAuthenticated, // Only run the query if the user is authenticated
    onSuccess: (userData) => {
      // Dispatch login action when user data is fetched
      dispatch({
        type: "LOGIN",
        payload: {
          id: userData.id,
          username: userData.username,
          email: userData.email,
        },
      });
    },
    onError: () => {
      dispatch({ type: "SET_ERROR", error: "Failed to verify the JWT token" });
    },
  });

  useEffect(() => {
    if (isLoading) {
      dispatch({ type: "SET_LOADING", loading: true });
    } else {
      dispatch({ type: "SET_LOADING", loading: false });
    }

    if (error) {
      dispatch({ type: "SET_ERROR", error: "Failed to fetch user data" });
    }
  }, [isLoading, error]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
