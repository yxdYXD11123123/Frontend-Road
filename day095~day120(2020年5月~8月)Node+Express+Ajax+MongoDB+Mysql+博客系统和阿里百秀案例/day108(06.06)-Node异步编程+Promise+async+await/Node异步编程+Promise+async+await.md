## `Node.js`异步编程

### `js`获取值

#### 同步代码（通过返回值获取值）

#### 异步代码（通过回调函数获取值）

### `API`

#### 同步`API`

```js
let result = fs.readFileSync("./01.txt","utf8");
console.log(result);
```

#### 异步`API`

```js
let result = fs.readFile("./01.txt","utf8", (err, data)=>{
	console.log(data)
});
```

#### 区别：

同步`API`，可以直接得到内容return出来的返回值

异步`API`，需要用回调函数拿到返回值



### Promise

Promise出现的目的是解决`Node.js`异步编程中回调地狱的问题

```js
// 依次读取  1.txt, 2.txt, 3.txt
const fs = require("fs");
// 回调的嵌套（回调地狱）
// 阅读麻烦，书写麻烦
fs.readFile("./1.txt", "utf8", (err, data) => {
    console.log(data);
    fs.readFile("./2.txt", "utf8", (err, data) => {
        console.log(data);
        fs.readFile("./3.txt", "utf8", (err, data) => {
            console.log(data);
        })
    })
})

// 解决回调嵌套的问题，可以使用promise，他是解决回调地狱的终极方案
```

#### Promise是什么

只是一个语法糖，本质其实还是异步

#### Promise的语法

1. 实例化Promise对象
2. 把异步方法放在Promise中
3. resolve代表成功时的回调，reject代表失败时的回调
4. 使用实例化完的Promise对象调用then方法拿到成功的结果，catch拿到失败时的结果

```js
// Promise是ES（js）中的一个内置对象
// resolve 是成功时的回调
// reject 是失败时的回调

// 把回调嵌套解决掉
let promise = new Promise((resolve, reject) => {
    fs.readFile("./1.txt", "utf8", (err, data) => {
        if (err != null) {
            reject(err);
        }
        else {
            resolve(data);
        }
    })
})

// 使用then方法即可返回成功时 Promise的resolve结果
promise.then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(data);
})
```

进而多个异步编程便可以通过promise的包装，避免掉回调嵌套

```js
function p1() {
    // 把回调嵌套解决掉
    return new Promise((resolve, reject) => {
        fs.readFile("./1.txt", "utf8", (err, data) => {
            if (err != null) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

function p2() {
    return new Promise((resolve, reject) => {
        fs.readFile("./2.txt", "utf8", (err, data) => {
            if (err != null) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

function p3() {
    return new Promise((resolve, reject) => {
        fs.readFile("./3.txt", "utf8", (err, data) => {
            if (err != null) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

p1().then((data) => {
    console.log(data);
    return p2();
}).then((data) => {
    console.log(data);
    return p3();
}).then((data) => {
    console.log(data);
})
```

#### Promise的简化

JavaScript 的 `async/await` 实现，也离不开 [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)。

使用`async`修饰方法，表示方法中有异步操作等

调用返回Promise的方法，一定要用await修饰

```js
const fs = require('fs');

// 有没有方法可以让现有的API变成返回Promise对象的方法
const promisify = require("util").promisify;
// util.promisify的作用是：传入一个遵循常见的错误优先的回调风格的函数（也就是(err,data)=>{}这样的回调函数为最后一个参数），并返回一个返回promise的版本
const readFile = promisify(fs.readFile);

async function run() {
    let r1 = await readFile("./1.txt", "utf8");
    let r2 = await readFile("./2.txt", "utf8");
    let r3 = await readFile("./3.txt", "utf8");
    console.log(r1, r2, r3);
}

run();
```

###### 补充`async`的作用：

`async` 表示声明一个函数中有异步操作

并且让这个函数return的返回值是一个promise对象，如果我们写了一个直接值，那么会把这个直接值通过 `Promise.resolve()` 封装成 <font color=red>Promise对象</font>，

也正是因为这样，即使我们最外层不能用await获取其返回值的情况下，我们还可以将`async`函数的返回值直接使用then()方法取出。

又因为<font color=red> promise 无等待的特点</font> 所以在没有 await 的情况下执行 `asnyc` 函数，它会立马返回一个 Promise 对象<font color=red>（只不过返回的这个Promise对象的状态可能是 pending，也可能是成功状态等 ）</font>，并且，绝不会阻塞后面的语句。

```js
async function testAsync() {
    return "hello async"
}

async function testAsync2() {
    return Promise.resolve("hello async2")
}

async function test() {
    const v1 = testAsync();
    const v2 = testAsync2();
    const v3 = await testAsync();
    const v4 = await testAsync2();
    console.log(v1, v2);
    // Promise { 'hello async' } Promise { 'hello async2' }
    console.log(v3, v4);
    // hello async hello async2
}

// 后打印 text() 中内容 （异步执行text）
test();
// 先打印 1 
console.log(1);
```

```js
async function testAsync() {
    return "hello async"
}

async function testAsync2() {
    return Promise.resolve("hello async2")
}

async function test() {
    const v1 = testAsync();
    const v2 = testAsync2();
    console.log(v1, v2);
    // 先打印
    // Promise { 'hello async' } Promise { <pending> }
    // 再打印
    // 1
}
// 这次，所有代码同步执行 （即使我们声明了以上函数是异步）
test();
console.log(1);
```

从上面紧邻的这个试验中可以看出：

* Promise 无等待的特点
* `asnyc` 函数内容必须有 await时，才是一个异步函数



#### promise的简写

```js
const fs = require("fs");

// 如何把普通函数变成异步呢？
// 在es中，我们如果想要把一个函数变成异步函数，只需要在函数前面添加async
// 注意：我们异步函数默认的返回值就是 Promise对象
async function p1() {
    return "p1";
}
async function p2() {
    return "p2";
}
async function p3() {
    return "p3";
}
// 这里必须给 函数run加 async，因为await必须在async函数内使用
// async关键字，表明该函数内部有异步操作
async function run() {
    // 如果我们的函数是异步函数，用async的时候，必须配合await等待
    // 等待一个执行完毕，再去执行另外一个
    // 虽然看起来是同步的但是只是因为写法不同，本质还是异步的
    // await 其实是 async wait 的简写，也就是说等异步执行完
    // await就是等一个 Promise 从 { <pending> } 状态到{ <fulfilled> }状态 进而得到返回值
    // await
    let r1 = await p1();
    console.log(r1);
    let r2 = await p2();
    console.log(r2);
    let r3 = await p3();
    console.log(r3);
}

run();
console.log(1);
// 先输出 1
// 在依次输出 p1 p2 p3
```

<font color=springgreen>**清晰明了的Promise+async/await用法**</font>

```js
// 用promise包装异步函数，return给一个可以传我们需要的参数的函数
function log(time) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log(time)
            // resolve表示结束，就像函数的return一样
            resolve()
        }, time)
    })
}
// 放到一个 async 函数中，里面使用 await 调用
async function fun() {
    // 前两个都 实现同步的感觉
    await log(5000)
    await log(10000)
    // 这又一个异步，在 1 的后面打印
    log(0)
    console.log(1)
}

fun();
// 依次输出
5000
10000
1
0
```

