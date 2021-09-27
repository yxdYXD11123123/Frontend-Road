import React from "react";
// 引入PropTypes库
import PropTypes from "prop-types"

class ComA extends React.Component {
  render() {
    return (
      <div>{this.props.msg}</div>
    )
  }
}

// 通过propTypes 给组件添加 类型要求
ComA.propTypes = {
  // 要求类型 为 字符串 必传
  msg: PropTypes.string.isRequired
}


export default ComA;