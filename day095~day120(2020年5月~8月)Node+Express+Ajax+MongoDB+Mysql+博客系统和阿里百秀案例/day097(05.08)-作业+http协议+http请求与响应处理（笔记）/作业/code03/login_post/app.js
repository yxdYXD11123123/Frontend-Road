const http = require("http");
const query = require("querystring");

let server = http.createServer();

server.on("request", (req, res) => {
    let datas = ""
    req.on("data", (chunk) => {
        datas += chunk;
    })
    // 解决乱码
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf8"
    })
    req.on("end", () => {
        let finalData = query.parse(datas);
        if (finalData.username == "yuan" && finalData.password == "123") {
            res.end("登录成功，" + finalData.username)
        }
        else {
            res.end("登陆失败")
        }
    })
})

server.listen(3000);