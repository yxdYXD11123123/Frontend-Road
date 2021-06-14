import React from "react"

class LifeCycle extends React.Component {
  constructor() {
    super();
    console.log("组件挂载--constructor");
  }

  componentDidMount() {
    console.log("组件挂载--componentDidMount");
  }

  componentDidUpdate() {
    console.log("组件更新--componentDidUpdate");
  }

  // 注意：render()内，千万不能执行setState()等触发更新的方法
  render() {
    console.log("组件挂载、组件更新--render");
    return (
      <div></div>
    )
  }
}

// 组件挂载--constructor
// 组件挂载--render
// 组件挂载--componentDidMount

export default LifeCycle