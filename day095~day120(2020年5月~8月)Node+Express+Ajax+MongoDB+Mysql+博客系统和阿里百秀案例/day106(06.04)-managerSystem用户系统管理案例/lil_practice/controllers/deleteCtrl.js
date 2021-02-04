let { deleteUser } = require('../models/deleteModel');

// 删除一个用户信息
module.exports.deleteOneUser = (req, res) => {
    deleteUser(req.body.id, (result) => {
        if (result.affectedRows == 1) {
            res.status(200).send({
                code: 200,
                msg: "数据删除成功"
            })
        }
    })
}