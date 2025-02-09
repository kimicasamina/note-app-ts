export interface Note {
  id: string;
  title: string;
  content: string;
  category_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface FormData {
  title: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  user_id: string;
}

// You can use the ActionType enum here as you did before
export enum ActionType {
  SET_USER = "SET_USER",
  SET_LOADING = "SET_LOADING",
  RESET_USER = "RESET_USER",
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface RegisterValues {
  email: string;
  username: string;
  password: string;
}
