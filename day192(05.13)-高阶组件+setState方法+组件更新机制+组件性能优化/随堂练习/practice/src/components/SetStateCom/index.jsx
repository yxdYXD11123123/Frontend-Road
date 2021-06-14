import React from "react";

class SetStateCom extends React.Component {
  state = {
    num: 0
  }

  componentDidMount() {
    this.setState((newState, newProps) => {
      return {
        num: newState.num + 1
      }
    })
    // num: 1
    this.setState((newState, newProps) => {
      return {
        num: newState.num + 1
      }
    })
    // num: 2
    this.setState((newState, newProps) => {
      return {
        num: newState.num + 1
      }
    })
    // num: 3
  }

  render() {
    console.log("同样只触发了一次更新渲染");

    return (
      <div>{this.state.num}</div>
    )
  }
}

export default SetStateCom;