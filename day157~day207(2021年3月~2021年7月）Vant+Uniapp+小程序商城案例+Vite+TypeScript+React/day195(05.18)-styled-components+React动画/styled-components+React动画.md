## styled-components

#### 使用步骤

* 安装 `yarn add styled-component`
* 在你要使用styled-component的组件中，引入
* 定义带有样式的组件
* 在组件中使用定义好的组件

```jsx
import React from "react";
// 引入styled-component包
import styled from "styled-components";

// 定义带有样式的组件
const Div = styled.div`
// 自身样式
width: 100px;
height: 100px;
background-color: rebeccapurple;
// 内部标签样式
span {
  color: white;
}
`


class UseStyleCom extends React.Component {
  render() {
    return (
      <div>
        {/* 使用 */}
        <Div>
          <span>里面的span标签内容</span>
        </Div>
      </div>
    )
  }
}

export default UseStyleCom;
```

### 使用 `props`

在 `styled-components` 中使用 React 传递的属性

```jsx
import React from "react";
// 引入styled-component包
import styled from "styled-components";

const Button = styled.button`
/* 在内部通过 使用props, 有传入的值使用传入的，没有就使用默认值 */
width: ${props => props.width? props.width: "70px"};
height:${props => props.height? props.height: "20px"};
background-color: ${props => props.backgroundColor? props.backgroundColor: "greenyellow"};
/* 有没有primary，有就按照primary的样式 */
border: ${props=>props.primary? "none":"1px solid black"};
`


class UseStyleCom extends React.Component {
  state = {
    width: "100px",
    height: "50px"
  }

  render() {
    return (
      <div>
        {/* 使用 */}
        <Button primary {...this.state}>按钮</Button>
      </div>
    )
  }
}

export default UseStyleCom;
```

### 使用 样式继承

##### 语法：

```jsx
const Button = styled.button`
/* 基础样式 */
width: 80px;
height: 40px;
`

// 继承Button样式
const NewButton = styled(Button)`
/* 基于继承样式，添加更多样式 */
border: none;
`
```



## React动画

### 原生动画

```jsx
import React from "react";
// 引入styled-component包
import styled from "styled-components";

// 定义带有样式的组件
const Div = styled.div`
// 自身样式
width: ${props=>props.width};
height: ${props=>props.height};
background-color: greenyellow;
opacity: ${props=>props.opacity};
transition: all 3s linear;
`


class Transition extends React.Component {
  // 通过控制 样式组件中使用的state，实现动画渐变
  state = {
    width: "100px",
    height: "100px",
  }

  clickHandler = ()=>{
    this.setState({
      width: "30px",
      height: "30px",
      opacity: 0
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.clickHandler}>让盒子逐渐消失</button>
        <Div {...this.state}></Div>
      </div>
    )
  }
}

export default Transition;
```



### 插件动画

#### `react-transition-group` 的使用

##### 动画组件

* `Transition`

  该组件是一个和平台无关的组件（不一定要结合CSS）

* `CSSTransition`

  在前端开发中，通常使用该组件来完成过渡动画效果

* `SwitchTransition`

  两个组件显示和隐藏切换时，使用该组件

* `TransitionGroup`

  将多个动画组件包裹在其中，一般用于列表中的元素的动画



#### `CSSTransition`

利用 `css` 类名的切换，实现动画效果

```css
/* xxx-enter 进入动画执行之前绑定的类名 */
/* xxx-enter-active 进入动画执行中绑定的类名 */
/* xxx-enter-done 进入动画执行完绑定的类名 */
.box-enter {
  width: 10px;
  height: 10px;
  opacity: 0.1;
  background-color: skyblue;
}

.box-enter-active {
  width: 100px;
  height: 100px;
  opacity: 1;
  background-color: skyblue;
  transition: all 3s;
}

.box-enter-done {
  width: 80px;
  height: 80px;
  opacity: 0.8;
  background-color: skyblue;
}

/* xxx-exit 退出动画执行之前绑定的类名 */
/* xxx-exit-active 退出动画执行中绑定的类名 */
/* xxx-exit-done 退出动画执行完绑定的类名 */
.box-exit {
  width: 80px;
  height: 80px;
  opacity: 0.8;
  background-color: skyblue;
}

.box-exit-active {
  width: 10px;
  height: 10px;
  opacity: 0.1;
  background-color: skyblue;
  transition: all 3s;
}

.box-exit-done {
  width: 10px;
  height: 10px;
  opacity: 0.1;
  background-color: skyblue;
}

/* xxx-appear 首屏动画执行之前绑定的类名 */
/* xxx-appear-active 首屏动画执行中绑定的类名 */
/* xxx-appear-done 首屏动画执行完绑定的类名 */
.box-appear {
  width: 80px;
  height: 80px;
  opacity: 0.8;
  background-color: slateblue;
}

.box-appear-active {
  width: 10px;
  height: 10px;
  opacity: 0.1;
  background-color: slateblue;
  transition: all 3s;
}

.box-appear-done {
  width: 10px;
  height: 10px;
  opacity: 0.1;
  background-color: slateblue;
}

```

组件中使用 `CSSTransition`

```jsx
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
```



#### `SwitchTransition` 

完成组件切换的动画

##### 注意：

* `SwitchTransition` 中要包含 `CSSTransition` 或者 `Transtion` 组件，不能直接包裹你想要切换的组件
* `SwitchTransition` 中要包含的  `CSSTransition` 或者 `Transtion` 组件 不再像以前那样接收 `in` 属性来操作元素状态，取而代之的是key属性

```jsx
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
```

`index.css`

```css
.switch-div {
  text-align: center;
}
/* xxx-enter 进入动画执行之前绑定的类名 */
/* xxx-enter-active 进入动画执行中绑定的类名 */
/* xxx-enter-done 进入动画执行完绑定的类名 */
.switch-enter {
  opacity: 0;
  transform: translate(-100%);
}

.switch-enter-active {
  opacity: 1;
  transform: translate(0%);
  transition: all 3s;
}

.switch-enter-done {
  opacity: 1;
  transform: translate(0%);
}

/* xxx-exit 退出动画执行之前绑定的类名 */
/* xxx-exit-active 退出动画执行中绑定的类名 */
/* xxx-exit-done 退出动画执行完绑定的类名 */
.switch-exit {
  opacity: 1;
  transform: translate(0%);
}

.switch-exit-active {
  opacity: 0;
  transition: all 3s;
  transform: translate(100%);
}

.switch-exit-done {
  opacity: 0;
  transform: translate(100%);
}

```

#### `transitionGroup`

##### 使用步骤：

* 引入 `TransitionGroup`
* 使用 `TransitionGroup` 包裹 `CSSTransition`
* 在 `CSSTransition` 上设置 `key` `classNames` `timeout`

```jsx
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
```

`index.css`

```css
ul {
  text-align: center;
}
li {
  width: 300px;
}
/* xxx-enter 进入动画执行之前绑定的类名 */
/* xxx-enter-active 进入动画执行中绑定的类名 */
/* xxx-enter-done 进入动画执行完绑定的类名 */
.box-enter {
  opacity: 0;
  transform: translate(-100%);
}

.box-enter-active {
  opacity: 1;
  transform: translate(0%);
  transition: all 3s;
}

.box-enter-done {
  opacity: 1;
  transform: translate(0%);
}

/* xxx-exit 退出动画执行之前绑定的类名 */
/* xxx-exit-active 退出动画执行中绑定的类名 */
/* xxx-exit-done 退出动画执行完绑定的类名 */
.box-exit {
  opacity: 1;
  transform: translate(0%);
}

.box-exit-active {
  opacity: 0;
  transition: all 3s;
  transform: translate(100%);
}

.box-exit-done {
  opacity: 0;
  transform: translate(100%);
}
```

