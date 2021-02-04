const http = require("http");
// 我们需要url模块来处理req的url字符串
const url = require("url");

let server = http.createServer();

server.on("request", (req, res) => {
    // 用url模块的parse方法 提取出 路径名
    let pathName = url.parse(req.url).pathname;

    // 解决乱码
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf8"
    })

    // 判断
    if (pathName == "/" || pathName == "/index") {
        res.end(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>首页</title>
        </head>
        
        <body>
            <ul>
                <li><a href="http://localhost/index">首页</a></li> |
                <li><a href="http://localhost/list">列表</a></li> |
                <li><a href="http://localhost/news">新闻</a></li>
            </ul>
        </body>
        
        </html>        
        
        `)
    }
    if (pathName == "/list") {
        res.end(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>列表</title>
        </head>
        
        <body>
            <ul>
                <li><a href="http://localhost/index">首页</a></li> |
                <li><a href="http://localhost/list">列表</a></li> |
                <li><a href="http://localhost/news">新闻</a></li>
            </ul>
        </body>
        
        </html>        
        
        `)
    }
    if (pathName == "/news") {
        res.end(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>新闻</title>
        </head>
        
        <body>
            <ul>
                <li><a href="http://localhost/index">首页</a></li> |
                <li><a href="http://localhost/list">列表</a></li> |
                <li><a href="http://localhost/news">新闻</a></li>
            </ul>
        </body>
        
        </html>        
        
        `)
    }
})

server.listen(80)