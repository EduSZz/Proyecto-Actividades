// src/hooks/useAuth.ts
import { useState } from "react";

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const saveToken = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return { token, saveToken, logout, isLoggedIn: !!token };
}