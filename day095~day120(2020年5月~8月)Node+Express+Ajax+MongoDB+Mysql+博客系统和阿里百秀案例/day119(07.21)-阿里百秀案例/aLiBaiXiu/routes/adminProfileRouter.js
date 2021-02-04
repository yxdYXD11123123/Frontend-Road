const express = require("express");
// 创建路由
const adminProfileRouter = express.Router();

// 引入控制器
adminProfileRouter.get("/profile", (req, res) => {
    res.render('./admin/profile');
})

// 创建具体路由

// 导出
module.exports = adminProfileRouter;