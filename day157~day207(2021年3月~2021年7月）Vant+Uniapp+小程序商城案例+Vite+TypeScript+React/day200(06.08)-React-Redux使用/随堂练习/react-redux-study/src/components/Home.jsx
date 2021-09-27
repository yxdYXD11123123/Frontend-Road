import React from 'react';
import { connect } from "react-redux"
import { addCount } from '../store/action';

class Home extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="home">
        <div>  HOME:  {this.props.count}</div>
        <button onClick={() => { this.props.dispatch(addCount()) }}>HOME: 加</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
