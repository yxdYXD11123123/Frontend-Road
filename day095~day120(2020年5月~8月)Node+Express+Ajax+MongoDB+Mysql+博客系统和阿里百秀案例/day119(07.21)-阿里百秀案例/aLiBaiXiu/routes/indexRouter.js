const express = require("express");
// 创建路由
const indexRouter = express.Router();

// 引入控制器
indexRouter.get("/", (req, res) => {
    res.render('index');
})

// 创建具体路由

// 导出
module.exports = indexRouter;