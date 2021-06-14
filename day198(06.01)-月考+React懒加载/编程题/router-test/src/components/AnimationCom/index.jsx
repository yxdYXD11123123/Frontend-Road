import React from "react";
// 引入动画
import { CSSTransition } from "react-transition-group"

class AnimationCom extends React.Component {
  state = {
    isShow: false
  }

  changeIsShow = () => {
    this.setState({
      isShow: !this.state.isShow
    })
  }

  render() {
    return (
      <div>
        <h2>Animation页面</h2>
        <button className="action-button" onClick={this.changeIsShow}>执行动画</button>
        <CSSTransition in={this.state.isShow} classNames="box" timeout={3000}>
          <div className="box"></div>
        </CSSTransition>
      </div>
    )
  }
}

export default AnimationCom;