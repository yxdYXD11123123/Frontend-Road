import React from "react";
// 引入styled-component包
import styled from "styled-components";

const Button = styled.button`
/* 在内部通过 使用props, 有传入的值使用传入的，没有就使用默认值 */
width: ${props => props.width? props.width: "70px"};
height:${props => props.height? props.height: "20px"};
background-color: ${props => props.backgroundColor? props.backgroundColor: "greenyellow"};
/* 有没有primary，有就按照primary的样式 */
border: ${props=>props.primary? "none":"1px solid black"};
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
        <Button primary {...this.state}>按钮</Button>
      </div>
    )
  }
}

export default UseStyleCom;