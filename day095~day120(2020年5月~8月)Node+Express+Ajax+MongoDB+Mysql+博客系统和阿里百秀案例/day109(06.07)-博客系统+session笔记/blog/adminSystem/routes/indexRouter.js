const express = require("express");
const indexRouter = express.Router();
// 引入控制器
const { login, show, logout } = require("../controller/indexCtrl")

// 显示后台系统首页
indexRouter.get("/", show);

// 后台管理系统登录
indexRouter.post('/api/login', login);

// 退出
indexRouter.get('/api/logout', logout);

module.exports = indexRouter;