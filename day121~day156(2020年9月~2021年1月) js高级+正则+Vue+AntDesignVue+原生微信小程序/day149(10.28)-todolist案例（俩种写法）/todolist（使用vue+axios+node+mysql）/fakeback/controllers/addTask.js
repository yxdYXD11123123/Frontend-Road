// 导入model
let { addOne } = require('../models/addTaskModel');

// 添加任务
module.exports.addTask = (req, res) => {
  addOne(req.body.task, (result) => {
    if (result.affectedRows == 1) {
      res.send({
        code: 200,
        msg: '添加任务成功'
      })
    }
  })
}