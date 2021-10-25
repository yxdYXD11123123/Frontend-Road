// 导入 koa-router 的包
const Router = require("koa-router");

//  调用 Router构造函数 生成 Router实例对象
const router = new Router();

// 把homeRouter导入进来
const homeRouter = require("./homeRouter")
const aboutRouter = require("./aboutRouter")

// 使用刚才生成的Router实例，把homeRouter挂到router上
router.use(homeRouter.routes(), homeRouter.allowedMethods())
router.use(aboutRouter.routes(), aboutRouter.allowedMethods())

// 导出
module.exports = router;
