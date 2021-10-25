// 导入 koa 包
const Koa = require("koa");

// 导入 路由
// const Router = require("koa-router");
const router = require('./routes')

// 导入 body-parser
const bodyParser = require("koa-bodyparser");

// 导入 静态托管 插件
const static = require("koa-static");

const path = require("path")

const staticPath = "./static"

// 实例化 koa
const app = new Koa();

// 托管静态资源
app.use(static(path.join(__dirname, staticPath)))

// 创建路由
// const router = new Router();
// app.use(async ctx => {
//   ctx.body = "hello world"
// })
// router.get("/", async (ctx, next) => {
//   ctx.body = "我是路由 / 的结果"
// })

// 使用路由中间件
app.use(router.routes(), router.allowedMethods());
// 注意 bodyParser要挂载到路由挂载之后
app.use(bodyParser);


// 给koa实例指定端口
app.listen(3000, () => {
  console.log("http://localhost:3000");
})