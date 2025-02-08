// src/axiosInstance.ts
import axios from "axios";

const API_URI: string = import.meta.env.BASE_URL;
// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URI, // replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Intercept request to add the token to headers if available
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // const token = Cookies.get("token"); // Get the token from cookies

//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Intercept response for handling errors like 401 (unauthorized)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle 401 Unauthorized error
//       // Redirect to login page or handle as needed
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
