import React from 'react';
import "./App.css"
// 导入组件
// import UseStyleCom from "./components/UseStyleCom"
// import UseProps from "./components/UseProps"
// import UseStyleExtends from "./components/UseStyleExtends"

// 导入动画组件
// import Transition from "./components/Transition"
// import CSSTransition from "./components/CSSTransition"
// import SwitchTransition from "./components/SwitchTransition"
import TransitionGroup from "./components/TransitionGroup"



function App() {
  return (
    <div className="App">
      app
      {/* <UseStyleCom></UseStyleCom>
      <UseProps></UseProps>
      <UseStyleExtends></UseStyleExtends> */}
      {/* <Transition></Transition> */}
      {/* <CSSTransition></CSSTransition> */}
      {/* <SwitchTransition></SwitchTransition> */}
      <TransitionGroup></TransitionGroup>
    </div>
  )
}

export default App
