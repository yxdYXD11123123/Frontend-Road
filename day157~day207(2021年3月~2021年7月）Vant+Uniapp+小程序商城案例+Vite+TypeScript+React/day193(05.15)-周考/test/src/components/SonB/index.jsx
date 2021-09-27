import React from "react";

class SonB extends React.Component {
  clickAdd = () => {
    this.props.addFromB(this.props.fromB + 1)
  }

  render() {
    return (
      <button onClick={this.clickAdd}>{this.props.fromB}</button>
    )
  }
}

export default SonB;