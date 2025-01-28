export type User = {
  id: number;
  username: String;
  email: String;
};

export interface UserProps {
  user: User;
}
