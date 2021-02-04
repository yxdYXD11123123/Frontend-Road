const express = require("express");
// 创建路由
const adminSlidesRouter = express.Router();

// 引入控制器
adminSlidesRouter.get("/slides", (req, res) => {
    res.render('./admin/slides');
});

// 创建具体路由

// 导出
module.exports = adminSlidesRouter;