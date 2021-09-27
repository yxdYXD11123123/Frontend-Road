## `Array.reduce()` 方法

### 语法：

`array.reduce(function(total, currentValue, currentIndex, arr), initialValue)`

#### 使用

```js
/**
 * reduce 函数的 参数一：
 * 用于执行每个数组元素的函数
 * @param {*} total 每次执行函数的初始值（上次计算后的返回值）
 * @param {*} curVal 数组元素，每次遍历的当前元素
 * @param {*} curIndex 当前索引
 * @param {*} arr 整个数组
 * @returns 返回结果作为下次函数的初始值
 */
function reducer(total, curVal, curIndex, arr) {
  console.log(total);
  console.log(curVal);
  console.log(curIndex);
  console.log(arr);
  // 返回一个结果，作为下一次函数的初始值
  return ++total;
}

// reduce 函数
// 参数二： 开始执行函数的初始值total（第一次函数的初始值）
const res = ['post', 'put', 'patch'].reduce(reducer, 1)

// 返回值为最终计算结果
console.log(res);
```



## `Object.assign()` 方法

#### 语法

用于将所有<font color=red>可枚举属性的值</font>从一个或多个源对象<font color=red>分配到目标对象</font>，<font color=green>返回</font><font color=blue>目标对象</font>。

可以有 **多个** 资源对象

遇到相同键名，后面的会覆盖前面的

```
assign(target: object, ...sources: any[])
```

#### 使用

```js
const target = { a: 1, b: 2 }
const source = { b: 4, c: 5 }
const sourceMore = { xx: 88 }

// target 拷贝到哪个对象
// source 从哪个资源对象中拷贝
const returnedTarget = Object.assign(target, source, sourceMore);

console.log(target);  // { a: 1, b: 4, c: 5, xx: 88 }
// 返回了 拷贝后的源对象
console.log(target === returnedTarget); // true
```



## 再识Promise

* `then` 方法中 <font color=red>返回 `Promise.reject(xxx)`</font>时， 会直接顺到 <font color=red>被后面紧跟着的 `catch` 方法捕捉</font>，`xxx` 会成为 `catch` 方法的默认参数 `err`

  ```js
  axios(options).then(res => {
  	return Promise.reject({msg: 'xxx'})
  }).catch(err=>{
      // 这里的 err 其实就是 上面的 {msg: 'xxx'}
      return Promise.reject(err)
  })
  ```

  相对应的，<font color=red>返回 `Promise.reslove(xxx)`时</font>，会<font color=red>被后面 `then` 方法捕捉</font>

  ```js
  axios(options).then(res => {
  	return Promise.resolve({msg: 'xxx'})
  }).then(res=>{
      // 这里的 res 其实就是 上面的 {msg: 'xxx'}
      return Promise.reject(res)
  })
  ```

* 正<font color=red>因为</font>上面这样，`Promise` 对象可以<font color=red>直接被返回</font>，也可以调用 `then` 获取成功后的结果<font color=red>继续处理</font>

  ```js
  function fn() {
  	// instance是Promise对象
      
    	// 不需要继续处理，直接返回此promise对象  
  	return instance(options);
      
      // 需要继续处理，继续处理，promise中的resolve和reject会 继续顺到后面的then或catch中
      return instance(options).then(...).catch(...);
  }
  ```

* 决定Promise最终返回什么的是，<font color=red>最终的那个catch中的reject</font> 或者 <font color=red>最终的那个then中的resolve</font>





## 封装 `axios` 请求

```js
// 引入axios
import axios from "axios";

// 创建实例
const instance = axios.create({
  // 配置基地址
  baseURL: "http://localhost:8080",
  // 超时
  timeout: 3000
})

/**
 * 使用axios实例发起请求
 * @param {*} options 请求实例配置项
 * @returns {Promise} 请求结果
 */
const baseRequest = (options) => {
  // 返回实例请求结果
  return instance(options).then(res => {
    const data = res.data || {};
    // 请求失败时
    if (res.status !== 201 && res.status !== 200) {
      // 请求失败时，在这里集中处理
      // 这里请求失败时，会被下面catch捕捉
      return Promise.reject({ res, data });
    }
    // 请求成功时
    if (res.status === 200 || res.status === 201) {
      // 返回获取数据
      return Promise.resolve(data);
    }
  }).catch(err => {
    // 这里捕获的err，
    // 如果是 instance(options) 中reject触发，那么捕获的err就是 instance(options) 中reject 给的 err
    // 如果是 上面Promise.reject({ res, data }) 触发，那么捕获的err就是 { res, data }
    return Promise.reject({ msg: "请求失败", err })
  })
}


// 封装 请求
const request = ['post', 'put', 'patch'].reduce((request, method) => {
  /**
   * 给请求添加方法
   * @param {*} url 请求路由
   * @param {*} data 请求数据
   * @param {*} option 请求配置选项
   * @returns 
   */
  request[method] = (url, data = {}, option = {}) => {
    // 调用 axios实例 
    return baseRequest(
      // 使用assign拷贝 键值对 用作 axios请求参数
      Object.assign({ method, url, data }, option)
    )
  }
  return request;
}, {});

export default request;
```

