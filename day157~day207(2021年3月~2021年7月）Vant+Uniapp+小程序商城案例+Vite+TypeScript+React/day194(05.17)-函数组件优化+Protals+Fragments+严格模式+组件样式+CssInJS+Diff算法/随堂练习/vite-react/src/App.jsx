import React from 'react'
import './App.css';
// import FnCom from "./components/FnCom"
import Son from "./components/Son"
import UseCssModuleCom from "./components/UseCssModuleCom";
import UseStyledCom from "./components/UseStyledCom";
import UsePolishedCom from "./components/UsePolishedCom"

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Son>
          {/* Son.props.children内容 最后会被放到 id为app的元素中 */}
          <div>传送到原组件外部的内容</div>
        </Son>
        <UseCssModuleCom></UseCssModuleCom>
        <UseStyledCom></UseStyledCom>
        <UsePolishedCom></UsePolishedCom>
      </div>
    )
  }
}

export default App;
