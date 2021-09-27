import { useState } from "react"

// 提供鉴权功能
const useProvideAuth = () => {
  // auth为true，代表已登录、已鉴权。默认为未鉴权
  const [auth, setAuth] = useState(false);
  // 更新鉴权
  const updateAuth = (newState, cb) => {
    setAuth(newState);
    cb && cb();
  }

  return {
    auth,
    updateAuth
  }
}

export default useProvideAuth;