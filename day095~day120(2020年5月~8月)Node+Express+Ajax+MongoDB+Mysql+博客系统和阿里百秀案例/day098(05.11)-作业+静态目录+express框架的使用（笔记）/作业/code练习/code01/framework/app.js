// const express = require("express");

// const server = express();

// // 用express的get方法实现路由
// server.get("/index", (req, res) => {
//     // 如果你用express的send方法发送字符串，默认会将响应头的文件类型设为text/html
//     res.send("<h1>这是首页</h1>")
// })
// server.get("/list", (req, res) => {
//     res.send("这是列表页")
// })

// server.listen(80)

// 第二遍
// const express = require('express');
// const server = express();
// server.get("/index", (req, res) => {
//     res.send("<h1>这是首页</h1>")
// })
// server.get("/new", (req, res) => {
//     res.send("<h1>这是新闻页</h1>")
// })
// server.listen(80)

// 第三遍
// 引入模块
const express = require("express");
// 开启服务器
const server = express();
// 用get方法实现路由
server.get("/index", (req, res) => {
    // 用send写入
    res.send("<s>这是首页<s>")
})
server.get("/news", (req, res) => {
    // 用send写入
    res.send("<s>这是新闻页<s>")
})
// 指定端口
server.listen(80)