import React from "react";

// 创建一个高阶组件 （with开头）

/**
 * 带有 鼠标坐标位置 的功能 的高阶组件
 * @param {*} WrappedComponent 准备包装的组件
 * @returns 包装过的新组件（增强后的组件）
 */
const withMousePosition = (WrappedComponent) => {
  // 内部声明一个 提供功能 的组件
  class MovePosition extends React.Component {
    state = {
      x: 0,
      y: 0
    }

    componentDidMount() {
      window.addEventListener("mousemove", (e) => {
        this.setState({
          x: e.clientX,
          y: e.clientY
        })
      })
    }


    render() {
      // 组件最终渲染的内容 由 传入的组件决定，但是带有高阶组件中提供的状态功能
      return <WrappedComponent {...this.state} {...this.props}></WrappedComponent>
    }
  }

  // 给高阶组件添加 displayName
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  MovePosition.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;

  // 返回 增强后的组件
  return MovePosition;
}


// 导出 高阶组件  让其它组件使用
export default withMousePosition;