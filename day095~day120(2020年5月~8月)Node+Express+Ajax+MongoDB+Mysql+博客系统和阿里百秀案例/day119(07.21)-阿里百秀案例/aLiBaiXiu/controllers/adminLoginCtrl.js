const Joi = require("joi");
// 查找用户信息
const { findUser } = require('../models/adminLoginModel');

// 显示登录页面
module.exports.showLoginPage = (req, res) => {
    res.render('./admin/login');
};

// 处理登录业务
module.exports.loginUser = (req, res) => {
    let { email, password } = req.body;
    // 制定校验规则
    const schema = Joi.object({
        email: Joi.string().min(6).max(200).email().required().error(new Error('邮箱错误')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required().error(new Error('密码错误'))
    })
    // 开始校验
    let result = Joi.validate({ email: email, password: password }, schema);
    // 校验结果中的error是否为null
    if (result.error) {
        // 有error信息，返回报错信息
        res.send({
            code: 500,
            message: result.error.message
        });
        // 抛出错误 
        // throw result.error;
        // 终止
        return;
    };
    // 查找邮箱对应的数据
    findUser(email, function (result) {
        // 如果结果为空数组
        if (result.length == 0) {
            // 说明此邮箱未注册
            return res.send({
                code: 500,
                message: '邮箱错误'
            });
        };
        // 通过以上过滤，接着 比对密码
        if (result[0].password === password) {
            // 实现登陆状态保持
            req.session.user = result[0];
            // 密码匹配
            return res.send({
                code: 200,
                message: '邮箱密码正确'
            });
        }
        // 密码不匹配
        return res.send({
            code: 500,
            message: '密码错误'
        });
    });
};

// 退出登录
module.exports.logoutUser = (req, res) => {
    req.session.destroy(function (err) {
        res.send({
            code: 200,
            message: '退出成功'
        })
    })
}