import React from "react";
// 引入connect
import { connect } from "react-redux"
import { changeNum } from "../store/action";

class Home extends React.Component {
  componentDidMount() {
    this.props.dispatch(changeNum())
  }
  render() {
    return (
      <div>
        <div>Home</div>
        <div>{this.props.num}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    num: state.num
  }
}

export default connect(mapStateToProps)(Home);