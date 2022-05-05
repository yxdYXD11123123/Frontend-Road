import { AuthContext } from "@/contexts/authContext";
import React, { useState } from "react";

export default function AuthProvider({ children }) {
  // 设置用户信息
  const localToken = localStorage.getItem("jike_token");
  // token
  const [token, setToken] = useState(localToken);

  // 登录
  const login = (token) => {
    setToken(token);
    localStorage.setItem("jike_token", JSON.stringify(token));
  };

  // 退出登录
  const logout = () => {
    setToken(null);
    localStorage.setItem("jike_token", "");
  };

  const value = { token, login, logout };

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
}
