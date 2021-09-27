import React from "react";
// 引入CSS transition 
import { TransitionGroup, CSSTransition } from "react-transition-group";
// 引入css
import "./index.css"

class Transition extends React.Component {
  state = {
    list: [
      {
        id: 1,
        name: "李元霸"
      },
      {
        id: 2,
        name: "行者"
      },
      {
        id: 3,
        name: "小旋风"
      }
    ]
  }

  // 添加
  add = () => {
    this.setState({
      list: [...this.state.list, { id: +new Date(), name: prompt("输入名字") }]
    })
  }

  // 移除
  remove = (id) => {
    this.setState({
      list: this.state.list.filter(val => val.id !== id)
    })
  }


  render() {
    return (
      <div>
        <ul>
          {/* 使用 */}
          <TransitionGroup>
            {this.state.list.map(val => (
              // 包裹 多个 CSSTransition ，并绑定对应的key
              <CSSTransition classNames="box" key={val.id} timeout={3000}>
                <li key={val.id}>{val.name} <a href="#!" onClick={this.remove.bind(this, val.id)}>删除</a></li>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ul>
        <button onClick={this.add}>添加</button>
      </div>
    )
  }
}

export default Transition;