import axios, { AxiosInstance } from "axios";

const BASE_URL: string = import.meta.env.VITE_API_URL;
const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosClient;
