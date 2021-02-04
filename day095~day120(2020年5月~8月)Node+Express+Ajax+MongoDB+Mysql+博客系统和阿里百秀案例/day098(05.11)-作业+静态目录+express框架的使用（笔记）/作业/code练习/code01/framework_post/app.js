// // 引入框架模块
// const express = require("express");

// // 开启服务器
// const server = express();

// // 需求：得到POST传来的数据
// // 使用中间件
// server.use(express.urlencoded());
// // url中pathname为login传来的post
// server.post("/login", (req, res) => {
//     console.log(req.body);
//     res.send(req.body.username + "，您好")
// })

// // 指定端口
// server.listen(80)


// 第二遍
// const express = require("express");
// const server = express();
// server.use(express.urlencoded());
// server.post("/login", (req, res) => {
//     res.send("您好，" + req.body.username)
// })
// server.listen(80)

// 第三遍
const express = require("express");
const server = express();
server.use(express.urlencoded());
server.post("/login", (req, res) => {
    res.send("您好，" + req.body.username)
})
server.listen(80)