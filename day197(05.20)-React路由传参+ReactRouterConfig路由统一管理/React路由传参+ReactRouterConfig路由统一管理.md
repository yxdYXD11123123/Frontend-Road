## React路由传参

### 通过 URL 传参

#### 通过 `/:xxx` 获取 URL参数 （动态路由）

* 在 `Route` 中设置 URL参数 `params` 为 `:id`

  ```jsx
  <Route path={this.props.match.url + "/detail/:id"} component={Detail}></Route>
  ```

* 通过 `Link` 带参数访问

  ```jsx
  <Link to="/my/detail/001">我的详情</Link>
  ```

* 在 组件中 通过 `props.match.params.xxx` 获取

  ```jsx
  function Detail(props) {
    return (
      <div>
        <div>我的详情</div>
        <p>id: {props.match.params.id}</p>
      </div>
    )
  }
  ```

  

#### 通过 `?xxx:xxx` 获取 请求参数

* 带有请求参数访问某路由地址

  ```jsx
  <button onClick={() => { window.location.hash = "/my/info?name=frank" }}>我的信息</button>
  ```

* 路由

  ```jsx
  <Route path={"/my/info"} component={Info}></Route>
  ```

* 路由组件中

  * 通过 `props.location.search` 获取请求参数

  * 通过 `URLSearchParams` 处理

  * 通过 `URLSearchParams().get()` 方式获取，使用

    `getAll()` 获取多个

  ```jsx
  function Info(props) {
    // 通过 props.location.search 获取 ?xxx=xxx&xxx=xxx 请求参数
    console.log(props.location.search);
    // 通过 URLSearchParams("?xxx=xxx&xxx=xxx") 创建一个整理好请求参数的实例对象
    let query = new URLSearchParams(props.location.search);
    return (
      <div>
        <p>我的信息</p>
        {/* 通过 URLSearchParams 实例的get方法  */}
        <div>我的名字：{query.get("name")}</div>
      </div>
    )
  }
  ```

  

### 通过 `NavLink` 或 `Link` 组件的 `to` 属性传参

`Link` 的 `to` 属性 可以传递对象类型的参数

对象中可以传递 state 对象

* 在 `Link` 中通过 `state` 传递参数

  ```jsx
   <Link to={{ pathname: "/my/info", search: "?name=dong", state: { age: 11 } }}>我的信息</Link>
  ```

* 在组件中获取

  ```jsx
  function Info(props) {
    // 通过 props.location.state 获取
    console.log(props.location.state); // {age: 11}
    return (
      <div>
        <p>我的信息</p>
      </div>
    )
  }
  ```

  

## 路由的统一管理

插件：`react-router-config`

### 统一管理一级路由

* 创建 `routes` 文件夹，在文件夹中创建 `index.js`，里面写路由规则
* 在需要展示的组件中的文件中导入 `routes` 和 `react-router-config`
* 使用 `renderRoutes()` 方法来渲染映射的组件

### 统一管理嵌套路由

* 在一级路由规则中，给一级路由添加 `routes` 属性，里面放嵌套路由的规则
* 在子路由的组件中，继续通过 renderRoutes 渲染映射组件



`src/routes/index.jsx`

```jsx
// 引入重定向时需要的组件
import React from "react"
import { Redirect } from "react-router-dom"
// 导入组件
import Home from "../components/Home";
import My from "../components/My";
// 导入嵌套路由组件
import MyName from "../components/MyName";
import MyAge from "../components/MyAge";

// 配置路由
const routes = [
  // 访问 "/" 时，重定向到 "/home"
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />
  },
  // 首页
  {
    path: "/home",
    exact: true,
    component: Home
  },
  // 个人中心页
  {
    path: "/my",
    component: My,
    routes: [
      {
        path: "/my/name",
        component: MyName
      },
      {
        path: "/my/age",
        component: MyAge
      }
    ]
  }
];

// 导出配置
export default routes;

```

`App.jsx`

```jsx
import React from 'react';
import './App.css';
// 引入 React 路由
import { HashRouter } from "react-router-dom"
// 引入 路由配置插件
import { renderRoutes } from "react-router-config";
// 导入 路由配置
import routes from "./routes";

function App() {
  return (
    <HashRouter>
      {/* 使用 renderRoutes 渲染 Routes */}
      {renderRoutes(routes)}
    </HashRouter>
  )
}

export default App;
```

`My.jsx`

```jsx
import React from "react"
import { Link } from "react-router-dom"
// 引入 路由配置插件
import { renderRoutes } from "react-router-config";

function My(props) {
  // props.route中可以获取当前路由信息
  console.log(props);
  return (
    <div>
      <div>个人中心</div>
      <div><Link to="/home">回到首页</Link> | </div>
      <div>
        {/* 利用当前路由信息中的 routes 继续渲染 嵌套Routes */}
        {renderRoutes(props.route.routes)}
      </div>
    </div>
  )
}

export default My;
```

