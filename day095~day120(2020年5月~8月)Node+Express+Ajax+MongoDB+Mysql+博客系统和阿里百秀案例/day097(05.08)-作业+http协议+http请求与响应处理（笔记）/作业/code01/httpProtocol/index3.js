const http = require("http");
let server = http.createServer();

server.on("request", (req, res) => {
    console.log("请求地址" + req.url);
    console.log("请求方式" + req.method);
    // 请求头
    console.log(req.headers);

    // 响应部分
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf8"
    })
    res.end("您好3")
})

// 指定端口
server.listen(80)