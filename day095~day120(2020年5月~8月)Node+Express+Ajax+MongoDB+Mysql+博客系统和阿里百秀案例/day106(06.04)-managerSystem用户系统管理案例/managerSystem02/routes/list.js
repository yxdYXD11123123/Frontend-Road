// 引入express框架
const express = require("express");
const path = require("path");
// 引入数据模块
const database = require(path.join(__dirname, "../data", "index.js"));
// 创建路由
const list = express.Router();

// 获取分页服务
list.get("/getList", (req, res) => {
    // 调用数据模块封装好的方法
    database.getList(parseInt(req.query.pageNum), parseInt(req.query.pageSize), function (data, sum) {
        res.status(200).send({
            code: 200,
            data: {
                data: data,
                sum: sum
            },
            msg: "数据获取成功"
        })
    });
})


// 导出
module.exports = list;