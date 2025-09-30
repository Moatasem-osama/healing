import { useEffect, useContext } from "react";
import api from "../components/utils/axiosInstance";
import { userContext } from "./UserContext";

export default function AxiosInterceptor({ children }) {
  const { logout } = useContext(userContext);

  useEffect(() => {
    const resInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          localStorage.getItem("refreshToken")
        ) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const { data } = await api.post("/auth/token/refresh/", { refresh: refreshToken });

            localStorage.setItem("accessToken", data.access);
            api.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
            originalRequest.headers["Authorization"] = `Bearer ${data.access}`;

            return api(originalRequest);
          } catch (err) {
            logout();
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(resInterceptor);
    };
  }, [logout]);

  return children;
}
