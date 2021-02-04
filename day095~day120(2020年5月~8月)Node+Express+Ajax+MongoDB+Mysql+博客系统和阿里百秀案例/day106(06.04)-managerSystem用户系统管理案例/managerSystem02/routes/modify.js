// 引入express框架
const express = require("express");
const path = require("path");
// 引入数据模块
const database = require(path.join(__dirname, "../data", "index.js"));
// 创建路由
const modifyUser = express.Router();

modifyUser.use(express.urlencoded({ extended: true }))

// 找到用户当前信息
modifyUser.get("/findOne", (req, res) => {
    database.findOne(req.query.id, (data) => {
        if (data) {
            res.status(200).send({
                code: 200,
                data: data,
                msg: "找到用户当前信息"
            })
        }
    })
})

modifyUser.post("/modifyUser", (req, res) => {
    let modifyObj = {
        username: req.body.username,
        age: req.body.age,
        password: req.body.password,
        email: req.body.email,
        hobbies: req.body.hobbies,
    }
    database.modifyUser(req.body.id, modifyObj, (result) => {
        if (result.ok === 1) {
            res.status(200).send({
                code: 200,
                msg: "数据修改成功"
            })
        }
    });
})

// 导出
module.exports = modifyUser;