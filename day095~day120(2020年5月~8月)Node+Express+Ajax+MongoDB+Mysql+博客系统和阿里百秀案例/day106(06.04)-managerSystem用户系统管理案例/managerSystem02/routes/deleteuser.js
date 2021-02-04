// 引入express框架
const express = require("express");
const path = require("path");
// 引入数据模块
const database = require(path.join(__dirname, "../data", "index.js"));
// 创建路由
const deleteUser = express.Router();

deleteUser.use(express.urlencoded({ extended: true }))

// 获取分页服务
deleteUser.delete("/deleteUser", (req, res) => {
    database.deleteOne(req.body.id, (data) => {
        if (data) {
            res.status(200).send({
                code: 200,
                msg: "删除对象成功"
            })
        }
    })
})

// 导出
module.exports = deleteUser;