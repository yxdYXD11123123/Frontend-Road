const router = require('koa-router')();

// 给当前users路由添加/users前缀
router.prefix('/users');

// 导入 控制器 
const { register, login } = require("../controllers/usersCtrl");

// 用户注册
router.post("/register", register);

// 用户登录
router.post("/login", login);

module.exports = router;