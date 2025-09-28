import React, { useContext } from "react";
import { userContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance.js";

export default function Logout() {
  const navigate = useNavigate();
  const { setUserTokenRefresh, userTokenRefresh, setUserTokenAccess } =
    useContext(userContext);

  async function handleLogout() {
    try {if (userTokenRefresh) {
        await api.post("/auth/logout/", { refresh: userTokenRefresh });
      }
      toast.success("تم تسجيل الخروج بنجاح!");
    } catch (error) {
      const serverMessage =
        error.response?.data?.detail || "فشل تسجيل الخروج من السيرفر.";
      toast.error(serverMessage);
      console.error("❌ Logout error:", error);
    } finally {
      // امسح كل حاجة محليًا regardless
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      setUserTokenAccess(null);
      setUserTokenRefresh(null);
      navigate("/login", { replace: true });
    }
  }

  return (
    <button
      className="bg-gradient-to-r from-[var(--color-primary)] cursor-pointer to-[var(--color-primary-light)] text-white px-6 py-2 rounded-xl hover:opacity-90 transition-all duration-300 font-semibold font-[var(--font-noto-arabic)]"
      onClick={handleLogout}
    >
      تسجيل الخروج
    </button>
  );
}
