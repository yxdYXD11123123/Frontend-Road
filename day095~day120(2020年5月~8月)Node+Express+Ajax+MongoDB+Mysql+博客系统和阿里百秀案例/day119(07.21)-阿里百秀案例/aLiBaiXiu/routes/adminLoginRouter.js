const express = require("express");
// 创建路由
const adminLoginRouter = express.Router();
const { showLoginPage, loginUser, logoutUser } = require('../controllers/adminLoginCtrl');

// 引入控制器
// 显示登录页面
adminLoginRouter.get("/login", showLoginPage);

// 处理登录业务
adminLoginRouter.post("/login", loginUser);

// 处理退出登录业务
adminLoginRouter.get("/logout", logoutUser);

// 导出
module.exports = adminLoginRouter;