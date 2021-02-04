// 导入包
const express = require("express");
const path = require("path");
const router = require("./routes");
const session = require("express-session");

// 创建服务器
const app = express();
// 设置静态资源目录
app.use(express.static(path.join(__dirname, "public")));
// 连接数据库
require("./models/connect");

// 设置中间件
app.use(express.urlencoded({ extended: false }));

// 设置模板引擎
app.engine('html', require("express-art-template"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// 设置session
app.use(session({
    secret: "keyboard cat",
    cookie: {
        // 这就是cookie在浏览器中存在的时间，单位是毫秒
        maxAge: 1000 * 60 * 60 * 24
    }
}))

// 挂载路由
app.use(router);

// 指定端口
app.listen(80);