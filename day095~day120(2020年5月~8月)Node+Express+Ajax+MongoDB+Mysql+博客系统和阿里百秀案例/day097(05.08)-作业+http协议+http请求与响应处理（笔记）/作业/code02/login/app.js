const http = require("http");
const url = require("url");

let server = http.createServer();

server.on("request", (req, res) => {
    // 用url模块的parse方法处理 请求中的url
    let getInformation = url.parse(req.url, true).query;

    // 给响应头添加文件类型
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf8"
    })

    if (getInformation.username == "yuan", getInformation.password == "123") {
        res.end("您已成功登录，" + getInformation.username);
    }
    else {
        res.end("登录失败")
    }
});

server.listen(80)