import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App';
// 引入
import { Provider } from "react-redux"
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
