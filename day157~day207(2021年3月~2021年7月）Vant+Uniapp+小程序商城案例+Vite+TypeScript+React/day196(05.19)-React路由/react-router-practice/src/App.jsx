import React from 'react';
import './App.css'
// 引入 react-router-dom（专门用于web端）
// BrowserRouter history模式路由 优点：手动切换路由
// HashRouter hash模式路由 优点：兼容性强
// Link 用来改变浏览器中的URL
// NavLink  和Link一摸一样，编译完就是 a 标签
// Route 占位符，用来展示组件
import { BrowserRouter, HashRouter, Link, NavLink, Route, Switch } from "react-router-dom"

// 引入组件
import User from "./components/User"
import Login from "./components/Login"

function App() {
  return (
    // XXXRouter用来监听路由变化
    <HashRouter>
      {/* <NavLink exact to="/home" activeStyle={{ color: "coral" }}>主页</NavLink>----- */}
      {/* <NavLink exact to="/about" activeStyle={{ color: "coral" }}> 关于页</NavLink> */}
      {/* exact 用于要求 Route中的path值精确匹配，精确匹配成功才显示 */}
      {/* <Switch> */}
      {/* <Route path={"/home"} component={Home}></Route> */}
      {/* 由于switch的匹配极致，只找一个, 找到/home以后，下面的/home/about永远不会被找到 */}
      {/* <Route path={"/home/about"} component={Home}></Route> */}
      {/* <Route path={"/about"} component={About}></Route> */}
      {/* 404页面就适合放到switch最后一个位置 */}
      {/* <Route component={Home}></Route> */}
      {/* </Switch> */}
      <Route path="/login" component={Login}></Route>
      <Route path="/user" component={User}></Route>
    </HashRouter>
  )
}

// 主页
function Home() {
  return (
    <div>Home主页</div>
  )
}

// 关于页
function About() {
  return (
    <div>About主页</div>
  )
}

export default App;