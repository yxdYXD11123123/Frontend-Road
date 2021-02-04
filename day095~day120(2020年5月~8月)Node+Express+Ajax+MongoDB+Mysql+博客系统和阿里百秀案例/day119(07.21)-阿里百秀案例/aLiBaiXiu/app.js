// 导入包
const express = require("express");
const path = require("path");
const ejs = require('ejs');
const session = require("express-session");
// 导入路由
//#region 导入用户系统首页路由
const indexRouter = require("./routes/indexRouter");
const listRouter = require('./routes/listRouter');
const detailRouter = require('./routes/detailRouter');
//#endregion


//#region  导入后台管理系统路由
// -- 登录
const adminLoginRouter = require('./routes/adminLoginRouter');
// -- 首页
const adminIndexRouter = require('./routes/adminIndexRouter');
// -- 文章页
const adminPostsRouter = require('./routes/adminPostsRouter');
// -- 添加文章页
const adminPostAddRouter = require("./routes/adminPostAddRouter");
// -- 编辑文章页
const adminPostEditRouter = require("./routes/adminPostEditRouter");
// -- 分类页
const adminCategoriesRouter = require("./routes/adminCategoriesRouter");
// -- 评论页
const adminCommentsRouter = require('./routes/adminCommentsRouter');
// -- 用户页
const adminUsersRouter = require("./routes/adminUsersRouter");
// -- 设置页
const adminSettingsRouter = require('./routes/adminSettingsRouter');
// -- 个人信息页
const adminProfileRouter = require('./routes/adminProfileRouter');
// -- 图片轮播管理页
const adminSlidesRouter = require('./routes/adminSlidesRouter');
// -- 重置密码页
const adminPasswordResetRouter = require("./routes/adminPasswordResetRouter");
// -- 导航菜单管理页
const adminNavMenusRouter = require('./routes/adminNavMenusRouter');
//#endregion


// 设置包
// 启动服务
const app = express();
// 静态托管
app.use(express.static(path.join(__dirname, 'public')));
// 设置模板引擎
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 可以将默认模板后缀ejs改为html
// app.engine('html',ejs.renderFile);

// 配置session 包
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 6000000
    }
}))

// 配置urlencoded中间件
app.use(express.urlencoded({ extended: false }));

// 挂载路由
//#region 1. 挂载前台用户路由
// - 首页路由
app.use(indexRouter);
// - 列表路由
app.use(listRouter);
// - 详情路由
app.use(detailRouter);
//#endregion

// admin部分路由拦截（登录页面就让访问，或者有req.session.user也让访问）
app.use(function (req, res, next) {
    // 获取url
    let url = req.originalUrl;
    if (url != '/admin/login' && !req.session.user) {
        return res.redirect("/admin/login");
    };
    next();
});

//#region 2. 挂载admin后台管理路由
// - 挂载登录路由
app.use('/admin', adminLoginRouter);
// - 首页
app.use('/admin', adminIndexRouter);
// - 文章页
app.use('/admin', adminPostsRouter);
// - 分类页
app.use('/admin', adminCategoriesRouter);
// - 评论页
app.use('/admin', adminCommentsRouter);
// - 用户页
app.use('/admin', adminUsersRouter);
// - 设置页
app.use('/admin', adminSettingsRouter);
// - 个人中心页
app.use('/admin', adminProfileRouter);
// - 轮播图管理页
app.use('/admin', adminSlidesRouter);
// - 密码重置页
app.use('/admin', adminPasswordResetRouter);
// - 添加文章页
app.use('/admin', adminPostAddRouter);
// - 编辑文章页
app.use("/admin", adminPostEditRouter);
// - 导航菜单管理页
app.use('/admin', adminNavMenusRouter);

//#endregion

// 指定端口并启动服务
app.listen(80);