// 引入express框架
const express = require("express");
// 创建路由
const modifyUser = express.Router();
// 引入控制器
let { findOne, modifyUsers } = require('../controllers/modifyCtrl')

modifyUser.use(express.urlencoded({ extended: true }))

// 找到用户当前信息
modifyUser.get("/findOne", findOne);

modifyUser.post("/modifyUser", modifyUsers);

// 导出
module.exports = modifyUser;