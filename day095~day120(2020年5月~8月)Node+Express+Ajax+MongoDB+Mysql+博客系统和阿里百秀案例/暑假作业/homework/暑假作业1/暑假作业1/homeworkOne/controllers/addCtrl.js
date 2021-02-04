// 校验包
const validator = require('validator');

// 引入models
let { addOneHero } = require('../models/addModel');


module.exports.showAddPage = (req, res) => {
    res.render('add');
}

// 添加英雄
module.exports.addHero = (req, res) => {
    let { hname, nickname, skill } = req.body;
    if (!validator.isEmpty(hname.trim()) && !validator.isEmpty(nickname.trim()) && !validator.isEmpty(skill.trim())) {
        return addOneHero(req.body, (results) => {
            // 添加成功
            if (results.affectedRows == 1) {
                return res.send({
                    code: 200,
                    message: '英雄添加成功'
                });
            };
            res.send({
                code: 500,
                message: '英雄添加失败'
            });
        });
    };
    res.send({
        code: 500,
        message: '英雄添加失败'
    })
}