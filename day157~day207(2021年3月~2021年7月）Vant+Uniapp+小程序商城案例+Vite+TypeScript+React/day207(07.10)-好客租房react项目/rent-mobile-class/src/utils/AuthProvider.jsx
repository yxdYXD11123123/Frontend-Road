// 提供鉴权的组件

import React from "react";
// 导入 鉴权功能
import useProvideAuth from "./useProvideAuth";
// 导入 鉴权Context
import auth from "../contexts/authContext"

function AuthProvider({ children }) {
  return (
    <auth.Provider value={useProvideAuth()}>
      {children}
    </auth.Provider>
  )
}

export default AuthProvider;