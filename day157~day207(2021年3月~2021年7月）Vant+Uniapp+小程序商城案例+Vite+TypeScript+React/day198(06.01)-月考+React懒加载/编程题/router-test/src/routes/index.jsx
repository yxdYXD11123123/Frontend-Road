import React from "react"
import { Redirect } from "react-router-dom";
// 导入组件
import AnimationCom from "../components/AnimationCom"
import VideoCom from "../components/VideoCom"
import User from "../components/User"

// 路由配置
const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/animation" ></Redirect>
  },
  // 动画
  {
    path: "/animation",
    component: AnimationCom
  },
  // 视频教程
  {
    path: "/video",
    component: VideoCom,
    routes: [
      {
        path: "/video/web",
        component: WebCom
      },
      {
        path: "/video/vue",
        component: VueCom
      },
      {
        path: "/video/react",
        component: ReactCom
      },
      {
        path: "/video/php",
        component: PHPCom
      },
    ]
  },
  // 用户管理
  {
    path: "/usermanage",
    component: User,
    routes: [
      {
        path: "/usermanage/web",
        component: WebUserCom
      },
      {
        path: "/usermanage/vue",
        component: VueUserCom
      },
      {
        path: "/usermanage/react",
        component: ReactUserCom
      },
      {
        path: "/usermanage/php",
        component: PHPUserCom
      },
    ]
  }
]

// 导出
export default routes;

//#region  Video子路由
// Web
function WebCom() {
  return (
    <div style={{ marginTop: "30px", marginLeft: "80px" }}>Web视频教程</div>
  )
}
// Web
function VueCom() {
  return (
    <div style={{ marginTop: "30px", marginLeft: "80px" }}>Vue视频教程</div>
  )
}
// Web
function PHPCom() {
  return (
    <div style={{ marginTop: "30px", marginLeft: "80px" }}>PHP视频教程</div>
  )
}
// Web
function ReactCom() {
  return (
    <div style={{ marginTop: "30px", marginLeft: "80px" }}>React视频教程</div>
  )
}
//#endregion

//#region  User子路由
// Web
function WebUserCom(props) {
  // 获取请求参数
  let query = new URLSearchParams(props.location.search);

  return (
    <div style={{ marginTop: "30px", marginLeft: "80px" }}>{query.get("age")} --- {query.get("name")}</div>
  )
}
// Web
function VueUserCom(props) {
  // 获取请求参数
  let query = new URLSearchParams(props.location.search);

  return (
    <div style={{ marginTop: "30px", marginLeft: "80px" }}>{query.get("age")} --- {query.get("name")}</div>
  )
}
// Web
function PHPUserCom(props) {
  // 获取请求参数
  let query = new URLSearchParams(props.location.search);
  return (
    <div style={{ marginTop: "30px", marginLeft: "80px" }}>{query.get("age")} --- {query.get("name")}</div>
  )
}
// Web
function ReactUserCom(props) {
  // 获取请求参数
  let query = new URLSearchParams(props.location.search);
  return (
    <div style={{ marginTop: "30px", marginLeft: "80px" }}>{query.get("age")} --- {query.get("name")}</div>
  )
}
//#endregion