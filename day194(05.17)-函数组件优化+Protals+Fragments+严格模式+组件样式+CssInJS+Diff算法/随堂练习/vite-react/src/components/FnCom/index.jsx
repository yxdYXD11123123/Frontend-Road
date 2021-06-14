import React from "react";

const FnCom = React.memo(() => {
  console.log("FnCom更新");
  return (
    <div>优化后的函数组件</div>
  )
})

export default FnCom;