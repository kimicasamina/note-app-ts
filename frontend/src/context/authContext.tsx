import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { User } from "types/types";
import { verifyUserApi } from "@api/authService";
import LoadingDots from "@components/ui/loading-dots";
import LoadingSpinner from "@components/ui/loading-spinner";

// Define action types
enum ActionType {
  SET_USER = "SET_USER",
  SET_LOADING = "SET_LOADING",
  RESET_USER = "RESET_USER",
}

// Define state interface
interface AuthState {
  user: User | null;
  loading: boolean;
}

// Define action types
interface Action {
  type: ActionType;
  payload?: any;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

// Reducer function to handle state updates
const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case ActionType.SET_USER:
      return { ...state, user: action.payload, loading: false };
    case ActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionType.RESET_USER:
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<
  { state: AuthState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await verifyUserApi();
        console.log("USER", user);
        const userDetails = {
          id: user?.id,
          email: user?.email,
          username: user?.username,
        };
        if (user) {
          dispatch({ type: ActionType.SET_USER, payload: userDetails });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: ActionType.SET_LOADING, payload: false });
      }
    };

    if (!state.user) {
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {/* {children} */}
      {state.loading ? <LoadingSpinner size="38px" /> : children}
    </AuthContext.Provider>
  );
}
