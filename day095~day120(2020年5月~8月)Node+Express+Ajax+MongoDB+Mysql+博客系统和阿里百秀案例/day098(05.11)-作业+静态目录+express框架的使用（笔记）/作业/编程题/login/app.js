// 引入express框架
const express = require("express");  // http
// 引入fs模块
const fs = require("fs");
// 引入path模块
const path = require("path");

// 用框架建立服务器
const app = express(); // http.createsever

// 使用express的中间件, 帮助获取post信息
app.use(express.urlencoded());

app.post("/public/login", (req, res) => {
    fs.readFile(path.join(__dirname, "data.json"), "utf8", (err, data) => {
        if (err == null) {
            // 解析数据中的json格式
            let datas = JSON.parse(data)
            // 判断是否都正确  req.body为获取的post信息， 与数据对比
            if (datas.username == req.body.username && datas.password == req.body.password) {
                res.send("登录成功")
            }
            else {
                res.send("用户名或密码错误，请重新登录")
            }
        }
        else {
            // 如果err不为null, 说明有报错，打印报错
            console.log(err);
        }
    })

})


// 指定监听端口
app.listen(80);