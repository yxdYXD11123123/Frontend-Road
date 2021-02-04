const express = require("express");
// 创建路由
const adminSettingsRouter = express.Router();

// 引入控制器
adminSettingsRouter.get("/settings", (req, res) => {
    res.render('./admin/settings');
})

// 创建具体路由

// 导出
module.exports = adminSettingsRouter;