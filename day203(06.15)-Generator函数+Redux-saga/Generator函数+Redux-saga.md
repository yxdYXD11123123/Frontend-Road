## Generator函数 （生成器）

Generator（生成器）是ES6标准引入的新的数据类型。一个generator看上去像一个函数，但可以<font color=red>返回多次</font>。

Generator 函数是 ES6提供的一个<font color=red>异步编程解决方案</font>

Generator 函数内部可以封装多个状态，因此可以理解为是一个<font color=red>状态机</font>

#### 语法

由 `function*` 定义，除了 `return`，还可以用 `yield` 返回多次

```js
function* fn() {
    yield 1; // 第一次调用 fn().next()时，代码会运行到这里停止，并保持此状态，下次.next()继续从这里开始运行
    yield 2;
    return 3;
}

// 调用时，返回一个 迭代器(Iterator) 对象
const fnGenerator = fn();

console.log(fnGenerator.next()); // {value: 1, done: false}
console.log(fnGenerator.next()); // {value: 2, done: false}
console.log(fnGenerator.next()); // {value: 3, done: true}
console.log(fnGenerator.next()); // {value: undefined, done: true}
```

### 使用 Generator 解决异步回调问题

```js
    // 解决异步回调问题

    // 异步返回promise
    function waitSeconds() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("success")
        }, 1500);
      })
    }

    // 每步都用 yield 返回 promise异步
    function* getData() {
      yield waitSeconds();
      yield waitSeconds();
      yield waitSeconds();
    }

    // 定义一个运行 generator的方法
    function run(generator) {
      // 进入下一状态
      let g = generator.next();
      // 未完成 继续
      if (g.done) return;
      // 使用then获取promise结果
      g.value.then((res) => {
        // 使用结果
        console.log(res);
        // 继续进入下一状态
        run(generator);
      })
    }

    // 运行
    run(getData())
```



#### 案例：生成自增id

```js
    // 生成一个自增的id
    let num = 0;
    function* add() {
      while (true) {
        yield ++num;
      }
    }

    const addGenerator = add();
    console.log(addGenerator.next().value); // 1
    console.log(addGenerator.next().value); // 2
    console.log(addGenerator.next().value); // 3
    console.log(addGenerator.next().value); // 4
    console.log(addGenerator.next().value); // 5
    console.log(addGenerator.next().value); // 6
    console.log(addGenerator.next().value); // 7
    console.log(addGenerator.next().value); // 8
```



## Redux-saga

redux-saga是一个用于管理redux应用异步操作的中间件，redux-saga通过<font color=red>创建sagas将所有异步操作逻辑收集在一个地方集中处理</font>，可以用来代替redux-thunk中间件

- 在redux-saga的世界里，所有的任务都通过用 yield Effects 来完成 `( effect可以看作是redux-saga的任务单元 )`
- sagas可以被看作是在后台运行的进程。sagas监听发起的action，然后决定基于这个action来做什么 `(比如：是发起一个异步请求，还是发起其他的action到store，还是调用其他的sagas 等 )`
- redux-saga 为各项任务提供了各种 （ Effects创建器 )

### 使用

安装：`yarn add redux-saga`

### 实例

`store.js`

```js
import { createStore, applyMiddleware } from "redux";
// 引入 创建 saga 中间件的方法 
import createSagaMiddleware from "redux-saga";
// 引入 sagas 
import { mySaga } from "./sagas";

// 创建 saga 中间件
const sagaMiddleware = createSagaMiddleware();

import reducer from "./reducer";

// 应用 saga 中间件
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// 执行 sagas (必须在创建store后，执行sagas)
sagaMiddleware.run(mySaga);

export default store;
```

`sagas.js`

```js
import { GET_COUNT } from "./constants";
// 引入
import { call, put, takeEvery, all } from "redux-saga/effects";
import { addCount } from "./action";

// 返回 Promise 的函数 （模拟异步请求）
function request() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("666" + Math.random().toFixed(2))
    }, 1200);
  })
}

function* getNewCount() {
  // 异步请求 （sagaMiddleware的run方法，会先把 yield request()执行并拿到promise结果，然后才赋值给data ）
  const data = yield request();
  // 或者 使用 call 方法 获取Promise结果
  // const data = yield call(request);

  // data已经有了数据
  // 同步触发action, put相当于dispatch
  yield put(addCount(data));
}

// 导出 sagas
export function* mySaga() {
  // 一开始就会 执行 sagas
  console.log("helloSagas");
  // 一般在这里 返回所有 sagas 的 Effect 任务单元
  yield all([takeEvery(GET_COUNT, getNewCount)])
}
```

