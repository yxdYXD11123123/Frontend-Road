import React from "react";
import SonA from "../SonA"
import SonB from "../SonB"

class GetSum extends React.Component {
  state = {
    fromA: 1,
    fromB: 0,
  }

  // 接收子组件参数，更新状态
  addFromA = (val) => {
    this.setState({
      fromA: val
    })
  }

  addFromB = (val) => {
    this.setState({
      fromB: val
    })
  }


  render() {
    return (
      <div>
        {/* 父组件中的值 */}
        <div>{this.state.fromA + this.state.fromB}</div>
        <div>
          {/* 将父组件中的数据传递给子组件 */}
          <SonA fromA={this.state.fromA} addFromA={this.addFromA} ></SonA>
          <SonB fromB={this.state.fromB} addFromB={this.addFromB} ></SonB>
        </div>
      </div>
    )
  }
}

export default GetSum;