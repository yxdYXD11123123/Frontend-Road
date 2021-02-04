// 引入moment
const moment = require("moment");
// 引入数据库方法
const { getPostById } = require('../models/adminPostEditModel');

//#region 回显文章信息
module.exports.showPostEditPage = (req, res) => {
    getPostById(req.params.id, (result) => {
        res.render('./admin/post-edit', {
            // 所有分类
            categories: result[1],
            // 所有状态
            statuses: result[2],
            // 文章信息
            data: result[0][0],
            // moment插件
            moment
        });
    })
}
//#endregion

//#region 更新保存文章信息
module.exports.savePostEdit = (req, res) => {
    console.log(req.file);
    console.log(req.body);
    let updateData = {
        id: parseInt(req.body)
    }
    res.send({
        code: 200
    })
}
//#endregion