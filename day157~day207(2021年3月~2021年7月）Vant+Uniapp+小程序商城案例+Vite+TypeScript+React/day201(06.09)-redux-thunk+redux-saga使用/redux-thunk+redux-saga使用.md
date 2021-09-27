## Redux-thunk

### 为什么要使用redux-thunk

* 为了解决当前<font color=red>保存异步数据</font>存在的问题

  异步数据既然要保存到Redux中，所以获取异步数据也应该是Redux的一部分

  所以获取异步数据的代码应该放到Redux的<font color=red>actions</font>中，而不是放到组件生命周期方法中

* 那么为了在Redux的action中可以获取网络数据

  我们就需要使用 `redux-thunk` 中间件（用来增强dispatch方法，使其可以接收一个函数）



### redux-thunk作用

默认情况下dispatch只能接收一个对象,
使用redux-thunk(https://www.redux.org.cn/docs/advanced/AsyncActions.html)可以让dispatch除了可以接收一个对象以外, 还可以接收一个函数
是的通过dispatch派发一个函数的时候能够去执行这个函数, 而不是执行reducer函数



### redux-thunk的基本使用步骤

* 安装 redux-thunk

  `npm i redux-thunk`

* 在创建store时应用redux-thunk中间件

  ```js
  // 引入应用中间件的方法
  import { createStore, applyMiddleware } from 'redux'
  import thunkMiddleware from 'redux-thunk'
  const storeEnhancer =  applyMiddleware(thunkMiddleware);
  // 创建库时，添加增强器
  const store = createStore(reducer, storeEnhancer);
  ```

* 在action中获取网路数据

  获取到数据后，使用默认参数 `dispatch` 触发同步action

* 在组件中使用加强后的 `dispatch` 触发 发送请求的action

### 使用redux-thunk的变化

```shell
使用redux-thunk之前:
                 --------------------
        ------>  | Component 异步请求 |  -----
       |         --------------------       |
       |                                    ↓
-------------       -------------       -------------
|   Store   | <---- |  Reducer  | <---- |  Action   | dispatch({type:ADD_ATION})
-------------       -------------       -------------


我想要的是: dispatch Action的时候，不再传入一个对象 而是调用一个方法，这个方法就是请求方法
等这个方法执行完毕之后,再去把数据dispatch给reducer


使用redux-thunk之后:
                    -------------
        --------->  | Component |  ---------------------------------
       |            -------------                                   |
       |                                                            ↓
-------------       -------------       -------------       -------------
|   Store   | <---- |  Reducer  | <---- |  异步请求   | <---- |  Action   |
-------------       -------------       -------------       -------------
```

## 为什么要使用redux-saga

redux-saga(https://redux-saga-in-chinese.js.org/)和redux-thunk一样,是一个Redux中获取存储异步数据的中间件
redux-saga可以直接拦截dispatch派发的action, 从而实现在执行reducer之前执行一些其它操作

### redux-saga的基本使用步骤

- 安装Redux-saga
  `npm install redux-saga`

- 在创建store时应用redux-thunk中间件

  ```js
  import { createStore, applyMiddleware } from 'redux'
  import createSagaMiddleware from 'redux-saga'
  const sagaMiddleware = createSagaMiddleware();
  const storeEnhancer =  applyMiddleware(thunkMiddleware);
  const store = createStore(reducer, storeEnhancer);
  sagaMiddleware.run();
  ```

- 在生成器函数中获取网络数据

- 在组件中派发action