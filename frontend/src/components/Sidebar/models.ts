export type User = {
  id: string;
  username: string;
  email: string;
};

export interface UserProps {
  user: User;
}
