import React from "react";
// 引入CSS transition 
import {CSSTransition} from "react-transition-group";
// 引入css
import "./index.css"

class Transition extends React.Component {
  state = {
    isShow: true
  }

  changeIsShow =()=>{
    this.setState({
      isShow: !this.state.isShow
    })
  }

  /**
   * onEnter 监听 动画进入事件
   * @param {*} HTMLElement 可以获取执行动画的DOM元素
   * @param {*} isAppearing 可以知道本次enter是否是首屏动画
   */
  onDivEnter = (HTMLElement, isAppearing)=>{
    console.log("进入了");
    console.log(HTMLElement, isAppearing);
  }

  render() {
    return (
      <div>
        <button onClick={this.changeIsShow}>按钮</button>
        {/* in 触发动画进入或退出的状态 */}
        {/* classNames 类名前缀 */}
        {/* timeout 动画运行多久  一定要大于等于transition的时间，否则会出现动画效果中断的效果 */}
        {/* appear 表示设置了首屏动画，注意：想要看到首屏动画，那么 in 的初始值必须为true */}
        <CSSTransition in={this.state.isShow} classNames="box" timeout={1000} appear unmountOnExit onEnter={this.onDivEnter}>
          {/* 内部写被添加动画类名的DOM元素 */}
          <div></div>
        </CSSTransition>
      </div>
    )
  }
}

export default Transition;