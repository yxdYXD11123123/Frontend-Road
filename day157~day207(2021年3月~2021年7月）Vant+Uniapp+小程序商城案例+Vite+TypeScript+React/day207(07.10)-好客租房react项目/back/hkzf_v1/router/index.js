const router = require('koa-router')();

// 路由分表
const user = require('./user');
const plugin = require('./plugin');
const house = require('./house');
const admin = require('./admin');
const config = require('./config');
const area = require('./area');
const home = require('./home');
router
    .use('/user', user.routes(), user.allowedMethods()) // 用户接口
    .use('/plugin', plugin.routes(), plugin.allowedMethods()) // 一些功能性的接口
    .use('/houses', house.routes(), house.allowedMethods()) // 查询房屋相关的接口
    .use('/admin', admin.routes(), admin.allowedMethods()) // 管理员相关接
    .use('/config', config.routes(), config.allowedMethods()) // 内部使用接口
    .use('/area', area.routes(), area.allowedMethods())
    .use('/home' , home.routes(), home.allowedMethods())
;
// 静态文件
router
    .get("/", async ctx => await ctx.render('swagger'));

module.exports = router;
