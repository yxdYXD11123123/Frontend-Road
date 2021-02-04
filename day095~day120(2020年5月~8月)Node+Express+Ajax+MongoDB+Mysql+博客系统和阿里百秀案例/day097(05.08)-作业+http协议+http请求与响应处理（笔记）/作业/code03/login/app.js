const http = require("http");
const url = require("url");

let server = http.createServer();

server.on("request", (req, res) => {
    // 处理url
    let getInformation = url.parse(req.url, true).query

    // 设置响应头的文件类型
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf8"
    })

    if (getInformation.username == "xu" && getInformation.password == "123") {
        res.end("恭喜您登录成功，" + getInformation.username);
    }
    else {
        res.end("登陆失败");
    }
})

server.listen(3000)