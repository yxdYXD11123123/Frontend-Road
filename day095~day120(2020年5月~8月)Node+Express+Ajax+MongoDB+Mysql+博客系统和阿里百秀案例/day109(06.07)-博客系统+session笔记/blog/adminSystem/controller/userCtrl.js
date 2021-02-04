// 引入分页插件
const sexPage = require("mongoose-sex-page");
// 引入表单校验插件
const Joi = require("joi");
// 引入集合
const User = require("../model/user");
// 引入加密
const md5 = require("md5");

// 显示 用户 页
module.exports.showUser = (req, res) => {
    if (!req.session.username) {
        // 当我们访问 某一页面 时，我想让页面跳转别的页面，这叫重定向
        res.redirect("/")
    }
    else {
        res.render("user", {
            page: "user"
        });
    }
};


// 查找分页数据
module.exports.findUsers = async (req, res) => {
    // 获取查询的页数，及每页数据的数量
    let { pageNum, pageSize } = req.query;
    // 寻找分页数据 （使用mongoose-sex-page插件，display为返回一个分页数组，数组中显示几页）
    let result = await sexPage(User).page(parseInt(pageNum)).size(parseInt(pageSize)).display(5).find().exec();
    res.status(200).send({
        code: 200,
        msg: "数据获取成功",
        data: result
    });
};


// 删除用户
module.exports.deleteUser = async (req, res) => {
    let { id } = req.query;
    let result = await User.findOneAndUpdate({
        _id: id
    }, {
        status: false
    });
    res.status(200).send({
        code: 200,
        msg: "删除成功",
        // 不要返回过多信息
        data: result.username
    })
}


// 显示添加用户页面
module.exports.showAdd = (req, res) => {
    if (!req.session.username) {
        // 当我们访问 某一页面 时，我想让页面跳转别的页面，这叫重定向
        res.redirect("/")
    }
    else {
        res.render("user-add");
    }
};

// 添加用户功能
module.exports.addUser = async (req, res) => {
    // 后端校验（必须写）
    // 前端校验只是为了提高用户体验
    const schema = Joi.object().keys({
        username: Joi.string().min(2).max(10).required().error(new Error("用户名格式不正确")),
        password: Joi.string().min(6).max(12).required().regex(/^[a-zA-Z0-9]+$/).error(new Error("密码格式不正确")),
        email: Joi.string().email().required().error(new Error("邮箱格式不正确")),
        // 角色 （枚举）
        role: Joi.string().valid("普通用户", "超级管理员").required().error(new Error("用户角色验证失败")),
        status: Joi.number().valid(0, 1).required().error(new Error("用户状态验证失败"))
    })
    // try catch 是用来捕获错误的
    try {
        await Joi.validate(req.body, schema);
    } catch (error) {
        // 如果出错，就会终止
        return res.status(200).send({
            code: 400,
            msg: error.message
        })
    };
    // 用户名和邮箱在系统中，都必须是唯一的标识，如果用了别人已经注册的，那就都不可以
    let emailResult = await User.findOne({
        email: req.body.email
    });
    let usernameResult = await User.findOne({
        username: req.body.username
    });
    if (emailResult) {
        return res.send({
            code: 400,
            msg: "邮箱已经被占用"
        })
    };
    if (usernameResult) {
        return res.send({
            code: 400,
            msg: "用户名已经被占用"
        })
    };
    // 数据整理
    let newUser = {
        username: req.body.username,
        // 将密码加密三次
        password: md5(md5(md5(req.body.password))),
        email: req.body.email,
        status: Boolean(Number(req.body.status)),
        role: req.body.role
    }
    // 以上都没问题
    let successResult = await User.create(newUser);
    if (successResult.username) {
        res.status(200).send({
            code: 200,
            msg: "用户注册成功"
        })
    }
}

module.exports.findOneUser = async (req, res) => {
    let { id } = req.query;
    let result = await User.findOne({
        _id: id
    });
    res.status(200).send({
        code: 200,
        data: result,
        msg: "用户查询成功"
    })
}

// 更新一个用户信息功能
module.exports.modifyUser = async (req, res) => {
    let { id, username, password, email, role, status } = req.body;
    let result = await User.findOneAndUpdate({
        _id: id
    }, {
        username,
        email,
        // 这里应该注意：如果密码没修改过，不能继续加密
        password,
        role,
        status
    });
    if (result._id) {
        res.status(200).send({
            code: 200,
            msg: "用户信息修改成功"
        })
    }
}

// 显示用户编辑页面
module.exports.editUser = (req, res) => {
    res.render("user-edit", {
        page: "user"
    });
};
