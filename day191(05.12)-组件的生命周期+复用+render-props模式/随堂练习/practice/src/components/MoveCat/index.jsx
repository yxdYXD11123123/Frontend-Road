import React from "react"

class MoveCat extends React.Component {

  render() {
    return (
      <img src="./logo192.png" alt="" style={{ position: "absolute", top: this.props.y, left: this.props.x }} />
    )
  }
}

export default MoveCat;