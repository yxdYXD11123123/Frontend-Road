// 引入重定向时需要的组件
import React from "react"
import { Redirect } from "react-router-dom"
// 导入组件
import Home from "../components/Home";
import My from "../components/My";
// 导入嵌套路由组件
import MyName from "../components/MyName";
import MyAge from "../components/MyAge";

// 配置路由
const routes = [
  // 访问 "/" 时，重定向到 "/home"
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />
  },
  // 首页
  {
    path: "/home",
    exact: true,
    component: Home
  },
  // 个人中心页
  {
    path: "/my",
    component: My,
    routes: [
      {
        path: "/my/name",
        component: MyName
      },
      {
        path: "/my/age",
        component: MyAge
      }
    ]
  }
];

// 导出配置
export default routes;
