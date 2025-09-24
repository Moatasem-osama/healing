import React, { useContext } from "react";
import { userContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance.js";

export default function Logout() {
  const navigate = useNavigate();
  const { setUserTokenRefresh, userTokenRefresh, setUserTokenAccess } =
    useContext(userContext);

  async function logout() {
    try {
      await api.post("/auth/logout/", { refresh: userTokenRefresh });
      toast.success("تم تسجيل الخروج!");
    } catch (error) {
      const serverMessage =
        error.response?.data?.detail || "فشل تسجيل الخروج، حاول مرة أخرى.";
      toast.error(serverMessage);
    } finally {localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      setUserTokenAccess(null);
      setUserTokenRefresh(null);
      navigate("/login");
    }
  }

  return (
    <button
    className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white px-6 py-2 rounded-xl hover:opacity-90 transition-all duration-300 font-semibold font-[var(--font-noto-arabic)]"
      onClick={logout}
    >
      تسجيل الخروج
    </button>
  );
}
