import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.input = React.createRef();
  }


  getInput = () => {
    console.log(this.input);
  }

  render() {
    return (
      <div>
        <div>非受控组件</div>
        <input type="text" ref={this.input} />
        <button onClick={this.getInput}>点击获取非受控组件</button>
      </div>
    )
  }
}

export default App;
