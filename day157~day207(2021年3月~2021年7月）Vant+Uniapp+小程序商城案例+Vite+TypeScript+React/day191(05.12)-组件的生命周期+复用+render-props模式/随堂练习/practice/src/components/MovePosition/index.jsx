import React from "react";

// 功能组件  （提供鼠标当前坐标信息）
class MovePosition extends React.Component {
  // 初始化数据，记录鼠标坐标
  state = {
    x: 0,
    y: 0
  }

  // 一定要在组件挂载完成后，绑定DOM事件
  componentDidMount() {
    // 监听鼠标在窗口中的 坐标位置
    window.addEventListener("mousemove", (e) => {
      // 更新鼠标坐标数据
      this.setState({
        x: e.clientX,
        y: e.clientY
      })
    })
  }

  render() {
    // 想让render函数中实际返回的React元素，可以从外界传递进来
    // 那么就使用 props 去接收一个渲染函数，并传递给此渲染函数 功能组件中实现的状态数据，作为默认参数
    return this.props.children(this.state);
    // 让功能组件被使用才决定 -> 内部要渲染的内容
  }
}

export default MovePosition;