const Koa = require('koa') // 导入koa
const app = new Koa() // 创建服务
// const views = require('koa-views') // 处理views静态资源, 支持 ctx.render
const json = require('koa-json') // json 格式化
const onerror = require('koa-onerror') // 处理异常
const bodyparser = require('koa-bodyparser') // 解析post请求中的body
const logger = require('koa-logger') // 记录日志
const jwt = require("koa-jwt"); // jwt权限校验
const { jwtSecret } = require('./config');
const xmlParser = require('koa-xml-body'); // 解析xml
const session = require('koa-session');
app.keys = ['some secret str'];

// 启用 环境变量配置
require("dotenv").config(); // 一定要在使用 process.env之前配置

// 导入路由
const index = require('./routes/index')
const users = require('./routes/users')
const cates = require("./routes/cates")
const sendSms = require("./routes/sms")
const order = require("./routes/order")


// error handler 错误处理
onerror(app);

// middlewares 中间件
// 使用session
const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(CONFIG, app));
app.use(xmlParser()) // 用于解析微信回调时，解析xmlbody
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))



// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger 记录操作日志
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 如果我们不想暴露 koa-jwt的错误给用户，我们可以自定义一个token校验错误 返回自定义的信息
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

// 必须通过token校验才能到达这里之后的中间件，除了/user
app.use(jwt({ secret: jwtSecret }).unless({
  path: [
    /^\/users\/login/,
    /^\/users\/register/,
    /^\/sendSms/,
    /^\/order\/notify/
  ]
}));

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(sendSms.routes())
app.use(cates.routes(), cates.allowedMethods())
app.use(order.routes(), order.allowedMethods())


// error-handling 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
