import React from "react";

class SonA extends React.Component {
  // 点击 让数据+1，通过父组件方法传递给父组件
  clickAdd = () => {
    this.props.addFromA(this.props.fromA + 1)
  }

  render() {
    return (
      <button onClick={this.clickAdd}>{this.props.fromA}</button>
    )
  }
}

export default SonA;