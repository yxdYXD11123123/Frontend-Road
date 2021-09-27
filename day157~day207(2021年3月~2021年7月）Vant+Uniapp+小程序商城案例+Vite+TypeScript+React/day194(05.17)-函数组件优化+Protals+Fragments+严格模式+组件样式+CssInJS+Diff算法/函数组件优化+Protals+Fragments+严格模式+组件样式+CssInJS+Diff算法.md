## 函数组件优化

对于函数式组件来说：

* 没有继承关系
* 没有生命周期方法

所以不能像类组件那样优化函数组件

#### 通过 `React.memo()` 高阶函数

`React.memo()` 会返回一个优化后的组件给我们

##### 作用：

* 优化后的组件，会像 `PureComponent` 一样，相关数据不更新时，不会重新渲染

```jsx
import React from 'react'
import './App.css';
// 使用React.memo()优化 函数子组件
const FnCom = React.memo(() => {
  console.log("FnCom更新");
  return (
    <div>优化后的函数组件</div>
  )
})

class App extends React.Component {
  // 父组件更新数据时
  componentDidMount() {
    this.setState({
      aa: `1`
    })
    // 只会触发  “App更新”
    // 被优化的函数子组件 不会更新
  }

  render() {
    console.log('App更新');
    return (
      <div className="App">
        <FnCom></FnCom>
      </div>
    )
  }
}

export default App;
```



## Portals

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案

#### 创建 Portals

```jsx
import React from 'react';
import ReactDOM from "react-dom"

class Son extends React.Component {
  render() {
    return (
      <div>
        <div>还在原组件内部的内容</div>
        {/* 使用 ReactDOM.createPortal(React元素结构, 指定位置container) */}
        {ReactDOM.createPortal(this.props.children, document.getElementById("app"))}
      </div>
    )
  }
}

export default Son
```

#### 使用

```jsx
import React from 'react'
import './App.css';
// import FnCom from "./components/FnCom"
import Son from "./components/Son"

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Son>
          {/* Son.props.children内容 最后会被放到 id为app的元素中 */}
          <div>传送到原组件外部的内容</div>
        </Son>
      </div>
    )
  }
}

export default App;
```



## Fragments

##### 解决问题：

* 由于React规定，组件中只能有一个根元素，所以每次编写组件的时候，我们都需要在最外层包裹一个冗余的标签

##### 作用：

* Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。

```jsx
// 引入 Fragment
import React, { Fragment } from 'react';

class Son extends React.Component {
  render() {
    return (
      // 使用 Fragment
      <Fragment>
        <div>1</div>
        <div>2</div>
      </Fragment>
    )
  }
}

export default Son;
```

#### 可以使用短语法

 **`<> </>`**

```jsx
// 引入
import React from 'react';

class Son extends React.Component {
  render() {
    return (
      <>
        <div>1</div>
        <div>2</div>
      </>
    )
  }
}

export default Son
```

注意：短语法不可以使用 `key` 属性

#### 可以绑定key属性

`key` 是唯一可以传递给 `Fragment` 的属性。未来可能会添加对其他属性的支持



## `StrictMode`

#### 作用：

* 开启严格模式，检查后代组件中是否存在潜在问题，类似于 `JS` 中 `"use strict"`

#### 注意点：

* 和 `Fragment` 一样，不会渲染出任何 UI 元素
* 仅在 "开发模式" 下有效

#### `StrctMode` 检查了什么？

* 检查过时或者废弃的属性、方法等
* 检查意外的副作用
* 组件的 constructor 会被调用两次
* 检查这里写的一些逻辑代码被调用多次时，是否会产生一些副作用
* 识别不安全的生命周期



## 组件样式

#### 行内样式

##### 优点：

* 可以动态获取当前state中的状态

##### 缺点：

* 写法上都需要使用驼峰标识
* 某些样式没有提示
* 大量的样式，代码混乱
* 某些样式无法编写（例如：伪类、伪元素）



#### 外链样式

将CSS代码写到一个单独的CSS文件中，在使用的时候导入进来

##### 优点：

- 编写简单，有代码提示，支持所有CSS语法

##### 缺点：

- 不可以动态获取当前state中的状态
- 属于全局的CSS，样式之间会互相影响



### CSS模块化

React的脚手架已经内置了 `css module` 的 配置：

#### 使用方法

将 `.css/.less/.scss` 等样式文件都修改成 `.module.css/.module.less/.module.scss` 等

----

在一个 `xxx.module.css` 文件中，声明样式

```css
.bgc {
  background-color: aqua;
}
```

然后在组件中引入，通过变量名使用

```jsx
import React from "react";
// 引入样式文件
import styles from "./index.module.css"

class UseCssModuleCom extends React.Component {
  render() {
    return (
      // 使用 样式
      <div className={styles.bgc}>背景色</div>
    )
  }
}

export default UseCssModuleCom;
```

#### 优点：

* 编写简单，有代码提示，支持所有CSS语法
* 解决了全局样式互相污染的问题

#### 缺点：

* 不可以动态获取当前 state 中的状态



### CSS in JS

使 `用 JS 来编写 CSS `的库， 推荐第三方库 `styled-components`

#### 优点：

可以让CSS具备样式嵌套、函数定义、逻辑复用、动态修改状态等特性

也就是说，从某种层面上，提供了比过去 `Less/Scss` 更为强大的功能

所以 `CSS in JS` ，在React中也是一种比较推荐的方式

#### 使用 `styled-components`

```jsx
import React from "react";
// 引入styled-components
import styled from "styled-components";

// 声明组件样式 (这里的div其实是一个方法，后面 反引号其实是在传参)
const WithStyles = styled.div`
& {
 background-color: blue;
 p {
   background-color: yellow;
 }
}
`

class UseStyledCom extends React.Component {
  render() {
    return (
      // 使用 组件
      <WithStyles>
        背景色
        <p>p标签</p>
      </WithStyles>
    )
  }
}

export default UseStyledCom;
```





## `Diff` 算法

https://zh-hans.reactjs.org/docs/reconciliation.html#the-diffing-algorithm

#### 执行过程

1. 初次渲染时，React会根据初始state（Model），创建一个虚拟DOM对象（树）
2. 根据虚拟DOM生成真正的DOM，渲染到页面中
3. 当数据发生变化后（`setState()`），重新根据新的数据，创建新的虚拟DOM对象（树）
4. 与上一次得到的虚拟DOM对象，使用 `Diff` 算法对比，得到需要更新的内容
5. 最终，React 只将变化的内容更新（patch）到DOM中，重新渲染到页面

只要想让状态发生变化，就调用setState()，只要调用setState()，就会执行组件的render方法，来重新渲染组件

注意：render重新执行，不代表把整个组件重新渲染到页面中，实际上，React内部会使用 虚拟DOM 和 Diff 算法来做到 部分更新

* 部分更新：只将变化的地方重新渲染到页面中，这样，DOM更新就降到了最低







