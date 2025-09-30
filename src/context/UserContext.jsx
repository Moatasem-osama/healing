// src/context/UserContext.js
import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export default function UserContextProvider({ children }) {
  const [userTokenAccess, setUserTokenAccess] = useState(null);
  const [userTokenRefresh, setUserTokenRefresh] = useState(null);

  useEffect(() => {
    const access = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");
    if (access) setUserTokenAccess(access);
    if (refresh) setUserTokenRefresh(refresh);
  }, []);

  const login = (access, refresh) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    setUserTokenAccess(access);
    setUserTokenRefresh(refresh);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUserTokenAccess(null);
    setUserTokenRefresh(null);

    window.location.href = "/#/login";
  };

  return (
    <userContext.Provider
      value={{
        userTokenAccess,
        userTokenRefresh,
        setUserTokenAccess,
        setUserTokenRefresh,
        login,
        logout,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
