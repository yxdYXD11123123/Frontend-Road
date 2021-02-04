const express = require("express");
// 创建路由
const adminIndexRouter = express.Router();
const { showIndexPage } = require('../controllers/adminIndexCtrl');

// 显示首页
adminIndexRouter.get("/", showIndexPage);



// 导出
module.exports = adminIndexRouter;