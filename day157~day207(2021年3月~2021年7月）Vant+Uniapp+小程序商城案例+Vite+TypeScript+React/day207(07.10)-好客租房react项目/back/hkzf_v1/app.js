const Koa = require('koa');
const app = new Koa();
// 视图的中间件
const views = require('koa-views');
// 处理异常的中间件
const onerror = require('koa-onerror');
// 跨域的中间件
const cors = require('./config/cors');
// 请求题处理
const koaBody = require('koa-body');
// path
const path = require('path');
// 全局路由
const router = require('./router');
// 命令窗口日志
const logger = require('./config/logger');
// 数据库
const dataBase = require('./dataBash/index');

// ***************** 插件的中间层 ******************** //
// 处理异常的中间件
onerror(app);
// 处理跨域的中间件
app.use(cors());

// ***************** 数据处理和记录 ****************** //
// 处理静态资源中间件
app.use(require('koa-static')(__dirname + '/public'));
// 处理请求体
app.use(koaBody({
    multipart: true,
    encoding: 'utf-8',
    formidable: {
        // 用户提交的文件存放位置
        uploadDir: path.join(__dirname, './public/uploads/'),
        keepExtensions: true
    },
    // 请求的最大限制
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb',
}));
// 使用ejs模板
app.use(views(__dirname + '/views', {map: {html: 'ejs'}}));

// ************** 业务逻辑处理 ********************** //
// 日志打印模块
app.use(logger);
// 标签
// app.use()
// routes
app.use(router.routes());
app.use(router.allowedMethods());

// 错误处理
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});
module.exports = app;
