// src/api/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://codixhumbled.eu.pythonanywhere.com",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// 🟢 Request Interceptor → يضيف Access Token لكل Request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
