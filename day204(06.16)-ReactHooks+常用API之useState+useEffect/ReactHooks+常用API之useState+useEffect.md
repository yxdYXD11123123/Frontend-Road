## React Hooks

hook 是React 16.8 的新特性，它可以让函数式组件<font color=red>拥有 类组件 的特性</font>

### 为什么要学习Hooks

* this 管理，容易引起难以追踪的Bug
* 生命周期的划分并<font color=red>不符合 “内聚性” 原则</font>，具有强关联的逻辑（设置定时器、清除定时器）拆分在不同的生命周期方法中
* 组件复用（数据共享和功能复用）的困局，从早期的`Mixin`，到高阶组件 `HOC`，再到 `RenderProps`，始终没有要给清晰直观又便于维护的组件复用方案。

### 如何使用 Hooks

Hook的使用我们无需 安装任何第三方库，因为它就是React的一部分

Hook只能在函数组件中使用，不能在类组件、或者函数组件之外的地方使用

Hook只能在函数最外层调用，不要再循环、条件判断或者子函数中调用

##### 注意：

* 无论是 `CompositionAPI` 还是 `Hooks` 都是vue或者react比较底层的API

  其实本来就存在，只是随着技术的变化，慢慢暴露出来了而已

### Hook API

#### `useState(initialState)`

返回一个<font color=red>state</font>，以及<font color=red>更新state的函数</font>

```js
const [state, setState] = useState(null);
```

`setState` 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。

```js
setState(newState);
```



#### `useEffect()`

该Hook 接收一个包含命令式、且可能有副作用代码的函数

```js
useEffect(didUpdate);
```

在函数组件主体内（这里指在React渲染阶段），改变DOM、添加订阅、设置定时器、记录日志以及<font color=orange>执行其它包含副作用的操作</font>都是不被允许的，因为这可能会产生莫名其妙的bug并破坏 UI 的一致性。

所以，需要使用`useEffect`完成副作用操作

赋值给 `useEffect` 的函数会<font color=red>在组件渲染到屏幕之后执行</font>。 

##### 注意：

* 默认情况下，effect 将在每轮渲染结束后执行，但你可以选择让它 [在只有某些值改变的时候](https://reactjs.bootcss.com/docs/hooks-reference.html#conditionally-firing-an-effect) 才执行。

##### 清除 effect

通常，组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源

<font color=red>`useEffect` 函数可以返回一个清除函数</font>

为防止内存泄漏，清除函数会在组件卸载前执行。

如果组件多次渲染（通常如此），则**在执行下一个 effect 之前，上一个 effect 就已被清除**。

##### 执行时间：

与 `componentDidMount`、`componentDidUpdate` 不同的是，传给 `useEffect` 的函数会在<font color=red>浏览器完成布局与绘制**之后**</font>，在一个延迟事件中被调用。

虽然 `useEffect` 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行。在开始新的更新前，React 总会先清除上一轮渲染的 effect。

##### 条件执行：

默认情况下，effect会在每轮组件渲染完成后执行。这样的话，一旦effect的以来发生变化，它就会被重新创建

要实现这一点，可以给 `useEffect` 传递第二个参数，它是 effect 所依赖的值数组。更新后的示例如下：

```js
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  // 指定依赖 props.source
  // props.source 变化时执行此函数
  [props.source],
);
```

此时，只有当 `props.source` 改变后才会重新创建订阅。