const express = require("express");

const app = express();

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


// 设置中间件
app.use(express.urlencoded());

// 接口:"/getData"
app.get("/getData", function (req, res) {
    console.log("/getNum");
    setTimeout(() => {
        res.send({ num: parseInt(Math.random() * 10000001) });
    }, 1000)
})

app.listen(8080, () => {
    console.log("端口：http://localhost:8080");
})