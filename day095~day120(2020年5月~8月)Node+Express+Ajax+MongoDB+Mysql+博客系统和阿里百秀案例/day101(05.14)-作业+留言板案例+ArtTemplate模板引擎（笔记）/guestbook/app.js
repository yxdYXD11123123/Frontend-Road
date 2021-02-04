// 1.导包
const express = require('express');
const path = require('path');
const db = require('./data/db.json');
const fs = require("fs");

// 2.设置包
// 2.1 创建服务器
const app = express();
// 2.2 设置静态目录
app.use(express.static(path.join(__dirname, 'public')))

// 3.处理请求 返回响应

// 3.1 处理查找留言请求
app.get('/findGuest', (req, res) => {
  res.status(200).send(db);
})

app.use(express.urlencoded());

// 添加数据
app.post("/addGuest", (req, res) => {
  let reqData = {
    name: req.body.name,
    content: req.body.content,
    created: new Date().toLocaleString()
  }
  // 给数据里面添加这个对象,添加到前面
  db.unshift(reqData);
  // 让添加过的数据，再次写入data文件
  fs.writeFile(path.join(__dirname, "data", "db.json"), JSON.stringify(db), function (err) {
    if (err != null) {
      console.log(err);
    }
    // 告诉前端，我们的数据写入成功
    res.status(200).json({
      code: 200,
      msg: "数据添加成功"
    })
  })



})


// 4.指定端口 启动服务
app.listen(3000, () => {
  console.log("请打开 http://localhost:3000")
})