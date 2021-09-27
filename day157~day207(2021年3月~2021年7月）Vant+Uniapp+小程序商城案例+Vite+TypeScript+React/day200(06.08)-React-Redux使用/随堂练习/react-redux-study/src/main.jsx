import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App';
// 导入注入
import { Provider } from "react-redux";
// 导入共享库
import store from "./store/store"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
