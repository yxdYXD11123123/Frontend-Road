// 引入model
let { delOne } = require('../models/delTaskModel');

module.exports.delTask = (req, res) => {
  delOne(req.body.id, (result) => {
    if (result.affectedRows == 1) {
      res.send({
        code: 200,
        msg: '删除任务成功'
      })
    }
  })
}