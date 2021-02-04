// 引入数据库方法
const { findAllUsers, deleteOneUser, deleteManyUsers } = require('../models/adminUsersModel');

//#region 显示所有用户页
module.exports.showUsersPage = (req, res) => {
    // 查找所有用户信息
    findAllUsers((result) => {
        res.render('./admin/users', {
            // 所有用户信息
            users: result
        });
    })
}
//#endregion

//#region 删除一个用户
module.exports.deleteOneUser = (req, res) => {
    // 删除一个用户
    deleteOneUser(req.body.id, (result) => {
        if (result.affectedRows == 1) {
            res.send({
                code: 200,
                message: '删除成功'
            })
        }
    })
}
//#endregion

//#region 获取所有用户信息
module.exports.getAllUsers = (req, res) => {
    findAllUsers((result) => {
        if (result) {
            res.send({
                code: 200,
                message: "获取所有用户成功",
                data: result
            })
        }
    })
}
//#endregion

//#region 批量删除用户
module.exports.deleteUsers = (req, res) => {
    let idArr = req.body['idArr[]'];
    // 因为前端传来的数组中如果只有一个元素，在这里接收到的是一个字符串
    // 所以，如果我们接收到的是个字符串（有split方法），就用split将其变为数组
    if (idArr.split) {
        idArr = idArr.split("");
    };
    // 删除多个用户
    deleteManyUsers(idArr, (result) => {
        if (result.affectedRows >= 1) {
            res.send({
                code: 200,
                message: '删除用户成功'
            });
        }
    })
}
//#endregion