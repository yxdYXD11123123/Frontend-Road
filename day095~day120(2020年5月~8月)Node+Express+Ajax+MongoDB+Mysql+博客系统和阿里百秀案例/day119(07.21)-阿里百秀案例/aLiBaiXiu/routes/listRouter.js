const express = require("express");
// 创建路由
const listRouter = express.Router();

// 引入控制器
listRouter.get("/list", (req, res) => {
    res.render('list');
})

// 创建具体路由

// 导出
module.exports = listRouter;