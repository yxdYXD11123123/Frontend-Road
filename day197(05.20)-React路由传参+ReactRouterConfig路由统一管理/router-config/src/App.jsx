import React from 'react';
import './App.css';
// 引入 React 路由
import { HashRouter } from "react-router-dom"
// 引入 路由配置插件
import { renderRoutes } from "react-router-config";
// 导入 路由配置
import routes from "./routes";

function App() {
  return (
    <HashRouter>
      {/* 使用 renderRoutes 渲染 Routes */}
      {renderRoutes(routes)}
    </HashRouter>
  )
}

export default App;