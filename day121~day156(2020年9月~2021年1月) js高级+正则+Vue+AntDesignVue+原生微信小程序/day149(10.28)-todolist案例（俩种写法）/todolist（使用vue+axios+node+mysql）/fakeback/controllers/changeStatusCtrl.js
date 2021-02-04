// 引入Model
let { changeOne } = require('../models/changeStatusModel');
module.exports.changeStatus = (req, res) => {
  changeOne(req.body.id, req.body.newStatus, (result) => {
    if (result.affectedRows >= 0) {
      res.send({
        code: 200,
        msg: '修改状态成功'
      });
    }
  })
}