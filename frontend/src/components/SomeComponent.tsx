import { useQuery } from "react-query";

const fetchData = async () => {
  const res = await fetch("https://api.example.com/data");
  return res.json();
};

const SomeComponent = () => {
  const { data, error, isLoading } = useQuery("data", fetchData);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return <div>Data: {JSON.stringify(data)}</div>;
};
