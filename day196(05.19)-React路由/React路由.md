## React 路由

### 什么是路由

路由维护了URL地址和组件的映射关系，通过这个影射关系，我们就可以根据不同的URL地址，去渲染不同的组件

### 使用步骤

* 引入

  ```jsx
  // 引入 react-router-dom（专门用于web端）
  // BrowserRouter history模式路由 优点：手动切换路由
  // HashRouter hash模式路由 优点：兼容性强
  // Link 用来改变浏览器中的URL
  // NavLink  和Link一摸一样，编译完就是 a 标签
  // Route 占位符，用来展示组件
  import { BrowserRouter, HashRouter, Link, NavLink, Route } from "react-router-dom"
  ```

* 使用 `BrowserRouter` 或者 `HashRouter`  包裹整个应用，也可以包裹`Link` `NavLink` `Route`

* 通过 `Link` 标签 的 `to ` 属性，跳转地址

* `Route` 标签有两个属性 `path="地址"` + `component="组件"`

```jsx
import React from 'react';
import './App.css'
// 引入 react-router-dom（专门用于web端）
// BrowserRouter history模式路由 优点：手动切换路由
// HashRouter hash模式路由 优点：兼容性强
// Link 用来改变浏览器中的URL
// NavLink  和Link一摸一样，编译完就是 a 标签
// Route 占位符，用来展示组件
import { BrowserRouter, HashRouter, Link, NavLink, Route, Switch } from "react-router-dom"

function App() {
  return (
    // XXXRouter用来监听路由变化
    <HashRouter>
      <Link to="/home">主页</Link>-----
      <Link to="/about">关于页</Link>
      {/* Switch 用来匹配路由，如果匹配不到，就显示最后一个 */}
      <Switch>
        <Route path={"/home"} component={Home}></Route>
        <Route path={"/about"} component={About}></Route>
        <Route path={"/"} component={Home}></Route>
      </Switch>
    </HashRouter>
  )
}

// 主页
function Home() {
  return (
    <div>Home主页</div>
  )
}

// 关于页
function About() {
  return (
    <div>About主页</div>
  )
}

export default App;
```



### 路由的执行过程

* 当点击Link的时候，就会修改浏览器中的 pathname
* 只要 浏览器地址栏中的 pathname 发生改变，React 路由就会监听到这个改变
* React路由监听到变化后，就会遍历所有Route组件，分别使用Route组件中的path路由规则，与当前的浏览器地址栏中的pathname进行匹配
* 只要匹配成功，就会把当前 Route 对应的组件，展示在页面中

#### 注意：

* 匹配时，不是找到第一个匹配的路由就停下来了，而是，所有的Route 都会进行匹配，只要匹配就会展示该组件

* 也就是说；在一个页面中，可以有多个Route可以同时被匹配

  ##### 精确匹配 `exact`

  可以解决类似于 `/home`  被 `/home/about` 匹配到的问题

  ```jsx
        {/* exact 用于要求 Route中的path值精确匹配，精确匹配成功才显示 */}
        <Route exact path={"/home"} component={Home}></Route>
        <Route exact path={"/home/about"} component={About}></Route>
  ```

  

### API

#### `Route`

Route中添加组件内容有两种方式：

* `component` 只要路由地址匹配到时才render
* `children` 无论是否已经匹配到路由地址，都会render

每个 `<Route>` 会给组件提供 三个 `props` ：`match`  `location`  `history`

* `match`

  可以用来获取当前所处 `Route` 的 `pathname`

  ```jsx
  //  <Route path="/my" component={My}> 
  // 在 My 组件中，this.props.match.url 就可以获取 "/my"
  <Route path={this.props.match.url + "/info"} component={Info}></Route>
  ```

* `location`

  当前完整地址

#### `<NavLink>`

相较于 `<Link>` 可以添加样式属性，当匹配到当前路由时，渲染 `<Link>` 元素

```jsx
import React from 'react';
import './App.css';
import { BrowserRouter, HashRouter, Link, NavLink, Route, Switch } from "react-router-dom"

function App() {
  return (
    // XXXRouter用来监听路由变化
    <HashRouter>
      <NavLink exact to="/home" activeStyle={{ color: "coral" }}>主页</NavLink>-----
      <NavLink exact to="/home/about" activeStyle={{ color: "coral" }}> 关于页</NavLink>
      {/* exact 用于要求 Route中的path值精确匹配，精确匹配成功才显示 */}
      <Route exact path={"/home"} component={Home}></Route>
      <Route exact path={"/home/about"} component={About}></Route>
    </HashRouter>
  )
}

// 主页
function Home() {
  return (
    <div>Home主页</div>
  )
}

// 关于页
function About() {
  return (
    <div>About主页</div>
  )
}

export default App;
```

#### `Switch`

在 `Switch` 中，只会匹配一个 `Route`，如果没有匹配到对应路由的组件，就会将最后一个组件，作为默认显示组件


##### 注意：

* `Switch` 中指定最后一个`<Route>`时，不要给`<Route>` 添加 `path` 属性

```jsx
      <Switch>
        <Route path={"/home"} component={Home}></Route>
        {/* 由于switch的匹配极致，只找一个, 找到/home以后，下面的/home/about永远不会被找到 */}
        {/* <Route path={"/home/about"} component={Home}></Route> */}
        <Route path={"/about"} component={About}></Route>
        {/* 404页面就适合放到switch最后一个位置 */}
        <Route component={Home}></Route>
      </Switch>
```

#### `Redirect`

资源重定向，也就是可以在访问某个资源地址时，重定向到另外一个资源地址

例如：访问 `/user` 重定向到 `/login`

```jsx
import React from "react";
import { Redirect } from "react-router-dom"

class User extends React.Component {
  state = {
    isLogin: false
  }

  render() {
    let user = (
      <div>用户页</div>
    )
    // 如果用户没有登录，重定向到登录页
    return this.state.isLogin ? user : <Redirect to="/login"></Redirect>
  }
}

export default User;
```



### 嵌套路由

#### 注意点：

* 不能在一级路由写精确匹配（否则 进入不了一级路由组件，进而匹配不到二级路由）
* 二级路由要进行路径的拼接

```jsx
import React from 'react'
import './App.css'
// 引入路由
import { HashRouter, Route, Redirect } from "react-router-dom";
// 引入 Home 页
import Home from "./components/Home"
// 引入 My 页
import My from "./components/My"


function App() {

  return (
    <HashRouter>
      <Redirect from="/" to="/home"></Redirect>
      <Route path="/home" component={Home}></Route>
      {/* 首先指定一级路由  注意：不可添加 exact  */}
      <Route path="/my" component={My}></Route>
    </HashRouter>
  )
}

export default App
```

`My.jsx`

```jsx
import React from "react";
import { Link, Route } from "react-router-dom"

class My extends React.Component {
  render() {
    return (
      <div>
        <h2>My页</h2>
        <p>
          <Link to="/my/info">我的信息</Link> |
          <Link to="/my/detail">我的详情</Link>
        </p>
        <div>
          {/* 一级路由组件中 指定二级路由 */}
          <Route path="/my/info" component={Info}></Route>
          <Route path="/my/detail" component={Detail}></Route>
        </div>
      </div>
    )
  }
}

function Info() {
  return (
    <div>我的信息</div>
  )
}

function Detail() {
  return (
    <div>我的详情</div>
  )
}

export default My;
```



### 手动路由跳转

即不通过 `Link` 、`NavLink` 来设置资源地址，而是通过`JS`来设置资源地址

#### Hash模式

* 通过 `window.location.hash` 设置地址 

```jsx
<button onClick={() => { window.location.hash = "/my/detail" }}>我的详情</button>
```



#### History模式

* 通过 组件的 props 中 `history.push("新地址")`  设置新地址

```jsx
<button onClick={() => { this.props.history.push("/my/info") }}>我的信息</button>
```

