import React from 'react';

class StateCom extends React.Component {
  // 初始化state方式一
  // constructor() {
  //   super();
  //   // 初始化 state
  //   this.state = {
  //     count: 1
  //   }
  // }

  // 初始化state方式二
  state = {
    count: 1
  }

  // 添加方法
  updateCount = () => {
    this.setState({
      // 注意 不能使用 后++
      count: ++this.state.count
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.updateCount}>按钮</button>
      </div>
    )
  }
}

// 导出 类组件
export default StateCom;