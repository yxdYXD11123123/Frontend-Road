import React from "react";
// 引入styled-component包
import styled from "styled-components";

// 定义带有样式的组件
const Div = styled.div`
// 自身样式
width: ${props=>props.width};
height: ${props=>props.height};
background-color: greenyellow;
opacity: ${props=>props.opacity};
transition: all 3s linear;
`


class Transition extends React.Component {
  // 通过控制 样式组件中使用的state，实现动画渐变
  state = {
    width: "100px",
    height: "100px",
  }

  clickHandler = ()=>{
    this.setState({
      width: "30px",
      height: "30px",
      opacity: 0
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.clickHandler}>让盒子逐渐消失</button>
        <Div {...this.state}></Div>
      </div>
    )
  }
}

export default Transition;