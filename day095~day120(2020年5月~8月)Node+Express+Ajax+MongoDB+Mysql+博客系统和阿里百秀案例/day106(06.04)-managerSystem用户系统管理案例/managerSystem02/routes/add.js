// 引入express框架
const express = require("express");
const path = require("path");
// 引入数据模块
const database = require(path.join(__dirname, "../data", "index.js"));
// 创建路由
const add = express.Router();

add.use(express.urlencoded({ extended: true }))

// 获取分页服务
add.post("/addUser", (req, res) => {
    let userObj = {
        username: req.body.username,
        // 年龄如果没写，默认为0
        age: req.body.age || 0,
        password: req.body.password,
        email: req.body.email,
        // 这里的爱好如果是undefined， 数据库会处理成 []
        hobbies: req.body.hobbies
    }
    // 调用数据模块封装好的方法
    database.addUser(userObj, (data) => {
        // 如果返回了这个data说明添加成功
        if (data) {
            res.status(200).send({
                code: 200,
                msg: "用户添加成功"
            })
        }
    });
})

// 导出
module.exports = add;