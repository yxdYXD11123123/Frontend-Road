import React from 'react'
import ReactDOM from 'react-dom'
// 引入 antd-mobile 样式
import 'antd-mobile/dist/antd-mobile.css';
// 导入自适应计算器
import "@/assets/js/media_750";
// 样式重置
import "@/assets/css/reset.css"
// 引入全局样式
import './index.css';
// 引入字体图标
import "./assets/fonts/iconfont.css"
// 引入根组件
import App from './App';

// 导入路由
import { HashRouter } from "react-router-dom";

// 导入鉴权组件
import AuthProvider from "./utils/AuthProvider.jsx"

ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <HashRouter>
      <App></App>
    </HashRouter>
  </AuthProvider>
  ,
  // </React.StrictMode>,
  document.getElementById('root')
)
