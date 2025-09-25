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

// 🟢 Response Interceptor → يجدد Access Token لو انتهى
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // تحقق من الخطأ (401 Unauthorized) + وجود refreshToken
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // اطلب Access Token جديد
        const { data } = await axios.post(
          "https://codixhumbled.eu.pythonanywhere.com/auth/token/refresh/",
          { refresh: refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        // خزّن التوكن الجديد
        localStorage.setItem("accessToken", data.access);

        // حدث الـ headers
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.access}`;
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.access}`;

        // جرّب نفس الـ request تاني
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
