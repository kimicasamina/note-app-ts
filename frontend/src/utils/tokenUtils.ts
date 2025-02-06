export const getToken = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token"))
    ?.split("=")[1];
  return token;
};
