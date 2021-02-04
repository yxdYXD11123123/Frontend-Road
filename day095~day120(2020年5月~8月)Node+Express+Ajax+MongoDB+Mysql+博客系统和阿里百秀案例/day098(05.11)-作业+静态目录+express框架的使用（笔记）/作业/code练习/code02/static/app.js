const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

let server = http.createServer();

server.on("request", (req, res) => {
    // 需求：如果浏览器地址栏为 http://localhost/public/default.html?a=1&b=tom
    // 我们要响应的就是 /public/default.html
    // 如果输入错误，那么返回，找不到该文件

    // 首先获取请求发来的url, 并得到url中的pathname部分
    let pathname = url.parse(req.url).pathname;
    // 再用path拼出绝对路径
    let absolutePath = path.join(__dirname, pathname);
    // 根据绝对路径，读取文件
    fs.readFile(absolutePath, (err, data) => {
        if (err != null) {
            console.log(err);
            res.writeHead(404, {
                "Content-Type": "text/plain;charset=utf8"
            })
            res.end("找不到文件")
        }
        else {
            // 检测文件类型
            let type = mime.getType(absolutePath);
            // 设置响应头的文件类型
            res.writeHead(200, {
                "Content-Type": type
            })
            // 写入读取到的内容
            res.end(data)
        }
    })
})

server.listen(80)