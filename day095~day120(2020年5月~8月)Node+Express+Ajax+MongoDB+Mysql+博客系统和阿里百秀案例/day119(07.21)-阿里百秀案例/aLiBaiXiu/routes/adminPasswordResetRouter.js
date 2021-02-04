const express = require("express");
// 创建路由
const adminPasswordResetRouter = express.Router();

// 引入控制器
adminPasswordResetRouter.get("/password-reset", (req, res) => {
    res.render('./admin/password-reset');
});

// 创建具体路由

// 导出
module.exports = adminPasswordResetRouter;