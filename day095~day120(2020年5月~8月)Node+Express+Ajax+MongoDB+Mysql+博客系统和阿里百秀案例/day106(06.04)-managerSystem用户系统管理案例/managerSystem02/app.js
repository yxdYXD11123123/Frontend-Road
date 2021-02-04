// 引入express框架
const express = require("express");
const path = require("path");
// 导入list页路由
const list = require("./routes/list");
// 导入add页路由
const add = require("./routes/add");
// 导入删除功能路由
const deleteuser = require("./routes/deleteuser");
// 导入修改功能路由
const modifyUser = require("./routes/modify");

// 创建服务器
const app = express();

// 设置静态目录
app.use(express.static(path.join(__dirname, "public")));

// 挂载 list页路由
app.use(list);

// 挂载 add页路由
app.use(add);

// 挂载 删除功能路由
app.use(deleteuser);

// 挂载 修改功能路由
app.use(modifyUser);

// 指定端口
app.listen(80);