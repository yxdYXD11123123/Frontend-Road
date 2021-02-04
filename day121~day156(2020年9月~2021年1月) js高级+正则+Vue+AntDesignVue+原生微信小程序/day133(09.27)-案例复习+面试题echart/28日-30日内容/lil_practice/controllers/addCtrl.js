let { addOneUser } = require('../models/addModel')

module.exports.addUser = (req, res) => {
    if (!req.body.hobbies) {
        req.body.hobbies = '';
    }
    else if (typeof (req.body.hobbies) != 'string' && req.body.hobbies.length >= 1) {
        req.body.hobbies = req.body.hobbies.join(',')
    }
    let userObj = {
        uname: req.body.username,
        // 年龄如果没写，默认为0
        age: req.body.age || 0,
        password: req.body.password,
        email: req.body.email,
        // 这里的爱好
        hobbies: req.body.hobbies
    }
    // 添加一名用户
    addOneUser(userObj, (result) => {
        if (result.affectedRows == 1) {
            res.status(200).send({
                code: 200,
                msg: "用户添加成功"
            })
        }
    })
}