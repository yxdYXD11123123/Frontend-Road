import React from 'react';
import ReactDOM from "react-dom";

class Son extends React.Component {
  render() {
    return (
      <div>
        <div>还在原组件内部的内容</div>
        {/* 使用 ReactDOM.createPortal(React元素结构, 指定位置container) */}
        {ReactDOM.createPortal(this.props.children, document.getElementById("app"))}
      </div>
    )
  }
}

export default Son
