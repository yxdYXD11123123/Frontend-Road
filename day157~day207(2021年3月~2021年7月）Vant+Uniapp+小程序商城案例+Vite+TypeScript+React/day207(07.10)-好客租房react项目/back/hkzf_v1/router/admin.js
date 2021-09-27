const router = require('koa-router')();
const admin = require('../controllers/admin');
router
    .post('/image', admin.image) // base64 图片
    .post('/registered', admin.registered) // 注册
    .post('/login', admin.login)// 登录
    .use(admin.permission) //权限管理
    .post('/logout', admin.logout) // 登出
    .get('/users', admin.users) //获取用户列表
    .get('/houses', admin.houses) // 获取房屋列表
    .patch('/users/:id', admin.usersId) //禁用用户
    .patch('/houses/:id', admin.housesID) //禁用房屋

module.exports = router;
