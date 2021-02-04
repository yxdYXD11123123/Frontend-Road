const express = require("express");
// 创建路由
const adminCommentsRouter = express.Router();

// 引入控制器
adminCommentsRouter.get("/comments", (req, res) => {
    res.render('./admin/comments');
})

// 创建具体路由

// 导出
module.exports = adminCommentsRouter;