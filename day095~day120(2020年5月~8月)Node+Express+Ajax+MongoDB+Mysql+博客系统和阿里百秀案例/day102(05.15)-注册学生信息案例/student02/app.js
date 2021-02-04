const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./datas/data.json");

// 创建服务器
const app = express();

// 页面  前端写的很多东西（就是一个开放静态目录） 要用express静态static托管方法的功能  public公共的公开的 
// static方法的参数是一个你要托管的文件夹的路径  //   /   \  相对 绝对  根目录 __dirname + "public"  path方法  默认值, index?  
// static有个默认的参数是 index: index.html  public里面的index.html
app.use(express.static(path.join(__dirname, "public")));

// 中间件
app.use(express.urlencoded({ extended: false }))

app.post("/addData", (req, res) => {
    let studentInfo = req.body;
    // 添加id
    studentInfo["id"] = +new Date();  // 时间   1234209093450909ms
    // 判断一下，这个数据是否都填了  ''  undefined  false  保存数据
    if (studentInfo.name && studentInfo.age && studentInfo.date && studentInfo.email && studentInfo.hobby && studentInfo.gender) {
        // 添加数据
        let infoArr = db;  //  [{} {}  {}]
        infoArr.unshift(studentInfo);
        //   [ {} {} {} {} {}  ]  存在一个文件夹里   node    {}  存入  写到一
        fs.writeFile(path.join(__dirname, 'datas', "data.json"), JSON.stringify(infoArr), (err) => {
            if (err != null) {
                console.log(err);
            }
            // 提交后 跳转页面  window  location  href  url  
            res.send("success")
        })
    }
})

// 给数据
app.get("/getDatas", (req, res) => {
    res.send(db)
})

// 指定我们的端口为80
app.listen(80)