import React from "react";
// 引入styled-component包
import styled from "styled-components";

const Button = styled.button`
/* 基础样式 */
width: 80px;
height: 40px;
`

// 继承Button样式
const NewButton = styled(Button)`
/* 基于继承样式，添加更多样式 */
border: none;
`

class UseStyleCom extends React.Component {
  state = {
    width: "100px",
    height: "50px"
  }

  render() {
    return (
      <div>
        {/* 使用 */}
        <NewButton>按钮</NewButton>
      </div>
    )
  }
}

export default UseStyleCom;