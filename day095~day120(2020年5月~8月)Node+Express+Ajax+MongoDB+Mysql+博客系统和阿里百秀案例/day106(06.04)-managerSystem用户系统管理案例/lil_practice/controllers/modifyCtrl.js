let { findOneUser, modifyOneUser } = require('../models/modifyModel')

// 查询一个用户
module.exports.findOne = (req, res) => {
    findOneUser(req.query.id, (result) => {
        result[0].hobbies = result[0].hobbies.split(',')
        res.status(200).send({
            code: 200,
            data: result[0],
            msg: "找到用户当前信息"
        })
    })
}

// 修改一个用户
module.exports.modifyUsers = (req, res) => {
    if (!req.body.hobbies) {
        req.body.hobbies = '';
    }
    else if (typeof (req.body.hobbies) != 'string' && req.body.hobbies.length >= 1) {
        req.body.hobbies = req.body.hobbies.join(',')
    }
    let modifyObj = {
        uname: req.body.username,
        age: req.body.age || 0,
        password: req.body.password,
        email: req.body.email,
        hobbies: req.body.hobbies,
    }

    modifyOneUser(req.body.id, modifyObj, (result) => {
        if (result.affectedRows == 1) {
            res.status(200).send({
                code: 200,
                msg: "数据修改成功"
            })
        }
    })
}