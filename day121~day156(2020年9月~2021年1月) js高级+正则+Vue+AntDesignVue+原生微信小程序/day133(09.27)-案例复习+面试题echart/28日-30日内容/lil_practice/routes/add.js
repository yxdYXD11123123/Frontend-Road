// 引入express框架
const express = require("express");
// 创建路由
const add = express.Router();
// 引入 控制器
let { addUser } = require('../controllers/addCtrl')

add.use(express.urlencoded({ extended: true }))

// 获取分页服务
add.post("/addUser", addUser)

// 导出
module.exports = add;