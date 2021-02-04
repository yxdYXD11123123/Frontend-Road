const express = require("express");
// 创建路由
const router = express.Router();
// 导入controller文件 的 getArticle 控制器  （解构赋值）
const { getArticle, getDetails, showIndex, showDetail, login, addComment, getComments } = require("../controller/indexCtrl");

// 显示首页
router.get("/", showIndex);

// 显示详情页
router.get("/detail", showDetail);

// 接收前端请求，并处理数据，获取文章分页
router.get("/api/article", getArticle);

// 根据请求中的id，获取文章详情
router.get("/api/details", getDetails);

// 登录功能
router.post("/api/login", login);

// 评论功能
router.post("/api/addComment", addComment);

// 获取文章评论区内容
router.get("/api/getComments", getComments);

// 导出
module.exports = router;