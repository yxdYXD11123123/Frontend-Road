const express = require('express');
const loginRouter = express.Router();
// 引入控制器
let { showLoginPage, isUsernameRight, userLogin } = require("../controllers/loginCtrl");

// 显示登录页
loginRouter.get('/login', showLoginPage);

// 用户名是否存在
loginRouter.post('/isUsernameRight', isUsernameRight);

// 用户登录
loginRouter.post('/login', userLogin);

module.exports = loginRouter;