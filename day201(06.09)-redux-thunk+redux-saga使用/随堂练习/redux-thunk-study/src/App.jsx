import React from 'react'
import './App.css';
// 导入组件
import Home from "./components/Home"

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Home></Home>
      </div>
    )
  }
}

export default App
