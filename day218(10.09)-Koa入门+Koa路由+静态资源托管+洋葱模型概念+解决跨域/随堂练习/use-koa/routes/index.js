// 导入路由
const Router = require('koa-router');

// 创建路由
const router = new Router();

// 路由配置
router.get("/", async (ctx, next) => {
  ctx.body = '这是首页'
})

// 导出
module.exports = router;