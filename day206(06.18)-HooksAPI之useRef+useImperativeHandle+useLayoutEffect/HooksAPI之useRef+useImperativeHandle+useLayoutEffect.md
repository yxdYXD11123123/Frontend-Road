## Hooks

### `useRef`

#### 作用：

和 `createRef()` 一样，获取<font color=red>任何元素</font>和<font color=red>类组件实例</font>（不能获取函数组件）

- 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性。
- 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。
- **你不能在函数组件上使用 ref 属性**，因为他们没有实例。

```jsx
import React, { useEffect, useRef } from "react"

function RefCom(props) {
  // 使用 useRef()
  const inputRef = useRef();

  useEffect(() => {
    // 组件视图层渲染后即可使用  
    console.log(inputRef);
  }, [])

  return (
    <div>
      {/* 绑定 */}
      <input type="text" ref={inputRef} />
    </div>
  )
}

export default RefCom;
```

#### 相比于 `createRef()` 的优点

`useRef` **可以“跨渲染周期”保存数据**，只保存初始值

##### 特殊使用场景：获取上一次的state值

结合 `useEffect` 的执行时机（渲染完成后执行）

<font color=red>利用 useRef 对象具有缓存性质的机制</font>

```jsx
import React, { useEffect, useRef, useState } from "react"

function RefCom(props) {
  // 创建 状态
  const [state, setState] = useState(0);

  // 创建ref
  const stateRef = useRef();

  // 普通变量 没有缓存 (每次渲染都是创建的新对象)
  const obj = {
    current: null
  }

  // 数据更新后，更新ref的值
  useEffect(() => {
    // 保存更新后的数据
    stateRef.current = state;
    // 保存到普通变量
    obj.current = state;
  }, [state]) // state数据更新时

  return (
    <div>
      <div>当前数据状态：{state}</div>
      {/* 第一次渲染 stateRef.current 时，current其实还是undefined， 
      第二次渲染时，渲染的是上次数据更新时，设置的current值 */}
      <div>通过ref.current记录上次的值：{stateRef.current}</div>
      {/* 普通变量 缓存不了上一次的值 */}
      <div>普通值：{obj.current}</div>
      <input type="text" value={state} onChange={(e) => { setState(e.target.value) }} />
    </div>
  )
}

export default RefCom;
```



### `useImperativeHandle`

让你在使用 `ref` 时自定义暴露给父组件的实例值

与 `forwardRef` 一起使用

##### `React.forwardRef`

`React.forwardRef` 会创建一个React组件，这个组件能够将其接受的 [ref](https://react.docschina.org/docs/refs-and-the-dom.html) 属性转发到其组件树下的另一个组件中

```jsx
useImperativeHandle(ref, createHandle, [deps])
```

#### 自定义组件内部的 ref 值 暴露给父组件

```jsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react'

function ExposeRef(props, ref) {
  const inputRef = useRef();
  // 指定 ref 返回的 current实例
  // 指定 为 当前组件中 inputRef获取的input Dom元素
  useImperativeHandle(ref, () => inputRef.current);

  return (
    <div>
      <div>函数组件向父组件暴露自定义实例值</div>
      <div>
        <input type="text" ref={inputRef} />
      </div>
    </div>
  )
}

// 使用forwardRef让函数组件可以接收ref参数
export default forwardRef(ExposeRef)
```

`父组件.jsx`

```jsx
import React, { useEffect, useRef } from 'react'
// 导入 暴露自定义实例的函数组件
import ExposeRef from './components/ExposeRef';

function App() {
  // 获取 函数组件暴露的 自定义实例
  const customRef = useRef();

  useEffect(() => {
    console.log(customRef);
    // {current: input}
  })

  return (
    <div className="App">
	  {/* 传入ref */}
      <ExposeRef ref={customRef}></ExposeRef>
    </div>
  )
}

export default App
```



### `useLayoutEffect`

其函数签名与 `useEffect` 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，`useLayoutEffect` 内部的更新计划将被同步刷新。

尽可能使用标准的 `useEffect` 以避免阻塞视觉更新。

#### 与 `useEffect` 区别

* 执行时机不同
  * 挂载和更新时，`useLayoutEffect` 先执行
  * 卸载时，`useLayoutEffect` 先执行
* `useEffect` 是异步的，`useLayoutEffect` 是同步的

#### 什么时候使用

只有在需要组件挂载之前更新DOM的布局和样式的时候才使用 `useLayoutEffect`

#### 为什么使用 `useLayoutEffect` 来更新DOM布局和样式

* `useEffect` 是组件渲染到屏幕上才执行
* `useLayoutEffect` 是组件还没有渲染到屏幕上就会执行

所以，如果在组件已经渲染到屏幕上来的时候，才去更新DOM的布局和样式，那么用户体验不好，会看到闪屏

而如果是组件还没有渲染到屏幕上，就去更新DOM的布局和样式，就可以避免闪屏问题。

之所以，使用`"useEffect"`为主，是因为他是异步执行的，不会阻塞渲染

#### 注意：

* 优先使用 `useEffect`，因为它是异步执行的，不会阻塞渲染
* 会影响到渲染的操作尽量放到 `useLayoutEffect`中去，避免出现闪烁问题
* `useLayoutEffect`和`componentDidMount`是等价的，会同步调用，可能造成阻塞渲染
* `useLayoutEffect`在服务端渲染的时候使用会有一个 warning，因为它可能导致首屏实际内容和服务端渲染出来的内容不一致。
