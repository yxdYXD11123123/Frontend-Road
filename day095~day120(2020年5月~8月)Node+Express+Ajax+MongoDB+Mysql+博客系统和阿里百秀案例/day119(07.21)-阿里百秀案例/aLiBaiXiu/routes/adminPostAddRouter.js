const express = require("express");
// 创建路由
const adminPostAddRouter = express.Router();

// 引入控制器
adminPostAddRouter.get("/post-add", (req, res) => {
    res.render('./admin/post-add');
});

// 创建具体路由

// 导出
module.exports = adminPostAddRouter;