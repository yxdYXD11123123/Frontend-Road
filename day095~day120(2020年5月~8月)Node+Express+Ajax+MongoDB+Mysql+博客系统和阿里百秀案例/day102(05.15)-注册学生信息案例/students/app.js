const express = require('express');
const path = require("path");
const fs = require("fs");
const datas = require(path.join(__dirname, "datas", "data.json"))


const app = express();

// 开启静态托管
app.use(express.static(path.join(__dirname, "public")))

// 中间件
app.use(express.urlencoded({ extended: false }));

// 添加数据的服务
app.post("/addData", (req, res) => {
    console.log(req.body);
    let textdata = req.body
    // 判断添加的数据是否有空内容
    let flag = true;
    for (let k in textdata) {
        // 如果有没有赋值的内容
        if (textdata[k] == "") {
            // 关闭开关
            flag = false;
        }
    }
    // 再检查一下爱好和性别是否选填
    if (req.body.hobby == undefined || req.body.gender == undefined) {
        flag = false;
    }
    // 如果flag为true，说明所有数据都填了
    if (flag) {
        // 将新数据，存入data.json的数组
        let db = datas
        db.push(req.body);
        // 收到数据后，把数据写入data文件  注意要讲对象转成json字符串格式
        fs.writeFile(path.join(__dirname, "datas", "data.json"), JSON.stringify(db), (err) => {
            if (err != null) {
                console.log(err);
            }
            // 跳转到列表页面
            res.send(`
                 <script>
                 window.location.href ="http://localhost/list.html"
             </script>
                 `)
        })
    }
    else {
        // 跳转到列表页面
        res.send(`
<script>
    window.location.href ="http://localhost/list.html";
</script>
    `)
    }


})


// 列表页面
app.get('/getDatas', (req, res) => {
    // 将数据给回去
    res.send(datas)
})

app.listen(80);