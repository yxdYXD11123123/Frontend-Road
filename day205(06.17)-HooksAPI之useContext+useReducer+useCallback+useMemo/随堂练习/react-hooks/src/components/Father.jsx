import React, { useCallback, useState } from "react";
import OptimizeCom from "./OptimizeCom";

// 被优化的组件
function Father(props) {
  const [msgState, setMsgState] = useState("父组件数据");

  // 由于这里声明的函数，当组件Father重新渲染时，会重新 声明此函数
  const editMsg = () => {
    setMsgState("xxxxxxxxxx")
  }

  // 所以，我们可以使用 useCallback 解决这个问题
  const editMsg2 = useCallback(() => {
    setMsgState("xxxxxxxxxx")
  }, []) // 这里的空数组 表示 什么都不依赖

  return (
    <div>
      <div>父组件 -- {msgState}</div>
      {/* 所以，子组件中的props.editMsg函数 地址是有变化的，所以即使子组件做了memo优化，也会因为这个函数重新渲染 */}
      {/* <OptimizeCom editMsg={editMsg}></OptimizeCom> */}
      {/* 使用 useCallback 生成的函数，只会在依赖变化时重新生产新的函数 */}
      <OptimizeCom editMsg={editMsg2}></OptimizeCom>
    </div>
  )
}

export default Father;