// src/context/AxiosInterceptor.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/utils/axiosInstance";

export default function AxiosInterceptor({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const resInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // لو السيرفر رجع Unauthorized وفيه Refresh Token
        if (
          error.response?.status === 401 &&
          !originalRequest?._retry &&
          localStorage.getItem("refreshToken")
        ) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem("refreshToken");

            const { data } = await api.post(
              "/auth/token/refresh/",
              { refresh: refreshToken },
              {
                headers: {
                  "Content-Type": "application/json",
                  "ngrok-skip-browser-warning": "true",
                },
              }
            );

            localStorage.setItem("accessToken", data.access);

            // تحديث التوكن الجديد في headers
            api.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
            originalRequest.headers["Authorization"] = `Bearer ${data.access}`;

            // إعادة نفس الـ request
            return api(originalRequest);
          } catch (err) {
            // لو فشل التحديث → مسح التوكنات والرجوع للـ login
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/login", { replace: true });
          }
        }

        return Promise.reject(error);
      }
    );

    // تنظيف الـ interceptor عند unmount
    return () => {
      api.interceptors.response.eject(resInterceptor);
    };
  }, [navigate]);

  return children;
}
