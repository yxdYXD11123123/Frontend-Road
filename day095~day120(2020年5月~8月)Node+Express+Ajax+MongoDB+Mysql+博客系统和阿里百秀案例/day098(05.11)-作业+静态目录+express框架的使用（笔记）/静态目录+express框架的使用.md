## 静态目录

### 需求

### 思路：

1. 获取地址栏里面的`url`
2. 处理`url`，把`url`中的 `/public/default.html` 拿出来
3. 通过`fs`模块的`readFile`把`default.html`文件读取出来，响应给浏览器



```js
const http = require("http");
// 需要url模块
const url = require("url");
const path = require("path");
const fs = require("fs");
// 引入mime模块   --  作用：识别 并 分析 文件的MIME文件类型
const mime = require("mime");
// 注意：虽然有些时候浏览器可以自动识别，但是并不可靠，所以我们还是需要mime模块去获取文件类型更好一点

const server = http.createServer();

server.on("request", (req, res) => {
    // 需求：如果浏览器地址栏为 http://localhost/public/default.html?a=1&b=tom
    // 我们要响应的就是 /public/default.html
    // 如果输入错误，那么返回，找不到该文件

    // 获取地址栏中的url   
    // console.log(req.url);    /public/default.html?a=1&b=tom
    let pathname = url.parse(req.url).pathname;
    // console.log(pathname);    /public/default.html
    // 用path模块的join方法 结合__dirname --> 拼接出  绝对路径
    let absolutePath = path.join(__dirname, pathname);
    // 用fs模块的方法  读取对应绝对路径的文件
    fs.readFile(absolutePath, (err, data) => {
        // 如果路径错误，返回Not Found
        if (err != null) {
            // 返回404，响应头设置为普通的文本类型
            res.writeHead(404, {
                "Content-Type": "text/plain;charset=utf8"
            })
            res.end("Not Found");
            return;
        }
        // 用mime模块的getType方法  得到文件的类型
        let type = mime.getType(absolutePath);
        console.log(type);   // text/html等等
        // 这里我们将 判断好的文件类型，设置给响应头
        res.writeHead(200, {
            "Content-Type": type
        })
        // 将读取到的文件内容  写入
        res.end(data);
    })
})

server.listen(80);
```



## Express介绍

Node的服务器框架

是基于`Nodejs`平台，快速、开发、极简的Web开发框架

Express是一个简洁而灵活的`nodejs`Web应用框架，提供了一系列强大特性帮助你创建各种Web应用，和丰富的HTTP工具。

使用Express可以快速地搭建一个完整功能的网站

Express框架核心特性：

* 可以设置中间件来响应HTTP请求
* 定义了路由表用于执行不同的HTTP请求动作
* 可以通过模板传递参数来动态渲染HTML页面



## Express的基本使用 -- 简化服务器的创建

安装

```
npm install express -s
```

使用

```json
// 引入框架模块
const express = require("express");
// 使用框架模块创建服务器
const app = express();

app.use((req, res) => {
    // send会将响应头的Content-Type 默认设置为"text/html"
    res.send("您好")
})

// 指定服务器端口号，并启动服务
app.listen(80)
```





## 接收GET和POST的不同请求 -- 简化前面的GET和POST请求



### 接收POST请求

```js
// 引入框架模块
const express = require("express");
// 使用框架模块创建服务器
const app = express();

// 使用express的中间件
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.send("首页")
})

// POST
app.post("/login", (req, res) => {
    // 使用req.body获取POST请求的参数
    console.log(req.body);   // { username: '123', password: '123' }
    res.send("这是表单发起的ajax请求")
})

// 指定服务器端口号，并启动服务
app.listen(80)
```





## `express.static`托管静态页面 -- 简化静态目录

```js
// 引入框架模块
const express = require("express");
// 使用框架模块创建服务器
const app = express();

// 托管静态页面   想让哪个文件夹作为静态页面，那么就将文件夹的名字写入对应参数
// static第二个参数可以设置首页，默认为index.html
app.use('/public', express.static("public",{ index: "index.html" }))

// 指定服务器端口号，并启动服务
app.listen(80)
```





## `express.Router`创建路由 -- 简化路由

凡是地址栏的输入，a或者link标签的`href`，script或者`img`中的`src`等请求都是GET请求

所以express中的 get方法 因此就叫get 

```js
// 引入框架模块
const express = require("express");
// 使用框架模块创建服务器
const app = express();

app.get("/", (req, res) => {
    res.send("这是首页")
})
app.get("/index", (req, res) => {
    res.send("这是首页")
})
app.get("/list", (req, res) => {
    res.send("这是列表页")
})
app.get("/article", (req, res) => {
    res.send("这是文章页")
})

// 指定服务器端口号，并启动服务
app.listen(80)
```


