import React, { Fragment } from 'react';

// 受控组件
class StickCom extends React.Component {
  // 初始化数据
  state = {
    msg: ""
  }
  // input值改变时的事件处理函数
  changeHandler = (e) => {
    // 更新 状态
    this.setState({
      msg: e.target.value
    })
  }

  render() {
    return (
      // 占位标签
      <Fragment>
        <div>受控组件</div>
        {/* 绑定状态，并控制用户输入过程中发生的操作 */}
        <input onChange={this.changeHandler} value={this.state.msg} />
      </Fragment >
    )
  }
}

// 导出 类组件
export default StickCom;