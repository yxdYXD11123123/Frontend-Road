// 导入 koa-router
const Router = require("koa-router");
// 调用 Router构造函数 生成 Router 实例对象
const aboutRouter = new Router({
  // 路由标识符的前缀
  prefix: "/about"
})
// 用Router实例对象调用请求方法，接收前端请求，并处理响应
aboutRouter.get("/", async (ctx, next) => {
  ctx.body = "about页面"
})

aboutRouter.get("/a", async (ctx, next) => {
  ctx.body = "about/a页面"
})
// 导出
module.exports = aboutRouter;