export const fetchMessage = async () => {
  const response = await fetch("/api");
  const data = await response.json();
  return data.message;
};
