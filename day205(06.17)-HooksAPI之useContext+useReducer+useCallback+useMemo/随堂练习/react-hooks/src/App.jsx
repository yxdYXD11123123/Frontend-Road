import React, { useState } from 'react'
import './App.css';
// 导入后台组件
import Children from './components/Children';
import CalcA from "./components/CalcA"
import CalcB from "./components/CalcB"
import Father from './components/Father';
// 导入context
import { xxContext } from './utils/context';

function App() {
  const [name, setName] = useState("xxContext提供的value值")

  return (
    // 提供 value 值
    <xxContext.Provider value={name}>
      <div className="App" onClick={() => { setName("修改xxContext提供的value值") }}>
        app -- {name}
        <Children setName={(xx = "xxxs") => { setName(xx) }}></Children>
        {/* 计算器 */}
        <CalcA></CalcA>
        <CalcB></CalcB>
        {/* useCallback */}
        <Father></Father>
      </div>
    </xxContext.Provider>
  )
}

export default App;
