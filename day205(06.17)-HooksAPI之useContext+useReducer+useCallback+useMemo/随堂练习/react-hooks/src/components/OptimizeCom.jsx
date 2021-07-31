import React, { memo } from "react";

// 被优化的组件
function OptimizeCom(props) {
  console.log("OptimizeCom被渲染了");
  return (
    <div>
      <div>优化组件</div>
      <button onClick={() => { props.editMsg('sss') }}>修改父组件中msg</button>
    </div>
  )
}

// 使用 memo优化组件
export default memo(OptimizeCom);