import React, { Component, createRef } from 'react';
import "./App.css";
// 导入AppSon
import AppSon from "./AppSon";
// 引入connect 
import { connect } from "react-redux"
import { addMsg } from './store/action';

class App extends Component {
  constructor() {
    super();
    // 创建input Ref
    this.inputRef = createRef();
  }

  // 添加信息
  addMsg = () => {
    // 判空
    if (this.inputRef.current.value.trim().length == 0) {
      alert("往进写东西!")
      // 清空输入框
      this.inputRef.current.value = "";
    } else {
      // 添加
      this.props.dispatch(addMsg(this.inputRef.current.value));
      // 清空输入框
      this.inputRef.current.value = "";
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>App--发送信息</h1>
          <div>
            <input type="text" placeholder="输入要发送的信息" ref={this.inputRef} />
            <button onClick={this.addMsg}>Send</button>
          </div>
        </div>
        {/* AppSon */}
        <AppSon />
      </div>
    );
  }
}

export default connect()(App);