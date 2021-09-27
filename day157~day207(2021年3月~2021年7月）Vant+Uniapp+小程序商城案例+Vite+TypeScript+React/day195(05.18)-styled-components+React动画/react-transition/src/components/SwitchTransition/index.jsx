import React from "react";
// 引入
import { SwitchTransition, CSSTransition } from "react-transition-group";
// 引入css
import "./index.css"

class Transition extends React.Component {
  state = {
    key: "hello"
  }

  // 点击按钮，切换key的状态
  changeKey = () => {
    this.setState((state) => {
      return {
        key: state.key === "hello" ? "goodbye" : "hello"
      }
    })
  }

  render() {
    return (
      <div className="switch-div">
        {/* 使用SwitchTransition 包裹 CSSTransition */}
        <SwitchTransition >
          {/* 在CSSTransition中绑定 key */}
          {/* 注意：classNames是根据key去决定给哪个DOM元素添加类名的，所以key值一定要写对 */}
          <CSSTransition classNames={"switch"} key={this.state.key} timeout={3000}  >
            {/* 通过 key 的不同，展示不同内容 */}
            <button onClick={this.changeKey}>{this.state.key}</button>
          </CSSTransition>
        </SwitchTransition>
      </div>
    )
  }
}

export default Transition;