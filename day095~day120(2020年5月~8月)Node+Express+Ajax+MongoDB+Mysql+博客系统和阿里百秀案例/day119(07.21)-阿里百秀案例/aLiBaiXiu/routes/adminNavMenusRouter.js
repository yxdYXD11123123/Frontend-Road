const express = require("express");
// 创建路由
const adminNavMenusRouter = express.Router();

// 引入控制器
adminNavMenusRouter.get("/nav-menus", (req, res) => {
    res.render('./admin/nav-menus');
});

// 创建具体路由

// 导出
module.exports = adminNavMenusRouter;