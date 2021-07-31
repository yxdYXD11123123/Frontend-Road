## Hooks API

### `useContext`

<font color=red>使用 Context对象 提供的value值</font>

`Children.jsx`

```jsx
import React, { useContext } from "react"
// 导入context对象
import { xxContext } from "../utils/context"

// 子孙组件
function Children(props) {
  // 使用 useContext(context对象) 获取 Provider提供的value值
  const xxValue = useContext(xxContext);

  return (
    <div>
      后台组件--{xxValue}
    </div>
  )
}

export default Children;
```

其他部分和之前使用Context都一样

* 在utils文件夹中，创建`context.js` 文件夹

  ```jsx
  import { createContext } from "react";
  
  // 创建 context （注意：直接导出整个对象）
  export const xxContext = createContext();
  ```

* 祖先组件提供

  ```jsx
  import React, { useState } from 'react'
  import './App.css';
  // 导入后台组件
  import Children from './components/Children';
  // 导入context
  import { xxContext } from './utils/context';
  
  function App() {
    const [name, setName] = useState("xxContext提供的value值")
  
    return (
      // 提供 value 值
      <xxContext.Provider value={name}>
        <div className="App" onClick={() => { setName("修改xxContext提供的value值") }}>
          app -- {name}
          <Children></Children>
        </div>
      </xxContext.Provider>
    )
  }
  
  export default App;
  ```

  

### `useReducer`

可以用来进行代码复用（复用 **修改state的函数**--集中到一个reducer函数中 ），用来替代 `useState` 

#### 使用场景：

* state逻辑较复杂且包含多个子值
* 下一次state的变化，依赖于之前的state等
* 可以用来给那些触发更深的组件做性能优化

#### 语法：

```js
const [状态变量, dispatch] = useReducer(reducer, 初始状态值);
```

#### 用法：

复用 加减 功能

在`utils`里 创建 `reducer.js`

```js
// 创建 计算reducer
export const calcReducer = (state, action) => {
  // 注意：这个reducer和 redux的reducer不同的是，
  //      这个reducer初始化时是不会执行的
  switch (action.type) {
    case "ADD":
      // 返回值会给到对应的变量
      return state + 1;

    case "MINUS":
      return state - 1;

    default:
      throw new Error("没有匹配action.type")
  }
}
```

在 A组件中通过 useReducer 使用

```jsx
import React, { useReducer } from "react"
// 导入 计算reducer
import { calcReducer } from "../utils/reducer"

// 计算器A组件
function CalcA(props) {
  // 使用reducer 创建变量num, 可以通过dispatch触发reducer对应处理方式
  const [num, dispatch] = useReducer(calcReducer, 10);

  return (
    <div>
      <div>计算器A</div>
      <div>{num}</div>
      <div>
        <button onClick={() => { dispatch({ type: 'ADD' }) }}>+</button>
        <button onClick={() => { dispatch({ type: 'MINUS' }) }}>-</button>
      </div>
    </div>
  )
}

export default CalcA;
```

在B 组件中也可以使用

```jsx
import React, { useReducer } from "react"
// 导入 计算reducer
import { calcReducer } from "../utils/reducer"

// 计算器A组件
function CalcB(props) {
  // 使用reducer 创建变量num, 可以通过dispatch触发reducer对应处理方式
  const [num, dispatch] = useReducer(calcReducer, 0);

  return (
    <div>
      <div>计算器B</div>
      <div>{num}</div>
      <div>
        <button onClick={() => { dispatch({ type: 'ADD' }) }}>+</button>
        <button onClick={() => { dispatch({ type: 'MINUS' }) }}>-</button>
      </div>
    </div>
  )
}

export default CalcB;
```

#### 注意：

* React 会确保 `dispatch` 函数的标识是稳定的，并且不会在组件重新渲染时改变。这就是为什么可以安全地从 `useEffect` 或 `useCallback` 的依赖列表中省略 `dispatch`。



### `useCallback`

返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) 回调函数

#### 使用场景：

* 当我们使用 memo 优化子组件后，父组件给子组件props传递 函数时，子组件仍然可能因为父组件重新渲染时，生成新的函数，而造成子组件依赖数据（state、props）虽然没变化，但是依然会因为新函数而重新渲染。这时，使用 `useCallback` 就可以解决这样的问题

#### 语法：

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

#### 使用：

`父组件.jsx`

```jsx
import React, { useCallback, useState } from "react";
import OptimizeCom from "./OptimizeCom";

// 被优化的组件
function Father(props) {
  const [msgState, setMsgState] = useState("父组件数据");

  // 由于这里声明的函数，当组件Father重新渲染时，会重新 声明此函数
  const editMsg = () => {
    setMsgState("xxxxxxxxxx")
  }

  // 所以，我们可以使用 useCallback 解决这个问题
  const editMsg2 = useCallback(() => {
    setMsgState("xxxxxxxxxx")
  }, []) // 这里的空数组 表示 什么都不依赖

  return (
    <div>
      <div>父组件 -- {msgState}</div>
      {/* 所以，子组件中的props.editMsg函数 地址是有变化的，所以即使子组件做了memo优化，也会因为这个函数重新渲染 */}
      {/* <OptimizeCom editMsg={editMsg}></OptimizeCom> */}
      {/* 使用 useCallback 生成的函数，只会在依赖变化时重新生产新的函数 */}
      <OptimizeCom editMsg={editMsg2}></OptimizeCom>
    </div>
  )
}

export default Father;
```

`被优化的子组件.jsx`

```jsx
import React, { memo } from "react";

// 被优化的组件
function OptimizeCom(props) {
  console.log("OptimizeCom被渲染了");
  return (
    <div>
      <div>优化组件</div>
      <button onClick={() => { props.editMsg('sss') }}>修改父组件中msg</button>
    </div>
  )
}

// 使用 memo优化组件
export default memo(OptimizeCom);
```



### `useMemo`

和 `useCallback` 类似，实现原理相同

返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) 值

#### 作用：

* 把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

##### 注意：

* 如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值。
