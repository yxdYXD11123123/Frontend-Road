const express = require("express");
// 创建路由
const adminUsersRouter = express.Router();
// 引入控制器
const { showUsersPage, deleteOneUser, getAllUsers, deleteUsers } = require('../controllers/adminUsersCtrl');

// 显示所有用户页面
adminUsersRouter.get("/users", showUsersPage);

// 删除一个用户
adminUsersRouter.put("/users/deleteOne", deleteOneUser);

// 获取所有用户信息
adminUsersRouter.get("/users/getAllUsers", getAllUsers);

// 批量删除用户
adminUsersRouter.put("/users/deleteUsers", deleteUsers);

// 导出
module.exports = adminUsersRouter;

