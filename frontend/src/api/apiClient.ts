// src/api/apiClient.ts
import axios, { AxiosInstance } from "axios";

const BASE_URL: string = "http://localhost:9090/api";
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
    withCredentials: true, // ensures cookies are sent with requests
  },
});

// Add a request interceptor to include the Authorization token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
