// 第一遍
// // 引入服务器框架模块
// const express = require("express");

// // 创建服务器
// const server = express();

// // 启用静态托管功能  参数是静态目录的文件夹
// server.use('/public', express.static("public"))

// server.listen(80)

// 第二遍
// const express = require("express");

// // 开启服务器
// const server = express();

// // 开启静态托管
// server.use("/public", express.static("public"))

// // 指定端口
// server.listen(80)

// 第三遍
const express = require("express");

const server = express();

server.use("/public", express.static("public"));

server.listen(80)