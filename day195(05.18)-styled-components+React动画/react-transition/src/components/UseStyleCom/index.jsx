import React from "react";
// 引入styled-component包
import styled from "styled-components";

// 定义带有样式的组件
const Div = styled.div`
// 自身样式
width: 100px;
height: 100px;
background-color: rebeccapurple;
// 内部标签样式
span {
  color: white;
}
`


class UseStyleCom extends React.Component {
  render() {
    return (
      <div>
        {/* 使用 */}
        <Div>
          <span>里面的span标签内容</span>
        </Div>
      </div>
    )
  }
}

export default UseStyleCom;