// 校验包
const validator = require('validator');

let { findAllHeros, findHerosBySearch } = require('../models/indexModel');

// 显示首页
module.exports.showIndexPage = (req, res) => {
    res.render('index');
}

// 查询所有英雄
module.exports.getAllHeros = (req, res) => {
    findAllHeros((results) => {
        res.send({
            code: 200,
            message: '查询所有英雄成功',
            data: results
        })
    })
}

// 模糊查询英雄
module.exports.likeSearch = (req, res) => {
    let { searchKey } = req.body
    // 不需要禁止为空字符串
    // if (!validator.isEmpty(searchKey.trim())) {
    findHerosBySearch(searchKey.trim(), (results) => {
        res.send({
            code: 200,
            message: '查询成功',
            data: results
        })
    });
    // }
}

// 删除英雄
module.exports.deleteHero = (req, res) => {

}