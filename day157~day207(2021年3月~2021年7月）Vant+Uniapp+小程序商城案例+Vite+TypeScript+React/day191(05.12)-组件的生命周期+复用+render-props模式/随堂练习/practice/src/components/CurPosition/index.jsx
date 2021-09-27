import React from "react"

class CurPosition extends React.Component {

  render() {
    return (
      <div>当前位置（x:{this.props.x},y:{this.props.y} ）</div>
    )
  }
}

export default CurPosition;