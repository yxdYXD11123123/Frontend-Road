const express = require("express");
const path = require("path");
// 引入 express-session
const session = require("express-session");
// 引入 用户 路由
const userRouter = require("./routes/userRouter");
// 引入 文章 路由
const articleRouter = require("./routes/articleRouter");
// 引入 登录页面路由
const indexRouter = require("./routes/indexRouter");
// 开启服务器
const app = express();
// 连接数据库
require("./model/dbContent");
// 设置 express-session
// cookie的生命周期，如果不设置cookie的生命周期，他的默认生命周期就是浏览器开启到关闭。
app.use(session({
    // 密钥： 在这里表示签名 （必须的）
    secret: "keyboard cat",
    // resave: false,
    // 强制将未初始化的session保持（默认为true）
    // saveUninitialized: true,
    cookie: {
        // 这就是cookie在浏览器中存在的时间，单位是毫秒
        maxAge: 24 * 60 * 60 * 1000
    }
}))

// 静态托管
app.use(express.static(path.join(__dirname, "public")));
// 模板设置
app.engine('html', require("express-art-template"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// post中间件
app.use(express.urlencoded({ extended: true }));

// 挂载各个路由
app.use("/user", userRouter);
app.use("/article", articleRouter);
app.use(indexRouter);

app.listen(3000, function () {
    console.log("请打开 http://localhost:3000/" + "登录后台管理系统");
});