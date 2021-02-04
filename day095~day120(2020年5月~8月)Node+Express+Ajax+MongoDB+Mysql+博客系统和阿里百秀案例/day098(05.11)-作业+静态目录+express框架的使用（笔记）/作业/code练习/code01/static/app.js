const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const mime = require("mime");

// 创建服务器
let server = http.createServer();

server.on("request", (req, res) => {
    // 需求：如果浏览器地址栏为 http://localhost/public/default.html?a=1&b=tom
    // 我们要响应的就是 /public/default.html
    // 如果输入错误，那么返回，找不到该文件

    // 首先,我们要通过获取的req.url 得到 我们要找到文件路径名
    let pathname = url.parse(req.url).pathname; //   /public/default.html
    // 用path模块结合__dirname 拼出绝对路径
    let absolutePath = path.join(__dirname, pathname);
    // 再根据此路径名  读取文件
    fs.readFile(absolutePath, (err, data) => {
        if (err != null) {
            console.log(err);
            // 有报错,所以 状态码为404, 响应头的文件类型设为普通文本
            res.writeHead(404, {
                "Content-Type": "text/plain;charset=utf8"
            })
            res.end("Not Found");
        }
        // 没有报错,说明找到了文件
        else {
            // 用mime模块  得到对应的文件类型
            let type = mime.getType(absolutePath);

            // 根据得到的文件类型  设置 响应头的文件类型
            res.writeHead(200, {
                "Content-Type": type
            })
            // 将读取到的数据写入
            res.end(data);
        }
    })

})

server.listen(80)