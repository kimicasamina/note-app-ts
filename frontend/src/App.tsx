import React, { useEffect, useState } from "react";
import { fetchMessage } from "./services/api";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetchMessage().then((message) => setMessage(message));
  }, []);

  return <div>{message}</div>;
};

export default App;
