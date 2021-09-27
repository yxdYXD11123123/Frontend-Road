import React from 'react';
// 引入子组件
import Son from "../Son";
// 引入子组件
import Daughter from "../Daughter"
// 引入context
import ThemeContext from "../../utils/context-theme";

class Father extends React.Component {
  state = {
    msg: "默认值"
  }

  // 1.声明一个用来 接收子组件传来的值 的函数
  receiveMsgFromSon = (msg) => {
    this.setState({
      msg
    })
  }

  render() {
    return (

      <ThemeContext.Consumer>
        {value => (
          <div>
            父组件
            <p>{this.state.msg}</p>
            {/* 2.给子组件 传入 接收参数的回调函数*/}
            <Son receiveMsgFromSon={this.receiveMsgFromSon}></Son>
            {/* 兄弟组件 通过props 拿到，实现兄弟之间传值 */}
            <Daughter msg={this.state.msg}></Daughter>

            <p>主题：{value}</p>
          </div>
        )
        }
      </ThemeContext.Consumer>
    )
  }
}

export default Father;
