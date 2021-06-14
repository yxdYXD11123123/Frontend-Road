import React from "react"
import './App.css';
// 导入
// import LifeCycle from "./components/LifeCycle";
// 导入功能组件
import MovePosition from './components/MovePosition';
// 导入使用 功能 的组件
import MoveCat from "./components/MoveCat";
import CurPosition from "./components/CurPosition";

class App extends React.Component {

  render() {
    return (
      <div>
        {/* 多次使用此功能，用于不同组件 */}

        {/* 使用功能组件，传入render函数，函数中返回：要使用此功能的组件 */}
        {/* 利用props.children可以直接写到标签内部的特性，不必再传render函数 */}
        <MovePosition>
          {positions => {
            return (
              // 将功能组件提供的position 传递给组件使用
              <MoveCat x={positions.x} y={positions.y} />
            )
          }}
        </MovePosition>

        {/* 复用 */}
        <MovePosition >
          {positions => {
            return (
              <CurPosition x={positions.x} y={positions.y} />
            )
          }}
        </MovePosition>
      </div>
    );
  }
}

export default App;