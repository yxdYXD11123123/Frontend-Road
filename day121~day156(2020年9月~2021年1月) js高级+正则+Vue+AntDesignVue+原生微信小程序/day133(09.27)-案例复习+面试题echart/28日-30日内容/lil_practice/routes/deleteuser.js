// 引入express框架
const express = require("express");
// 创建路由
const deleteUser = express.Router();
// 引入控制器
let { deleteOneUser } = require('../controllers/deleteCtrl');

deleteUser.use(express.urlencoded({ extended: true }))

// 获取分页服务
deleteUser.delete("/deleteUser", deleteOneUser)

// 导出
module.exports = deleteUser;