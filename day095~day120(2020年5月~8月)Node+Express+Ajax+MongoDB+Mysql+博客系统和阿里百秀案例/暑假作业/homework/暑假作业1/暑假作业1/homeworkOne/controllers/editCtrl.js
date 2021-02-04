const validator = require('validator');

let { updateHeroInfo, findOneHero } = require('../models/editModel');

// 显示编辑页
module.exports.showEditPage = (req, res) => {
    let { id } = req.query;
    findOneHero(id, (results) => {
        res.render('edit', {
            hero: results[0]
        });
    })
}

// 编辑英雄信息
module.exports.editHeroInfo = (req, res) => {
    let { id, hname, nickname, skill } = req.body;
    if (!validator.isEmpty(hname.trim()) && !validator.isEmpty(nickname.trim()) && !validator.isEmpty(skill.trim())) {
        let updateInfo = {
            hname,
            nickname,
            skill
        }
        return updateHeroInfo(id, updateInfo, (results) => {
            if (results.affectedRows == 1) {
                return res.send({
                    code: 200,
                    message: '修改英雄信息成功'
                })
            };
            res.send({
                code: 500,
                message: '修改英雄信息失败'
            })
        })
    };
    res.send({
        code: 500,
        message: '修改英雄信息失败'
    })
}