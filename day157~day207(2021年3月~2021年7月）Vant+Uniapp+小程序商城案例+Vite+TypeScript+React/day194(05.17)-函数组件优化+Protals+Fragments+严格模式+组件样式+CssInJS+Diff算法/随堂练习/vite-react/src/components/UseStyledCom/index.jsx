import React from "react";
// 引入styled-components
import styled from "styled-components";

// 声明组件样式 (这里的div其实是一个方法，后面 反引号其实是在传参)
const WithStyles = styled.div`
& {
 background-color: blue;
 p {
   background-color: yellow;
 }
}
`

class UseStyledCom extends React.Component {
  render() {
    return (
      // 使用 组件
      <WithStyles>
        背景色
        <p>p标签</p>
      </WithStyles>
    )
  }
}

export default UseStyledCom;