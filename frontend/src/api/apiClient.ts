import axios, { AxiosInstance } from "axios";

const BASE_URL: string = import.meta.env.VITE_API_URL;

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Interceptor to automatically include the token from cookies in the request header
axiosClient.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token"))
    ?.split("=")[1];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
