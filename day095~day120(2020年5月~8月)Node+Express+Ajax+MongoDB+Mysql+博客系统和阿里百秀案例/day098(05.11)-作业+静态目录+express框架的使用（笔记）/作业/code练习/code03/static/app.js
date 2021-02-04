const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

const server = http.createServer();

server.on("request", (req, res) => {
    let pathname = url.parse(req.url).pathname;
    // 绝对路径
    let absolutePath = path.join(__dirname, pathname);
    // 读取文件
    fs.readFile(absolutePath, (err, data) => {
        if (err != null) {
            console.log(err);
            // 设置
            res.writeHead(404, {
                "Content-Type": "text/plain;charset=utf8"
            })
            res.end("找不到文件")
        }
        else {
            // 获取文件类型
            let type = mime.getType(absolutePath);
            // 设置
            res.writeHead(200, {
                "Content-Type": type
            })
            // 写入
            res.end(data);
        }
    })
})

server.listen(80)