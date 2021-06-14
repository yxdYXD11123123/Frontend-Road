import React from 'react';
import './App.css';
import { HashRouter } from "react-router-dom"
// 导入侧边栏和右侧
import Aside from "./components/Aside";
import Right from "./components/Right";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Aside></Aside>
        <Right></Right>
      </HashRouter>
    </div>

  )
}

export default App;
