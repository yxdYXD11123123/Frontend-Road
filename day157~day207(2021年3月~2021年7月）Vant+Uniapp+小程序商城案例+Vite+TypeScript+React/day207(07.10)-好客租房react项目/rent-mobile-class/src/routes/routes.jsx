import React, { lazy } from "react"
// 引入重定向
import { Redirect } from "react-router-dom";

// 导入 首页
import Home from "../pages/Home/Home";
// 导入 我的页面
import My from "../pages/My/My";
// 导入 资讯页面
import News from "../pages/News/News";
// 导入 找房页面
import FindHouse from "../pages/FindHouse/FindHouse";



// 配置路由对象
const routes = [
  // 重定向
  {
    path: "/",
    exact: true,
    render: () => (<Redirect to="/home" />)
  },
  // 首页
  {
    path: "/home",
    component: Home,
  },
  // 我的页面
  {
    path: "/my",
    component: My
  },
  // 资讯页面
  {
    path: "/news",
    component: News
  },
  // 找房页面
  {
    path: "/find-house",
    component: FindHouse
  },
  // 城市列表
  {
    path: "/city-list",
    // 使用 lazy + Suspense 懒加载页面
    component: lazy(() => import("../pages/CityList/CityList"))
  },
  // 地图找房
  {
    path: "/map",
    // 使用 lazy + Suspense 懒加载页面
    component: lazy(() => import("../pages/Map/Map"))
  },
  // 登录页面
  {
    path: "/login",
    component: lazy(() => import("../pages/Login/Login"))
  }
];

export default routes;