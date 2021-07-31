import React, { useContext } from "react"
// 导入context对象
import { xxContext } from "../utils/context"

// 子孙组件
function Children(props) {
  // 使用 useContext(context对象) 获取 Provider提供的value值
  const xxValue = useContext(xxContext);

  return (
    <div>
      后代组件--{xxValue}
      <button onClick={() => { props.setName('ssss') }}>改name</button>
    </div>
  )
}

export default Children;