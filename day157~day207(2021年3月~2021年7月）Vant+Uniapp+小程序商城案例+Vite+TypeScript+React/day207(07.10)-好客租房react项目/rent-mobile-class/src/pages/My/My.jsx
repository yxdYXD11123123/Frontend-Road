/**
 * 我的页面
 * 
 * My
 */

import React, { useContext, useEffect, useState } from "react";

import { Button, Toast } from "antd-mobile"
import { useHistory } from "react-router";
// 获取用户信息
import { getUserInfo } from "@/api"
import authProvider from "@/contexts/authContext";

function My() {
  const history = useHistory();
  // 鉴权功能
  const auth = useContext(authProvider);


  // 去登录 / 推出登录
  const navToLogin = () => {
    if (auth.auth) {
      // 退出登录
      auth.updateAuth(false);
      Toast.success("已退出登录")
    } else {
      // 跳转到登录页
      history.push("/login")
    }
  }

  // 用户信息
  const [userInfo, setUserInfo] = useState({});

  // 如果用户已登录，获取用户信息
  useEffect(async () => {
    // 判断本地是否有token，如果有token代表用户已经登录
    // const token = localStorage.getItem('hkzf_token');
    // 以后就不用token判断，而用authContext提供的鉴权功能
    if (auth.auth) {
      // 请求用户信息
      let res = await getUserInfo();
      // 更新用户信息
      setUserInfo(res);
    }
  }, []) // useEffect什么都不依赖时，相当于didMount

  return (
    <div>
      <div>
        <p>用户昵称：{userInfo.nickname}</p>
        <p>用户性别：{userInfo.gender}</p>
      </div>
      {/* 登录 */}
      <Button onClick={navToLogin}>{auth.auth ? "退出登录" : "去登录"}</Button>
    </div>
  )
}

export default My;