import withArea from "../withArea";
import React from "react";

class Square extends React.Component {
  render() {
    return (
      <div>宽为{this.props.width} 高为{this.props.height} 面积为{this.props.getArea()}</div>
    )
  }
}

// function Square(props) {
//   return (
//     <div>宽为{props.width} 高为{props.height} 面积为{props.getArea()}</div>
//   )
// }

export default withArea(Square);