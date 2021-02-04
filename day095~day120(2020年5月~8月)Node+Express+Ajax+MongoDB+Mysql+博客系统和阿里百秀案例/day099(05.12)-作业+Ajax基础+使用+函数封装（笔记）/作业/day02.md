# 简答题

1. 请简述ajax请求的时候get 和post方式的区别?
```js
// get方式
用ger方式请求
1. 我们在open方法中设置请求行时，如果要传递的数据，要将数据仿造url格式写入第二个参数
xhr.open("GET", `/getParam?username=${username}&password=${password}`);
2. 下面的发送请求为null
xhr.send(null)
3. 后端收到请求，用express提供的query方法可以直接获取到get方式传来的url中信息的对象形式
app.get("/getParam", (req,res) => {
    console.log(req.query)
})

// post方式
用post方式请求
1. 我们在open方法中设置请求行时，第二个参数只需要写入一个标识符
xhr.open("POST", "/postParam");
2. 我们必须设置请求头
xhr.serRequestHeader("Content-Type", "application/x-www-form-urlencoded")
3. 将发送请求的内容写入send方法
xhr.send("username=zhangsan&password=123456")
4. 在后台，我们必须使用中间件来帮助我们用req.body获取接收到的内容
app.use(express.urlencoded());
5. 在后台，最后用express提供的post方法指定标识符，并用req.body获取到接收的内容
app.post("/postParam", (req,res)=> {
    res.send(req.body);
})
```

2. ajax都有哪些优点和缺点？

```js
// 优点
1. 可以局部刷新页面，提高用户体验
2. 可以减轻服务器的负担，按需取数据，最大程度的减少了冗余请求
3. 基于标准化的并被广泛支持的技术，不需要下载插件和小程序
4. 使用异步的方式与服务器通信，具有更加迅速的响应能力

// 缺点
1. Ajax不支持浏览器的返回按钮
2. 需要考虑浏览器的兼容性
3. 安全问题上，Ajax会暴露与服务器交互的一些细节
4. 一些ajax的框架会破坏程序的异常机制
```
3. 简述ajax的工作原理?

```js
在http协议的基础上以异步的方式通过XMLHttpRequest对象与服务器进行通信，和服务器进行数据交流
```
4. readyState的值有哪些,分别代表什么意思?
```js
0，1，2，3，4
0：xhr对象实例化了，但是还没有设置请求行
1：xhr对象实例化了，也设置了请求行，服务器还没收到
2：xhr对象发送了请求，服务器也收到了
3：xhr对象正在接收服务端的响应头，但是还没有接收完
4：xhr对象接收到了服务端的响应头，并且内容全部接收完毕
```

# 编程题

1题: 实现看笑话功能

```js

- 请求地址：https://autumnfish.cn/api/joke
- 请求方法：get

1. 点击页面中的"点我看笑话"按钮,`.joke-text`盒子中就会出现获取到的笑话

```

2题: 实现用户注册功能
```js

用户验证
- 请求地址：https://autumnfish.cn/api/user/check
- 请求方法：post
- 请求参数：username

1. 文本框失去焦点事件
2. 获取文本框的value值
3. 类名为.info的盒子内容就会变为: 验证中...
4. 调用用户验证接口
5. 数据返回之后设置内容到类名为.info的盒子内

用户注册
- 请求地址：https://autumnfish.cn/api/user/register
- 请求方法：post
- 请求参数：username

1. 点击注册按钮
2. 获取文本框的value值
3. 类名为.info的盒子内容就会变成: 注册中...
4. 调用用户注册接口
5. 数据返回之后设置内容到类名为.info的盒子内

```