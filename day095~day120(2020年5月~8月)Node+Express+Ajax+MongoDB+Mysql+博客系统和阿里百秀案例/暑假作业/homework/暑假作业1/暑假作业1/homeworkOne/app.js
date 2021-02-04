// 引入包
const express = require('express');
const path = require('path');
const session = require('express-session');
// 引入路由
const loginRouter = require('./routers/loginRouter');
const indexRouter = require('./routers/indexRouter');
const addRouter = require('./routers/addRouter');
const editRouter = require('./routers/editRouter');

const app = express();

// 静态托管
app.use(express.static(path.join(__dirname, 'public')));

// 设置模板引擎
app.engine('html', require('express-art-template'));
// 设置模板根目录
app.set('views', path.join(__dirname, 'views'));
// 设置默认的模板后缀为html
app.set('view engine', 'html');

// 设置session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 30 * 60 }
}))

// 设置中间件
app.use(express.urlencoded({ extended: false }));

// 路由拦截
app.use((req, res, next) => {
    if (!req.session.userInfo && req.url != '/login' && req.url != '/isUsernameRight') {
        return res.redirect('/login');
    }
    // 自动登录
    if (req.session.userInfo && req.url == '/login') {
        return res.redirect('/');
    }
    next();
})

//#region  设置路由
// 登录路由
app.use(loginRouter);
// 首页路由
app.use(indexRouter);
// 添加路由
app.use(addRouter);
// 编辑路由
app.use(editRouter);

//#endregion


// 监听端口
app.listen(80);