export type User = {
  isAuthenticated: boolean;
  id: number | null;
  username: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
};
