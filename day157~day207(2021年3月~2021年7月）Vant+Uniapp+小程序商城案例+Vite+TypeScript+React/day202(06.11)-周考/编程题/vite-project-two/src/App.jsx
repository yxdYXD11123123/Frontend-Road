import React, { Component } from 'react';
import "./App.css";
import { connect } from "react-redux";
import { changeGetting, getNum } from './store/action';

class App extends Component {
  // 点击
  clickHandler = () => {
    this.props.dispatch(getNum);
    // 设置获取中
    this.props.dispatch(changeGetting(true));
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.clickHandler}>获取随机码</button>
        <h1 className={"num" + " " + (this.props.getting ? "active" : "")}>{this.props.num ? this.props.num : "???"}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    num: state.num,
    getting: state.getting
  }
}

export default connect(mapStateToProps)(App);