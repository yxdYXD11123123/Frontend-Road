const express = require("express");
// 创建路由
const adminPostsRouter = express.Router();

// 引入控制器
const { showPostsPage, findByFilter, deletePostById } = require('../controllers/adminPostsCtrl');

// 显示文章页
adminPostsRouter.get("/posts", showPostsPage);

// 查询筛选分页
adminPostsRouter.get("/posts/findByFilter", findByFilter);

// 根据id删除文章
adminPostsRouter.put("/posts/deletePostById", deletePostById);


// 导出
module.exports = adminPostsRouter;