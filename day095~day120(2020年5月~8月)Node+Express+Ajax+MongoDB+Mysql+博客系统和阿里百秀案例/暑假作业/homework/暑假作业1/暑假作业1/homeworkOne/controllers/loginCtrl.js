// 引入models
const { findUser } = require('../models/loginModel');
const validator = require('validator');

// 显示登录页
module.exports.showLoginPage = (req, res) => {
    res.render('login');
}

// 用户名是否存在
module.exports.isUsernameRight = (req, res) => {
    if (req.body.username.indexOf(`'`) == -1) {
        findUser(req.body.username, (results) => {
            // 如果没找到
            if (results.length == 0) {
                // 说明没有这个用户
                res.send(JSON.stringify({
                    valid: false,
                    code: 200
                }))
            }
            else {
                // 这个用户存在，验证通过
                res.send(JSON.stringify({
                    valid: true,
                    code: 200
                }))
            }
        })
    }
};

// 用户登录
module.exports.userLogin = (req, res) => {
    let { username, password } = req.body;
    if (validator.isLength(username, { min: 2, max: 10 }) && validator.isMD5(password)) {
        return findUser(username, (results) => {
            // 比对密码
            if (results[0].password == password) {
                req.session.userInfo = req.body;
                res.status(200).send({
                    code: 200,
                    message: '登录成功'
                });
            }
            else {
                res.status(200).send({
                    code: 500,
                    message: '密码错误'
                });
            }
        });
    };
    res.status(200).send({
        code: 500,
        message: '登录失败'
    });
}