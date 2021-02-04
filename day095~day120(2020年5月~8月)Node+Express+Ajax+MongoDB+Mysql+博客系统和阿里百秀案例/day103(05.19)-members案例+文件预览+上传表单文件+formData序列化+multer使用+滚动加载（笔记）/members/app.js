const express = require("express");
// 路径模块
const path = require("path");
// 引入数据库模块
const database = require(path.join(__dirname, "data", "db.js"));
// 加载 multer 模块，用来解析请求中的文件并存储
const multer = require("multer");

// 开启服务
const app = express();

// 静态托管
app.use(express.static(path.join(__dirname, "public")));

// 首页获取部分数据
app.get("/getPart", (req, res) => {
    // console.log(typeof req.query.last); 如果前台传来的数据是null，会变成空字符串
    // 将id交给数据库，并告诉数据库要取几个数据
    res.send({
        code: 200,
        data: database.getPart(req.query.last, parseInt(req.query.amount)),
        msg: "数据获取成功"
    })
})

// 详情页
app.get("/getDetail", (req, res) => {
    res.status(200).send({
        code: 200,
        data: database.getDetailById(parseInt(req.query.id)),
        msg: "数据获取成功"
    })
})

// 使用multer创建对象，并设置接收的文件 upload 的存储 以及 命名
let uploader = multer({
    storage: multer.diskStorage({
        // 文件名为 原本的名字
        filename: (req, file, cd) => {
            cd(null, file.originalname);
        },
        // 存储位置
        destination: (req, file, cd) => {
            cd(null, path.join(__dirname, "public", "upload"));
        }
    })
})

// 添加成员信息  设置中间件
app.post("/addData", uploader.single('avatar'), (req, res) => {
    // 编辑新数据信息
    let newData = {
        id: +new Date(),
        name: req.body.name,
        // 如果传了图片，那么就用传的图片，如果没有传，那么就用默认的图片
        avatar: req.file == undefined ? `./image/default.png` : `/upload/${req.file.filename}`,
        bio: req.body.bio,
        created: new Date().toLocaleString()
    }
    // 添加数据
    database.addData(newData);
    res.send({
        code: 200,
        data: null,
        msg: "数据写入成功"
    })
})

// 删除数据的请求
app.get("/deleteData", (req, res) => {
    // 调用数据库的删除数据方法
    let msg = database.deleteData(parseInt(req.query.id))
    res.status(200).send({
        code: 200,
        msg: msg || "删除数据成功",
        // 补充一条数据，保证页面 整齐
    })
})

// 指定端口
app.listen(80);