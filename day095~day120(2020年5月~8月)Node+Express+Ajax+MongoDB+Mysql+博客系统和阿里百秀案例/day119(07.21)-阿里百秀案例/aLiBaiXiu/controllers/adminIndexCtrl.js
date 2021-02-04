const { findCount } = require('../models/adminIndexModel');

//#region  显示首页
module.exports.showIndexPage = (req, res) => {
    // 查询所有统计
    findCount(function (results) {
        // 扁平化数组
        results = results.flat();
        // 响应页面
        res.render('./admin/index', {
            pcount: results[0].pcount,
            dcount: results[1].dcount,
            cacount: results[2].cacount,
            cocount: results[3].cocount,
            hcount: results[4].hcount
        });
    });
}
//#endregion