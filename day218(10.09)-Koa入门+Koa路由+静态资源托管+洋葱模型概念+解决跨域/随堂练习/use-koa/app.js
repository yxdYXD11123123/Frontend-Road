const Koa = require("koa");
// 创建应用
const app = new Koa();

// 导入路由
const router = require('./routes');

// 静态资源托管
app.use(require("koa-static")(__dirname + "/public"))

// 挂载路由
app.use(router.routes(), router.allowedMethods())

// // 设置中间件
// app.use(async ctx => {
//   // 返回结果
//   ctx.body = { request: ctx.request, response: ctx.response }
// });

// 监听端口
app.listen(8000, () => {
  console.log('http://localhost:8000');
})