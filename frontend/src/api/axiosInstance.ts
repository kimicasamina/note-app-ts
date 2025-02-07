import axios from "axios";

const BASE_URL: string = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Important: Send cookies with each request
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Attach JWT token in Authorization header if needed
    // The token will automatically be sent because it's stored in an HTTP-only cookie
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
