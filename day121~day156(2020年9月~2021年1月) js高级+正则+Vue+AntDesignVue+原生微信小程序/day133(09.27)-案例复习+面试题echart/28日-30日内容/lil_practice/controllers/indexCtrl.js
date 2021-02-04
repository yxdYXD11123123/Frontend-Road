// 引入数据库方法
const { findAllUsers } = require('../models/indexModel');

//#region 返回所有用户信息
module.exports.findUsers = (req, res) => {
    // 调用数据模块封装好的方法
    findAllUsers((result) => {
        // 处理数据
        result.forEach((value, index) => {
            if (value.hobbies == '') {
                value.hobbies = []
            }
            else {
                value.hobbies = value.hobbies.split(',');
            }
        });
        res.status(200).send({
            code: 200,
            data: {
                data: result
            },
            msg: "数据获取成功"
        })
    });
}
//#endregion