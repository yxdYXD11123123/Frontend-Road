import React from 'react'
import './App.css'
// 引入路由
import { HashRouter, Route, Redirect } from "react-router-dom";
// 引入 Home 
import Home from "./components/Home"
// 引入 My 页
import My from "./components/My"


function App() {

  return (
    <HashRouter>
      <Redirect from="/" to="/home"></Redirect>
      <Route path="/home" component={Home}></Route>
      {/* 首先指定一级路由  注意：不可添加 exact */}
      <Route path="/my" component={My}></Route>
    </HashRouter>
  )
}

export default App
