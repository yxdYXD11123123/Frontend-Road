const Article = require("../models/article");
const User = require("../models/user");
const Comment = require("../models/comment");
const mongooseSexPage = require("mongoose-sex-page");
const md5 = require("md5");


// 显示首页
module.exports.showIndex = (req, res) => {
    // 判断用户是否登录
    if (req.session.username) {
        res.render("index", {
            // 登录状态
            isLogin: true
        });
    }
    else {
        res.render("index", {
            // 未登录状态
            isLogin: false
        })
    }
}

// 显示文章详情页
module.exports.showDetail = (req, res) => {
    if (req.session.username) {
        res.render("detail", {
            isLogin: true
        });
    }
    else {
        res.render("detail", {
            isLogin: false
        })
    };
}

// 获取文章分页
module.exports.getArticle = async (req, res) => {
    // let result = await Article.find().populate("author");
    let pageNum = parseInt(req.query.pageNum);
    let pageSize = parseInt(req.query.pageSize);
    // page代表第几页
    // size代表每页显示多少条数据
    // display 代表显示的页码数量
    // exec() 代表向数据库发起请求
    let result = await mongooseSexPage(Article).page(pageNum).size(pageSize).display(3).find().populate("author").exec();
    // 返回
    res.send({
        code: 200,
        data: result
    })
}

// 获取文章详情
module.exports.getDetails = async (req, res) => {
    let result = await Article.findOne({
        _id: req.query.id
    }).populate("author");
    res.status(200).send({
        code: 200,
        msg: "数据获取成功",
        data: result
    });
}

// 登录功能
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

// 评论功能
module.exports.addComment = async (req, res) => {
    let result = await Comment.create(req.body);
    if (result) {
        res.status(200).send({
            code: 200,
            msg: "评论成功"
        })
    }
}

// 获取文章评论区内容
module.exports.getComments = async (req, res) => {
    let result = await Comment.find({
        aid: req.query.id
    }).populate("uid");
    res.status(200).send({
        code: 200,
        data: result
    })
}