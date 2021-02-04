const { findAllCategories } = require('../models/adminCategoriesModel');

//#region 显示文章分类页
module.exports.showCategoriesPage = (req, res) => {
    findAllCategories(function (result) {
        console.log(result);
        res.render('./admin/categories', {
            categories: result
        });
    })
}
//#endregion

//#region 局部刷新所有分类
module.exports.refreshCategories = (req, res) => {
    findAllCategories(function (result) {
        res.send({
            code: 200,
            data: result
        })
    })
}
//#endregion
