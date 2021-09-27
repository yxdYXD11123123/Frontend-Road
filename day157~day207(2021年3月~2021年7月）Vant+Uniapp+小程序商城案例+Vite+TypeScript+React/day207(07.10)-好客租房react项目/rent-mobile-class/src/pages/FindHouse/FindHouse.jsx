/**
 * 找房页面
 * 
 * FindHouse
 */

import React, { useContext } from "react";
import { Button, Toast } from "antd-mobile";

// 导入鉴权Context
import authContext from "@/contexts/authContext"

function FindHouse() {
  // 获取 鉴权功能
  const auth = useContext(authContext);
  //  需要登录的操作
  const operationNeedLogin = () => {
    // 判断是否鉴权
    if (!auth.auth) {
      return Toast.show("需要登录才可以");
    }
    Toast.show("可以操作")
  }

  return (
    <div>
      <h3>找房页面</h3>
      {/* 需要登录的操作 */}
      <Button type="ghost" onClick={operationNeedLogin}>需要登录的操作</Button>
    </div>
  )
}

export default FindHouse;