import React, { useReducer } from "react"
// 导入 计算reducer
import { calcReducer } from "../utils/reducer"

// 计算器A组件
function CalcA(props) {
  // 使用reducer 创建变量num, 可以通过dispatch触发reducer对应处理方式
  const [num, dispatch] = useReducer(calcReducer, 10);

  return (
    <div>
      <div>计算器A</div>
      <div>{num}</div>
      <div>
        <button onClick={() => { dispatch({ type: 'ADD' }) }}>+</button>
        <button onClick={() => { dispatch({ type: 'MINUS' }) }}>-</button>
      </div>
    </div>
  )
}

export default CalcA;