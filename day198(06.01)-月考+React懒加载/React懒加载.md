## React 懒加载

### `React.lazy()`

像渲染常规组件一样处理动态引入（的组件）

也就是说会在组件首次渲染时，才导入包含组件的包。

#### 语法：

`React.lazy` 接受一个函数，这个函数需要动态调用 `import()`。它必须返回一个 `Promise`，该 Promise 需要 resolve 一个 `defalut` export 的 React 组件。

```jsx
const OtherCom = React.lazy(() => import("./components/OtherCom"))
```



### `Suspense` 

在 `Suspense` 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）

`fallback` 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 `Suspense` 组件置于懒加载组件之上的任何位置。你甚至可以用一个 `Suspense` 组件包裹多个懒加载组件。

#### 用处：

* 用与显示加载页面

```jsx
// 引入Suspense
import React, { Suspense } from 'react'
import './App.css';
// 使用懒加载，加载组件
const OtherCom = React.lazy(() => import("./components/OtherCom"))

function App() {
  return (
    <div>
      {/* 使用Suspense的fallback属性，添加加载时显示的内容 */}
      <Suspense fallback={<Waiting></Waiting>}>
        <div>
          {/* 里面随意使用懒加载组件 */}
          <OtherCom></OtherCom>
        </div>
      </Suspense>
    </div>
  )
}

function Waiting() {
  return (
    <div>加载中。。。。</div>
  )
}

export default App;
```

