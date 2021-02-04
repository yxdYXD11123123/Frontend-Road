const http = require("http");
// 载入url模块
const url = require("url");

let server = http.createServer();

server.on("request", (req, res) => {
    // 用url模块的parse方法，分解请求对象中url的内容
    let getQuery = url.parse(req.url, true).query;
    console.log(getQuery);

    // 响应头
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf8"
    })
    // 判断信息内容
    if (getQuery.username == "dong" && getQuery.password == "123") {
        res.end("登录成功," + getQuery.username);
    }
    else {
        res.end("登录失败")
    }
})

server.listen(80);
