const express = require("express");
// 创建路由
const detailRouter = express.Router();

// 引入控制器
detailRouter.get("/detail", (req, res) => {
    res.render('detail');
})

// 创建具体路由

// 导出
module.exports = detailRouter;