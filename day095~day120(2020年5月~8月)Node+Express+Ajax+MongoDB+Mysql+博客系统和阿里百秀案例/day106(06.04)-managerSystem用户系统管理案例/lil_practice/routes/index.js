// 引入express框架
const express = require("express");
// 创建路由
const list = express.Router();
// 引入 控制器
const { findUsers } = require('../controllers/indexCtrl');

// 获取分页服务
list.get("/getUsers", findUsers);

// 导出
module.exports = list;