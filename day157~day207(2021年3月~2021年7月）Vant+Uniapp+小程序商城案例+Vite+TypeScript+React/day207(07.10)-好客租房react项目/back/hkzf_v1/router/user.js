const router = require('koa-router')();
const user = require('../controllers/user');
// router.post('/');
router
    .post('/registered', user.registered) // 用户注册
    .post('/login', user.login) // 用户登录
    .use(user.permission) // 用户的权限管理
    .post('/logout', user.logout) // 用户登出
    .post('/favorites/:id', user.addFavorites) // 添加收藏
    .get('/favorites', user.favoritesList) //查看用户收藏列表
    .get('/favorites/:id', user.favoritesID) //判断是否收藏
    .delete('/favorites/:id', user.deleteFavorites) //删除收藏
    .post('/houses', user.addHouse) // 添加新的房屋
    .get('/houses' , user.houseLIst) // 获取房屋列表
    .patch('/houses/:id' , user.shelving) // 上下架房屋
    .get('/', user.info) // 获取用户数据
    .patch('/', user.updateInfo) // 更新用户数据
module.exports = router;
