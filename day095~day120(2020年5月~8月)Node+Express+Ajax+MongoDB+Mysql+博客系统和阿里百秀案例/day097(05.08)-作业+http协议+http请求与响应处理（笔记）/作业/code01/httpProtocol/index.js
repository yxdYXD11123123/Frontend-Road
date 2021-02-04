// 加载http模块
const http = require("http");

// 用http模块创建服务器
let server = http.createServer();

// 给服务器绑定 请求事件  默认参数为 req 请求对象，res 响应对象
server.on("request", function (req, res) {
    // req请求对象
    console.log("请求方法为" + req.method);
    console.log("请求地址为" + req.url);
    // 请求头
    let reqHeader = req.headers;
    console.log(reqHeader);

    // 响应对象
    // 响应头  设置响应的内容类型
    // 可以这样单个设置
    // res.setHeader("Content-Type", "text/html;charset=utf8");
    // 也可以用 writeHead(statusCode,[statusMessage],[headers])  一起设置状态码及多个响应头
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf8"
    })

    // 结束本次相应，并写入111
    res.end("你好")
})

// 让服务器监听指定80默认端口
server.listen(80, function () {
    console.log("请打开 http://localhost");
})