import React from 'react'
import './App.css';
// 引入
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <div className="App" onClick={() => { this.props.dispatch({ type: "GET_COUNT" }) }}>
        app--{this.props.count}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

export default connect(mapStateToProps)(App)
