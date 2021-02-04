const User = require("../model/user");
const md5 = require("md5");
/**
 *  进入登录页面 (路由拦截)
 */
module.exports.show = (req, res) => {
    // 判断一下， 是否有req.session.username
    if (!req.session.username) {
        res.render("login");
    }
    else {
        // 当我们访问 localhost/ 时，我想让页面跳转别的页面，这叫重定向
        res.redirect("/user");
    }
};


/**
 *  用户点击登录
 */
module.exports.login = async (req, res) => {
    let { email, password } = req.body;
    // 做后端校验
    if (email.trim().length == 0 || password.trim().length == 0) {
        // 如果有空字符串，返回邮箱密码错误
        return res.status(400).send({
            code: 400,
            msg: "邮箱或密码错误"
        })
    }
    // 寻找数据
    let user = await User.findOne({ email: email })
    // 如果可以找到 user 说明 email 是正确
    // 然后比对密码
    if (user) {
        // 比对密码  （这里不仅要比对密码，而且要判断用户是否被禁用） 如果用户被禁用，也要验证失败
        let isValid = (md5(md5(md5(password))) === user.password) && user.status;
        if (isValid) {
            // 将用户名，存到session中去 （这个username只会存在于这个session.id访问时的sesssion中）
            req.session.username = user.username;
            // 如果我们吧userInfo存在app.locals中，那么我们就可以直接在模板中使用
            // req.app.locals 和 app.locals的作用是一样的
            req.app.locals.userInfo = user;
            return res.status(200).send({
                code: 200,
                msg: "邮箱和密码完全正确",
                data: isValid
            })
        }
        else {
            return res.status(400).send({
                code: 400,
                msg: "邮箱或密码错误"
            })
        }
    }
    // 如果 user 为 null
    else {
        // 说明没有此邮箱
        return res.status(400).send({
            code: 400,
            msg: "邮箱或密码错误"
        })
    };
};


/**
 *  退出登录
 */
module.exports.logout = (req, res) => {
    // 判断一下， 是否有req.session.username  (注意，这里的req.session.destroy 是一次响应)
    req.session.destroy(function (err) {
        // 在返回响应时，让客户端清除cookie，name为 'connect.sid'
        // 但是其实这里不需要，因为我们销毁 服务器的session后，浏览器再次访问会生成新的cookie
        res.clearCookie("connect.sid")
        // 返回响应
        // res.status(200).send({
        //     code: 200,
        //     msg: "退出成功"
        // })
        // 简单方法
        res.redirect("/");
    });
};
