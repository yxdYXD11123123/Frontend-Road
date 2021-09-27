import React from 'react'
import './App.css';
// 导入共享库
import store from "./store/store";
// 导入actions
import { addCount } from "./store/action";
// 导入Home组件
import Home from "./components/Home"

class App extends React.Component {
  constructor() {
    super();
    // 获取数据
    this.state = store.getState();
  }

  componentDidMount() {
    // 订阅更新数据
    store.subscribe(() => {
      this.setState(store.getState());
    })
  }

  render() {
    return (
      <div className="App">
        <div>{this.state.count}</div>
        <button onClick={() => { store.dispatch(addCount()) }}>加</button>
        <div>-------------------------------------</div>
        <Home></Home>
      </div>
    )
  }
}

export default App
