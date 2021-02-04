const http = require("http");
// 我们需要querysting模块，来处理请求的数据字符串
const query = require("querystring")

let server = http.createServer();

server.on("request", (req, res) => {
    // 因为这次要获取的是用POST传来的数据（因为POST传来的数据在req中），所以我们需要用 请求对象的data（数据传输事件）和end（完成发送请求事件）
    let dataStr = ""
    req.on("data", (chunk) => {
        // 这里的参数chunk，也就是数据块，是一种流数据
        console.log(chunk);
        // 我们要将流数据拼接成数据字符串
        dataStr += chunk;
    })
    // 解决乱码
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf8"
    })
    // 当请求结束时， 这里我们必须写到end事件中，否则会在传输数据前执行
    req.on("end", () => {
        // 我们要用query的parse方法来解析获取的数据字符串
        let finalData = query.parse(dataStr);
        if (finalData.username == "dong" && finalData.password == "123") {
            res.end("登录成功，" + finalData.username)
        }
        else {
            res.end("登录失败")
        }
    })
})

server.listen(80)