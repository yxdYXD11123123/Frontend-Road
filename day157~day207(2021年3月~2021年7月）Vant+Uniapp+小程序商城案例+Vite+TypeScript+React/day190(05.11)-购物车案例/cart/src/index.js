// 使用 严格模式
import React from 'react';
// 引入ReactDOM用于渲染
import ReactDOM from 'react-dom';
// 引入全局样式
import './index.css';
// 引入根组件
import App from './App';

// 将根组件渲染到根标签里
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
